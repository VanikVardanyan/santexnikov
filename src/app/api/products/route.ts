import { NextRequest, NextResponse } from "next/server";
import { getCategoryData, getCategoryById } from "@/lib/data";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categoryId = searchParams.get("categoryId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "30");
    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "name";
    const sortOrder = searchParams.get("sortOrder") || "asc";

    // Валидация параметров
    if (page < 1) {
      return NextResponse.json({ error: "Page must be greater than 0" }, { status: 400 });
    }

    if (!["30", "50", "100"].includes(limit.toString())) {
      return NextResponse.json({ error: "Limit must be 30, 50, or 100" }, { status: 400 });
    }

    if (!categoryId) {
      return NextResponse.json({ error: "Category ID is required" }, { status: 400 });
    }

    // Получаем информацию о категории
    const category = await getCategoryById(categoryId);
    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    // Получаем данные категории
    const categoryData = await getCategoryData(category.fileName);

    // Flatten все товары
    let allProducts = categoryData.flatMap((data) => data.items);

    // Фильтрация по поиску
    if (search) {
      const searchLower = search.toLowerCase();
      allProducts = allProducts.filter((product) => {
        const title = String(product["Наименование на сайте"] || product["Наименование в 1С"] || "");
        const manufacturer = String(product["Производитель"] || "");
        const article = String(product["Артикул"] || "");
        const description = String(product["Описание"] || product["Назначение"] || "");

        return (
          title.toLowerCase().includes(searchLower) ||
          manufacturer.toLowerCase().includes(searchLower) ||
          article.toLowerCase().includes(searchLower) ||
          description.toLowerCase().includes(searchLower)
        );
      });
    }

    // Сортировка
    allProducts.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortBy) {
        case "name":
          aValue = a["Наименование на сайте"] || a["Наименование в 1С"] || "";
          bValue = b["Наименование на сайте"] || b["Наименование в 1С"] || "";
          break;
        case "manufacturer":
          aValue = a["Производитель"] || "";
          bValue = b["Производитель"] || "";
          break;
        case "code":
          aValue = a["Код"] || 0;
          bValue = b["Код"] || 0;
          break;
        default:
          aValue = a["Наименование на сайте"] || a["Наименование в 1С"] || "";
          bValue = b["Наименование на сайте"] || b["Наименование в 1С"] || "";
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc" ? aValue.localeCompare(bValue, "ru") : bValue.localeCompare(aValue, "ru");
      } else {
        return sortOrder === "asc" ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number);
      }
    });

    // Пагинация
    const totalProducts = allProducts.length;
    const totalPages = Math.ceil(totalProducts / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const products = allProducts.slice(startIndex, endIndex);

    return NextResponse.json({
      products,
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      filters: {
        search,
        sortBy,
        sortOrder,
      },
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

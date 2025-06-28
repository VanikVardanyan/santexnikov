// app/catalog/page.tsx
import type { Metadata } from "next";
import ProductCategoryCard from "@/components/ProductCategoryCard";
import { getAllCategories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Каталог инженерной сантехники | Santexnikov",
  description:
    "Каталог товаров: котлы, водонагреватели, трубы, фитинги, насосы, радиаторы, фильтры и другие инженерные решения для водоснабжения и отопления.",
};

export default async function Catalog() {
  const categories = await getAllCategories();

  return (
    <>
      <h2 className="mb-4">Каталог товаров</h2>
      <div className="row">
        {categories.map((category) => (
          <ProductCategoryCard key={category.id} category={category} />
        ))}
      </div>
    </>
  );
}

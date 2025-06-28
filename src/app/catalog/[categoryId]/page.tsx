import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ProductList from "@/components/ProductList";
import { getCategoryById } from "@/lib/data";

type Params = Promise<{ categoryId: string }>;

// ✅ без отдельного типа Props
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { categoryId } = await params;
  const category = await getCategoryById(categoryId);

  if (!category) {
    return {
      title: "Категория не найдена | Santexnikov",
    };
  }

  return {
    title: `${category.title} | Каталог Santexnikov`,
    description: category.description,
  };
}

// ✅ тоже без Props
export default async function CategoryPage({ params }: { params: Params }) {
  const { categoryId } = await params;
  const category = await getCategoryById(categoryId);

  if (!category) {
    notFound();
  }

  return (
    <div>
      <div className="mb-4">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/" className="text-decoration-none">
                Главная
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="/catalog" className="text-decoration-none">
                Каталог
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {category.title}
            </li>
          </ol>
        </nav>

        <div className="row align-items-center">
          <div className="col-md-8">
            <h1 className="mb-2">{category.title}</h1>
            <p className="text-muted mb-0">{category.description}</p>
          </div>
        </div>
      </div>

      <ProductList categoryId={categoryId} categoryTitle={category.title} />
    </div>
  );
}

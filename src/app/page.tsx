import ProductCategoryCard from "../components/ProductCategoryCard";
import { getAllCategories } from "@/lib/data";

export default async function Home() {
  const categories = await getAllCategories();

  return (
    <>
      <h1 className="text-center">СанТехников: ключ к идеальной сантехнике!</h1>
      <p className="text-center">Широкий выбор инженерной сантехники и оборудования для вашего дома и бизнеса.</p>
      <h2 className="mt-5 mb-4">Каталог товаров</h2>
      <div className="row">
        {categories.map((category) => (
          <ProductCategoryCard key={category.id} category={category} />
        ))}
      </div>
    </>
  );
}

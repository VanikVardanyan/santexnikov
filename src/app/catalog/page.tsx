// app/catalog/page.tsx
import type { Metadata } from "next";
import ProductCategoryCard from "@/components/ProductCategoryCard";

export const metadata: Metadata = {
  title: "Каталог инженерной сантехники | Santexnikov",
  description:
    "Каталог товаров: котлы, водонагреватели, трубы, фитинги, насосы, радиаторы, фильтры и другие инженерные решения для водоснабжения и отопления.",
};

const categories = [
  { title: "Котлы", image: "/images/boiler.jpg" },
  { title: "Водонагреватели", image: "/images/water-heater.jpg" },
  { title: "Трубы", image: "/images/pipes.jpg" },
  { title: "Фитинги", image: "/images/fittings.jpg" },
  { title: "Коллекторы", image: "/images/collectors.jpg" },
  { title: "Насосы", image: "/images/pump.jpg" },
  { title: "Радиаторы", image: "/images/radiators.jpg" },
  { title: "Тёплые полы", image: "/images/floor-heating.jpg" },
  { title: "Запорная арматура", image: "/images/valves.jpg" },
  { title: "Счётчики воды", image: "/images/water-meters.jpg" },
  { title: "Фильтры воды", image: "/images/water-filters.jpg" },
  { title: "Баки расширительные", image: "/images/expansion-tanks.jpg" },
  { title: "Крепежи и аксессуары", image: "/images/accessories.jpg" },
];

export default function Catalog() {
  return (
    <>
      <h2 className="mb-4">Каталог товаров</h2>
      <div className="row">
        {categories.map((category) => (
          <ProductCategoryCard key={category.title} {...category} />
        ))}
      </div>
    </>
  );
}

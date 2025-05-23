import ProductCategoryCard from "../components/ProductCategoryCard";

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

export default function Home() {
  return (
    <>
      <h1 className="text-center">СанТехников: ключ к идеальной сантехнике!</h1>
      <p className="text-center">Широкий выбор инженерной сантехники и оборудования для вашего дома и бизнеса.</p>
      <h2 className="mt-5 mb-4">Каталог товаров</h2>
      <div className="row">
        {categories.map((category) => (
          <ProductCategoryCard key={category.title} {...category} />
        ))}
      </div>
    </>
  );
}

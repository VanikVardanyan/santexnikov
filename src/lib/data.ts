export interface Product {
  "№": string;
  "Дата создания": string;
  Активность: string;
  Код: number;
  Артикул: string;
  "Наименование в 1С": string;
  "Наименование на сайте": string;
  "Ед. изм.": string;
  "Кол-во в малой упак., шт.": string;
  "Кол-во в большой упак., шт.": number;
  "Масса, кг": number;
  "Объем, м3": number;
  Описание: string;
  Назначение: string;
  "Мощность, Вт"?: number;
  "Напряжение питания, В"?: number;
  "Частота, Гц"?: string;
  "Рабочая температура, °С"?: string;
  "Класс защиты от поражения электрическим током"?: string;
  "Регулировка температуры"?: string;
  "Время нагрева аппарата, мин"?: string;
  "Количество ступеней нагрева, шт."?: number;
  "Рабочая среда"?: string;
  "Максимальное давление, бар"?: string;
  "Производительность, л/мин "?: string;
  "Диаметр свариваемых труб, мм"?: string;
  "Размер сменных насадок в комплекте, мм"?: string;
  Гарантия?: string;
  "Раздел 1"?: string;
  "Раздел 2"?: string;
  "Страна происхождения"?: string;
  Производитель?: string;
  "Картинка анонса"?: string;
  "Детальная картинка"?: string;
  "Список документов"?: string;
  "Соседи по группе"?: string;
  наименование?: string;
}

export interface CategoryData {
  category: string;
  items: Product[];
}

export interface CategoryInfo {
  id: string;
  title: string;
  image: string;
  fileName: string;
  description: string;
}

export const categories: CategoryInfo[] = [
  {
    id: "otoplenie",
    title: "Отопление",
    image: "/images/boiler.jpg",
    fileName: "Отопление.json",
    description: "Котлы, радиаторы, тёплые полы и оборудование для отопления",
  },
  {
    id: "truby-i-fitingi",
    title: "Трубы и фитинги",
    image: "/images/pipes.jpg",
    fileName: "Трубы_и_фитинги.json",
    description: "Трубы, фитинги и комплектующие для трубопроводов",
  },
  {
    id: "santehnika",
    title: "Сантехника",
    image: "/images/water-heater.jpg",
    fileName: "Сантехника.json",
    description: "Сантехническое оборудование и аксессуары",
  },
  {
    id: "zapornaya-armatura",
    title: "Запорная арматура",
    image: "/images/valves.jpg",
    fileName: "Запорная_арматура.json",
    description: "Клапаны, краны и запорная арматура",
  },
  {
    id: "nasosnoe-oborudovanie",
    title: "Насосное оборудование и КИП",
    image: "/images/pump.jpg",
    fileName: "Насосное_оборудование_и_КИП.json",
    description: "Насосы, контрольно-измерительные приборы",
  },
  {
    id: "instrumenty-i-montazh",
    title: "Инструменты и монтаж",
    image: "/images/accessories.jpg",
    fileName: "Инструменты_и_монтаж.json",
    description: "Инструменты и оборудование для монтажа",
  },
  {
    id: "prochee",
    title: "Прочее",
    image: "/images/accessories.jpg",
    fileName: "Прочее.json",
    description: "Дополнительное оборудование и комплектующие",
  },
];

export async function getCategoryData(fileName: string): Promise<CategoryData[]> {
  try {
    const data = await import(`../data/${fileName}`);
    return data.default || data;
  } catch (error) {
    console.error(`Error loading data from ${fileName}:`, error);
    return [];
  }
}

export async function getCategoryById(id: string): Promise<CategoryInfo | undefined> {
  return categories.find((cat) => cat.id === id);
}

export async function getAllCategories(): Promise<CategoryInfo[]> {
  return categories;
}

export function getProductImage(product: Product): string {
  return product["Картинка анонса"] || product["Детальная картинка"] || "/images/placeholder.jpg";
}

export function getProductTitle(product: Product): string {
  return product["Наименование в 1С"] || product["Наименование на сайте"] || product["наименование"] || "Без названия";
}

export function getProductDescription(product: Product): string {
  return product["Описание"] || product["Назначение"] || "";
}

export async function getProductByCode(code: number | string): Promise<Product | null> {
  for (const cat of categories) {
    try {
      const data = await import(`../data/${cat.fileName}`);
      const arr = data.default || data;
      for (const group of arr) {
        const items = group.items || [];
        const found = items.find((item: Product) => String(item["Код"]) === String(code));
        if (found) return found;
      }
    } catch {}
  }
  return null;
}

import type { CitySlug } from "./cities";

export type Listing = {
  id: string;
  city: CitySlug;
  title: string;
  category: "Житло" | "Робота" | "Послуги";
  description: string;
  date: string;
  tags: string[];
};

export const listings: Listing[] = [
  {
    id: "listing-torrevieja-flat",
    city: "torrevieja",
    title: "Оренда 2-кімнатної квартири біля моря",
    category: "Житло",
    description: "Світла квартира з меблями, поруч школа, супермаркет і автобусна зупинка.",
    date: "20 березня",
    tags: ["Оренда", "Сімʼя"],
  },
  {
    id: "listing-torrevieja-nanny",
    city: "torrevieja",
    title: "Потрібна няня на 2 вечори на тиждень",
    category: "Послуги",
    description: "Потрібна людина з рекомендаціями від спільноти для дитини 6 років.",
    date: "19 березня",
    tags: ["Сімʼя", "Рекомендації"],
  },
  {
    id: "listing-torrevieja-admin",
    city: "torrevieja",
    title: "Асистент у туристичний офіс",
    category: "Робота",
    description: "Шукають людину зі знанням української, іспанської або англійської для роботи з клієнтами.",
    date: "18 березня",
    tags: ["Part-time", "Офіс"],
  },
  {
    id: "listing-alicante-barista",
    city: "alicante",
    title: "Бариста на вечірні зміни в центрі",
    category: "Робота",
    description: "Кафе шукає людину зі знанням української або російської для вечірніх змін.",
    date: "20 березня",
    tags: ["Hospitality", "Вечір"],
  },
  {
    id: "listing-alicante-rent",
    city: "alicante",
    title: "Шукаємо квартиру на довгу оренду",
    category: "Житло",
    description: "Сімʼя з дитиною шукає квартиру біля школи та транспорту.",
    date: "18 березня",
    tags: ["Оренда", "Запит"],
  },
  {
    id: "listing-alicante-docs",
    city: "alicante",
    title: "Допомога з перекладом документів",
    category: "Послуги",
    description: "Потрібен перевірений перекладач для базового пакета документів на подачу.",
    date: "17 березня",
    tags: ["Документи", "Urgent"],
  },
];

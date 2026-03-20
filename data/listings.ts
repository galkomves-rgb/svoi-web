import type { CitySlug } from "./cities";

export type Listing = {
  id: string;
  city: CitySlug;
  title: string;
  category: "Житло" | "Робота" | "Послуги";
  description: string;
  details: string;
  date: string;
  district: string;
  priceLabel?: string;
  tags: string[];
};

export const listings: Listing[] = [
  {
    id: "listing-torrevieja-flat",
    city: "torrevieja",
    title: "Оренда 2-кімнатної квартири біля моря",
    category: "Житло",
    description: "Світла квартира з меблями, поруч школа, супермаркет і автобусна зупинка.",
    details: "2 спальні, мебльована кухня, 10 хвилин до пляжу. Власник просить підтвердження доходу й місячний депозит.",
    date: "20 березня",
    district: "Playa del Cura",
    priceLabel: "750 €/міс",
    tags: ["Оренда", "Сімʼя"],
  },
  {
    id: "listing-torrevieja-nanny",
    city: "torrevieja",
    title: "Потрібна няня на 2 вечори на тиждень",
    category: "Послуги",
    description: "Потрібна людина з рекомендаціями від спільноти для дитини 6 років.",
    details: "Шукаємо людину з досвідом догляду за дітьми. Перевага тим, хто вже працював із сімʼями з української спільноти.",
    date: "19 березня",
    district: "Centro",
    tags: ["Сімʼя", "Рекомендації"],
  },
  {
    id: "listing-torrevieja-admin",
    city: "torrevieja",
    title: "Асистент у туристичний офіс",
    category: "Робота",
    description: "Шукають людину зі знанням української, іспанської або англійської для роботи з клієнтами.",
    details: "Графік 5/2, робота з бронюваннями, дзвінками та базовою адміністрацією. Досвід у сервісі буде плюсом.",
    date: "18 березня",
    district: "Marina",
    priceLabel: "від 1 250 €/міс",
    tags: ["Part-time", "Офіс"],
  },
  {
    id: "listing-alicante-barista",
    city: "alicante",
    title: "Бариста на вечірні зміни в центрі",
    category: "Робота",
    description: "Кафе шукає людину зі знанням української або російської для вечірніх змін.",
    details: "Вечірній графік 17:00–22:00, потрібні базові навички роботи з кавомашиною й контактність із гостями.",
    date: "20 березня",
    district: "Centro",
    priceLabel: "8.5 €/год",
    tags: ["Hospitality", "Вечір"],
  },
  {
    id: "listing-alicante-rent",
    city: "alicante",
    title: "Шукаємо квартиру на довгу оренду",
    category: "Житло",
    description: "Сімʼя з дитиною шукає квартиру біля школи та транспорту.",
    details: "Розглядаємо 2 або 3 кімнати, бажано район із швидким доступом до шкіл і міського транспорту.",
    date: "18 березня",
    district: "San Blas",
    tags: ["Оренда", "Запит"],
  },
  {
    id: "listing-alicante-docs",
    city: "alicante",
    title: "Допомога з перекладом документів",
    category: "Послуги",
    description: "Потрібен перевірений перекладач для базового пакета документів на подачу.",
    details: "Потрібен переклад паспорта, довідки про прописку та супровідних форм. Важлива швидкість і точність.",
    date: "17 березня",
    district: "Ensanche",
    priceLabel: "за домовленістю",
    tags: ["Документи", "Urgent"],
  },
];

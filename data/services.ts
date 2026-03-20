import type { CitySlug } from "./cities";

export type ServiceItem = {
  id: string;
  city: CitySlug;
  name: string;
  category: string;
  description: string;
  verified: boolean;
  contactLabel: string;
};

export const services: ServiceItem[] = [
  {
    id: "service-torrevieja-beauty",
    city: "torrevieja",
    name: "Lana Beauty Studio",
    category: "Краса",
    description: "Hair, nails, and evening makeup with українською support.",
    verified: true,
    contactLabel: "Запис у Telegram",
  },
  {
    id: "service-torrevieja-transfer",
    city: "torrevieja",
    name: "Costa Move Transfer",
    category: "Транспорт",
    description: "Трансфери, локальні поїздки та допомога з переїздом по регіону.",
    verified: true,
    contactLabel: "WhatsApp",
  },
  {
    id: "service-torrevieja-renovation",
    city: "torrevieja",
    name: "Reforma Costa Blanca",
    category: "Ремонт",
    description: "Косметичний ремонт, дрібні побутові роботи та підготовка житла до оренди.",
    verified: false,
    contactLabel: "Запитати деталі",
  },
  {
    id: "service-alicante-auto",
    city: "alicante",
    name: "Costa Auto Help",
    category: "Авто",
    description: "Перевірка авто, оформлення документів і супровід при купівлі.",
    verified: true,
    contactLabel: "Подзвонити",
  },
  {
    id: "service-alicante-legal",
    city: "alicante",
    name: "Mar Legal Consult",
    category: "Юридичні послуги",
    description: "Резиденція, переклади й допомога з документами без зайвої бюрократії.",
    verified: true,
    contactLabel: "Відкрити сайт",
  },
  {
    id: "service-alicante-health",
    city: "alicante",
    name: "Clínica Salud Mar",
    category: "Здоровʼя",
    description: "Підтримка з записом до лікаря та супровід на базові консультації.",
    verified: false,
    contactLabel: "Запитати контакт",
  },
];

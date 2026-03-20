import type { CitySlug } from "./cities";

export type GuideItem = {
  id: string;
  city: CitySlug;
  title: string;
  summary: string;
  steps: string[];
};

export const guides: GuideItem[] = [
  {
    id: "guide-torrevieja-nie",
    city: "torrevieja",
    title: "Як отримати NIE",
    summary: "Базовий маршрут: запис, документи, оплата та що взяти з собою.",
    steps: ["Підготуйте паспорт і копії", "Запишіться на cita previa", "Оплатіть tasa", "Прийдіть із повним пакетом"],
  },
  {
    id: "guide-torrevieja-housing",
    city: "torrevieja",
    title: "Як знайти квартиру без зайвого ризику",
    summary: "На що дивитися в договорі, які документи перевіряти і як уникати шахрайства.",
    steps: ["Перевірте адресу", "Питайте contrato", "Не платіть без перегляду"],
  },
  {
    id: "guide-alicante-doctor",
    city: "alicante",
    title: "Як записатись до лікаря",
    summary: "Пояснюємо, як працює centro de salud і куди звертатися новоприбулим.",
    steps: ["Знайдіть свій центр", "Підготуйте документи", "Оберіть перекладача за потреби"],
  },
  {
    id: "guide-alicante-school",
    city: "alicante",
    title: "Школа для дитини: з чого почати",
    summary: "Коротко про документи, запис і локальні точки підтримки для родин.",
    steps: ["Перевірте район", "Зберіть padrón", "Запишіться через місцевий сервіс"],
  },
];

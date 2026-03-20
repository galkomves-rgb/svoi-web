import type { CitySlug } from "./cities";

export type StartScenario = {
  id: string;
  title: string;
  description: string;
  href: (city: CitySlug) => string;
  ctaLabel: string;
};

export type CityStartPlan = {
  city: CitySlug;
  title: string;
  description: string;
  checklist: string[];
  actions: Array<{
    title: string;
    description: string;
    href: string;
    ctaLabel: string;
  }>;
};

export const startScenarios: StartScenario[] = [
  {
    id: "documents",
    title: "Потрібні документи",
    description: "Швидко зрозуміти, з чого почати NIE, padrón і локальні записи.",
    href: (city) => `/${city}/guide`,
    ctaLabel: "Відкрити гід",
  },
  {
    id: "housing",
    title: "Шукаю житло",
    description: "Перейти до локальних оголошень і перевірити базові ризики перед оплатою.",
    href: (city) => `/${city}/listings?category=Житло`,
    ctaLabel: "Дивитись житло",
  },
  {
    id: "doctor",
    title: "Шукаю лікаря",
    description: "Знайти перевірені сервіси та базові медичні контакти по місту.",
    href: (city) => `/${city}/services`,
    ctaLabel: "Відкрити послуги",
  },
  {
    id: "community",
    title: "Хочу своїх людей поруч",
    description: "Подивитися події, де легше знайти локальні рекомендації та живі контакти.",
    href: (city) => `/${city}/events`,
    ctaLabel: "Дивитись події",
  },
];

export const startPlans: CityStartPlan[] = [
  {
    city: "torrevieja",
    title: "Старт у Торревʼєсі",
    description: "Найкоротший маршрут для першого тижня: документи, житло, базові послуги та локальна підтримка.",
    checklist: [
      "Перевірити NIE і padrón",
      "Відкрити житлові оголошення по місту",
      "Зберегти транспорт і базові побутові сервіси",
      "Подивитися найближчі події спільноти",
    ],
    actions: [
      {
        title: "Гід по документах",
        description: "NIE, житло, стартові перевірки та базові кроки.",
        href: "/torrevieja/guide",
        ctaLabel: "Відкрити гід",
      },
      {
        title: "Оголошення по місту",
        description: "Житло, робота й практичні локальні запити.",
        href: "/torrevieja/listings",
        ctaLabel: "Перейти до оголошень",
      },
      {
        title: "Послуги та контакти",
        description: "Побутові сервіси, переїзд і перевірені виконавці.",
        href: "/torrevieja/services",
        ctaLabel: "Дивитись послуги",
      },
    ],
  },
  {
    city: "alicante",
    title: "Старт в Аліканте",
    description: "Практичний набір кроків для міста: документи, медицина, оренда, школа і перші локальні звʼязки.",
    checklist: [
      "Почати з NIE і записів",
      "Перевірити житлові варіанти в місті",
      "Знайти юридичну або медичну підтримку",
      "Подивитися локальні воркшопи та зустрічі",
    ],
    actions: [
      {
        title: "Міський гід",
        description: "Лікар, школа, документи і стартові рішення по місту.",
        href: "/alicante/guide",
        ctaLabel: "Відкрити гід",
      },
      {
        title: "Житло і робота",
        description: "Оголошення, які дають найшвидшу практичну користь.",
        href: "/alicante/listings",
        ctaLabel: "Перейти до оголошень",
      },
      {
        title: "Послуги й підтримка",
        description: "Юридичні, медичні та побутові сервіси в місті.",
        href: "/alicante/services",
        ctaLabel: "Дивитись послуги",
      },
    ],
  },
];

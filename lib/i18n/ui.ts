export const defaultLocale = "uk-UA";

export const uiUk = {
  header: {
    start: "Почати",
    locations: "Локації",
    add: "Додати",
    admin: "Адмін",
    platformTagline: "Платформа спільноти",
    platformSubtitle: "Українці в Іспанії та далі",
    nav: {
      listings: "Оголошення",
      realEstate: "Нерухомість",
      services: "Послуги",
      events: "Події",
      start: "Старт",
      guides: "Гіди",
    },
  },
  footer: {
    brand: "uahub.world",
    mission:
      "Платформа для повсякденних задач української спільноти: житло, оголошення, послуги, події, гіди, ресурси та приватні знайомства.",
    geoScale: "Geo-first структура залишається масштабованою на нові міста, регіони та країни.",
    languageRule: "UI українською, моделі й дані англійською, контент може бути мультимовним.",
  },
  cityNav: {
    mobileAriaPrefix: "Мобільна навігація",
    sidebarAriaPrefix: "Навігація по",
    sections: "Розділи",
    context: "Локальний контекст",
    quickFocus: "Швидкий фокус",
    quickFocusText: "Місто тут працює як контекст: що знайти, куди піти й які сервіси вже поруч.",
  },
} as const;

export const ui = uiUk;

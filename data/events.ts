import type { CitySlug } from "./cities";

export type EventItem = {
  id: string;
  city: CitySlug;
  title: string;
  date: string;
  type: "Meetup" | "Workshop" | "Community";
  description: string;
};

export const events: EventItem[] = [
  {
    id: "event-torrevieja-coffee",
    city: "torrevieja",
    title: "Кава та нетворк для новоприбулих",
    date: "23 березня",
    type: "Meetup",
    description: "Неформальна зустріч для тих, хто хоче швидко знайти своє коло.",
  },
  {
    id: "event-torrevieja-family",
    city: "torrevieja",
    title: "Сімейний пікнік біля моря",
    date: "27 березня",
    type: "Community",
    description: "Відкрита зустріч для батьків, дітей і волонтерів спільноти.",
  },
  {
    id: "event-alicante-workshop",
    city: "alicante",
    title: "Практичний воркшоп по NIE",
    date: "24 березня",
    type: "Workshop",
    description: "Покрокова сесія про документи, запис і типові помилки новоприбулих.",
  },
  {
    id: "event-alicante-networking",
    city: "alicante",
    title: "Вечір спільноти та нетворку",
    date: "29 березня",
    type: "Meetup",
    description: "Невелика зустріч для пошуку друзів, контактів і локальних рекомендацій.",
  },
];

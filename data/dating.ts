export type DatingIntent = "friends" | "networking" | "relationships";
export type DatingPhotoState = "blurred" | "locked" | "approved";
export type DatingRequestState = "available" | "pending" | "accepted";

export type DatingProfile = {
  id: string;
  citySlug: "torrevieja" | "alicante";
  districtSlug?: string | null;
  name: string;
  age: number;
  intent: DatingIntent;
  summary: string;
  interests: string[];
  verified: boolean;
  photoState: DatingPhotoState;
  requestState: DatingRequestState;
};

export const datingProfiles: DatingProfile[] = [
  {
    id: "dating-torrevieja-olena",
    citySlug: "torrevieja",
    districtSlug: "centro",
    name: "Олена",
    age: 29,
    intent: "friends",
    summary: "Шукаю коло спілкування в місті, прогулянки, каву і прості дружні зустрічі без тиску.",
    interests: ["Прогулянки", "Кава", "Море", "Йога"],
    verified: true,
    photoState: "blurred",
    requestState: "available",
  },
  {
    id: "dating-torrevieja-andrii",
    citySlug: "torrevieja",
    districtSlug: "marina",
    name: "Андрій",
    age: 34,
    intent: "networking",
    summary: "Цікавлять бізнес-знайомства, локальні контакти та люди, з якими можна запускати корисні ідеї в регіоні.",
    interests: ["Підприємництво", "Нетворк", "Авто", "Спорт"],
    verified: false,
    photoState: "locked",
    requestState: "pending",
  },
  {
    id: "dating-alicante-ira",
    citySlug: "alicante",
    districtSlug: "ensanche",
    name: "Іра",
    age: 31,
    intent: "relationships",
    summary: "Відкрита до спокійного знайомства, спільних прогулянок і поступового спілкування без публічності.",
    interests: ["Культура", "Подорожі", "Книги", "Вечірні прогулянки"],
    verified: true,
    photoState: "blurred",
    requestState: "available",
  },
  {
    id: "dating-alicante-max",
    citySlug: "alicante",
    districtSlug: "centro",
    name: "Макс",
    age: 30,
    intent: "friends",
    summary: "Шукаю друзів у місті для спорту, івентів і локальних рекомендацій. Після схвалення відкриваю більше деталей.",
    interests: ["Біг", "Нетворк", "Події", "Кіно"],
    verified: true,
    photoState: "approved",
    requestState: "accepted",
  },
];

import type { ModerationLogRecord, ReportRecord, SubmissionRecord } from "@/types/domain";

export const submissions: SubmissionRecord[] = [
  {
    id: "submission-listing-1",
    module: "listings",
    categorySlug: "rent-offer",
    title: "Кімната на короткий термін",
    summary: "Пропозиція кімнати для новоприбулих на 2 тижні.",
    body: "Потрібна модерація перед публікацією. Приватне оголошення від мешканки Торревʼєхи.",
    authorType: "private_person",
    businessProfileSlug: null,
    geoScopeType: "city",
    countrySlug: "spain",
    regionSlug: "valencia",
    citySlug: "torrevieja",
    districtSlug: "centro",
    payload: {
      address_text: "Torrevieja, Centro",
      price_label: "200 €/2 тижні",
    },
    status: "pending_review",
    createdAt: "2026-03-19T10:00:00Z",
    updatedAt: "2026-03-19T10:00:00Z",
  },
  {
    id: "submission-service-1",
    module: "services",
    categorySlug: "translation",
    title: "Переклад документів Alicante",
    summary: "Приватний перекладач для базових пакетів документів.",
    body: "Потрібно підтвердити опис і контакти. Може бути опубліковано після перевірки.",
    authorType: "private_person",
    businessProfileSlug: null,
    geoScopeType: "city",
    countrySlug: "spain",
    regionSlug: "valencia",
    citySlug: "alicante",
    districtSlug: "ensanche",
    payload: {
      contact_label: "Написати в Telegram",
    },
    status: "changes_requested",
    createdAt: "2026-03-18T16:00:00Z",
    updatedAt: "2026-03-19T08:00:00Z",
  },
];

export const moderationLogs: ModerationLogRecord[] = [
  {
    id: "modlog-1",
    entityTable: "submissions",
    entityId: "submission-listing-1",
    action: "submitted",
    previousStatus: null,
    nextStatus: "pending_review",
    note: "Автоматично створено після public submit.",
    createdAt: "2026-03-19T10:00:00Z",
  },
  {
    id: "modlog-2",
    entityTable: "submissions",
    entityId: "submission-service-1",
    action: "requested_changes",
    previousStatus: "pending_review",
    nextStatus: "changes_requested",
    note: "Потрібно уточнити спосіб контакту.",
    createdAt: "2026-03-19T08:00:00Z",
  },
];

export const reports: ReportRecord[] = [
  {
    id: "report-1",
    entityTable: "listings",
    entityId: "listing-alicante-rent",
    reason: "Потрібно перевірити актуальність оголошення.",
    status: "open",
    createdAt: "2026-03-19T13:00:00Z",
  },
];

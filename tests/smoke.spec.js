import { expect, test } from "@playwright/test";

test("homepage renders", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/uahub\.world/i);
  await expect(page.getByRole("heading", { name: /Знайди житло, роботу, людей і потрібні сервіси без хаосу/i })).toBeVisible();
  await expect(page.getByRole("link", { name: "Почати зі старту" })).toBeVisible();
});

test("start page opens", async ({ page }) => {
  await page.goto("/start");

  await expect(page.getByRole("heading", { name: "Почати життя в Іспанії без хаосу" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Старт у Торревʼєсі" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Міський гід" }).first()).toBeVisible();
});

test("city dashboard renders with sidebar navigation", async ({ page }) => {
  await page.goto("/torrevieja");

  await expect(page.getByRole("heading", { name: /Що зараз важливо в Торревʼєха/i })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Навігація по Торревʼєха" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Оголошення" }).first()).toBeVisible();
});

test("listings page opens", async ({ page }) => {
  await page.goto("/torrevieja/listings");

  await expect(page.getByRole("heading", { name: "Свіжі оголошення" })).toBeVisible();
  await expect(page.getByText("Оренда 2-кімнатної квартири біля моря")).toBeVisible();
  await expect(page.getByRole("searchbox", { name: "Пошук", exact: true })).toBeVisible();
});

test("listings filters and detail page work", async ({ page }) => {
  await page.goto("/alicante/listings");
  const main = page.getByRole("main");

  await main.getByRole("link", { name: "Робота", exact: true }).click();
  await expect(page.getByText("Бариста на вечірні зміни в центрі")).toBeVisible();
  await expect(page.getByText("Шукаємо квартиру на довгу оренду")).toHaveCount(0);

  await main.getByRole("searchbox", { name: "Пошук", exact: true }).fill("бариста");
  await main.getByRole("button", { name: "Знайти" }).click();
  await expect(page.getByText("Бариста на вечірні зміни в центрі")).toBeVisible();
  await expect(page.getByText("Категорія: Робота")).toBeVisible();

  await page.getByRole("link", { name: "Відкрити деталі" }).click();
  await expect(page.getByRole("heading", { name: "Бариста на вечірні зміни в центрі" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Деталі" })).toBeVisible();
});

test("events page opens", async ({ page }) => {
  await page.goto("/alicante/events");

  await expect(page.getByRole("heading", { name: "Події поруч" })).toBeVisible();
  await expect(page.getByText("Практичний воркшоп по NIE")).toBeVisible();
  await page.getByRole("link", { name: "Воркшопи" }).click();
  await expect(page.getByText("Практичний воркшоп по NIE")).toBeVisible();
  await expect(page.getByText("Вечір спільноти та нетворку")).toHaveCount(0);
  await page.getByRole("link", { name: "Відкрити подію" }).click();
  await expect(page.getByRole("heading", { name: "Практичний воркшоп по NIE" })).toBeVisible();
  await expect(page.getByText("Коли:")).toBeVisible();
});

test("services page opens", async ({ page }) => {
  await page.goto("/alicante/services");

  await expect(page.getByRole("heading", { name: "Послуги" })).toBeVisible();
  await expect(page.getByText("Mar Legal Consult")).toBeVisible();
  await page.getByRole("link", { name: "Юридичні" }).click();
  await expect(page.getByText("Mar Legal Consult")).toBeVisible();
  await expect(page.getByText("Clínica Salud Mar")).toHaveCount(0);
  await page.getByRole("link", { name: "Відкрити профіль" }).click();
  await expect(page.getByRole("heading", { name: "Mar Legal Consult" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Відкрити бізнес-профіль" })).toBeVisible();
});

test("guide page opens", async ({ page }) => {
  await page.goto("/torrevieja/guide");

  await expect(page.getByRole("heading", { name: "Гід" })).toBeVisible();
  await expect(page.getByText("Як отримати NIE")).toBeVisible();
  await page.getByRole("link", { name: "Документи" }).click();
  await expect(page.getByText("Як отримати NIE")).toBeVisible();
  await expect(page.getByText("Як знайти квартиру без зайвого ризику")).toHaveCount(0);
  await page.getByRole("link", { name: "Відкрити гід" }).click();
  await expect(page.getByRole("heading", { name: "Як отримати NIE" })).toBeVisible();
  await expect(page.getByText("Що робити далі")).toBeVisible();
});

test("search page opens and links to detail results", async ({ page }) => {
  await page.goto("/search?q=NIE&city=alicante");

  await expect(page.getByRole("heading", { name: "Пошук по платформі" })).toBeVisible();
  await expect(page.getByText("Практичний воркшоп по NIE")).toBeVisible();
  await page.getByRole("link", { name: "Відкрити результат" }).first().click();
  await expect(page.getByRole("heading", { name: /NIE/i })).toBeVisible();
});

test("admin moderation queue renders grouped submissions", async ({ page }) => {
  await page.goto("/admin/moderation");

  await expect(page.getByRole("heading", { name: "Черга модерації" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Очікують перевірки" })).toBeVisible();
  const listingCard = page.getByRole("article").filter({ hasText: "Кімната на короткий термін" });
  await expect(listingCard).toBeVisible();
  await expect(listingCard.getByText("Попередній перегляд даних:")).toBeVisible();
});

test("dating foundation page opens", async ({ page }) => {
  await page.goto("/alicante/dating");

  await expect(page.getByRole("heading", { name: "Знайомства" })).toBeVisible();
  await expect(page.getByText("Іра, 31")).toBeVisible();
  await page.getByRole("link", { name: "Відносини" }).click();
  await expect(page.getByText("Іра, 31")).toBeVisible();
  await expect(page.getByText("Макс, 30")).toHaveCount(0);
});

test("resources page opens and filters work", async ({ page }) => {
  await page.goto("/alicante/resources");

  await expect(page.getByRole("heading", { name: "Ресурси спільноти" })).toBeVisible();
  await expect(page.getByText("Українці Аліканте — Instagram")).toBeVisible();
  await page.getByRole("link", { name: "Facebook" }).click();
  await expect(page.getByText("Українці в Аліканте — Facebook")).toBeVisible();
  await expect(page.getByText("Українці Аліканте — Instagram")).toHaveCount(0);
});

test("real estate page opens and detail route works", async ({ page }) => {
  await page.goto("/alicante/real-estate");

  await expect(page.getByRole("heading", { name: "Нерухомість" })).toBeVisible();
  await expect(page.getByText("Продаж квартири в Ensanche, Alicante")).toBeVisible();

  await page.getByRole("link", { name: "Продаж" }).click();
  await expect(page.getByText("Шукаю studio або pequeño piso в San Blas")).toHaveCount(0);

  await page.getByRole("link", { name: "Відкрити обʼєкт" }).first().click();
  await expect(page.getByRole("heading", { name: "Деталі обʼєкта" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Відкрити в Google Maps" })).toBeVisible();
});

test("submission flow shows localized success state", async ({ page }) => {
  await page.goto("/add/listing");

  await page.getByLabel("Заголовок").fill("Тестова подача житла");
  await page.getByLabel("Короткий опис").fill("Короткий опис для перевірки moderated submission flow.");
  await page.getByLabel("Деталі").fill("Детальні умови, локація та базові контактні дані.");
  await page.getByRole("button", { name: "Надіслати на модерацію" }).click();

  await expect(page.getByText("Готово:")).toBeVisible();
  await expect(page.getByRole("link", { name: "Відкрити чергу модерації" })).toBeVisible();
});

test("admin real estate manager opens", async ({ page }) => {
  await page.goto("/admin/real-estate");

  await expect(page.getByRole("heading", { name: "Менеджер нерухомості" })).toBeVisible();
  await expect(page.getByText("Продаж квартири в Ensanche, Alicante")).toBeVisible();
});

import { expect, test } from "@playwright/test";

test("homepage renders", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/uahub\.world/i);
  await expect(page.getByRole("heading", { name: "Знайди житло, роботу та своїх поруч" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Почати зі Start" })).toBeVisible();
});

test("start page opens", async ({ page }) => {
  await page.goto("/start");

  await expect(page.getByRole("heading", { name: "Почати життя в Іспанії без хаосу" })).toBeVisible();
  await expect(page.getByText("1. NIE та базові документи")).toBeVisible();
});

test("city dashboard renders with sidebar navigation", async ({ page }) => {
  await page.goto("/torrevieja");

  await expect(page.getByRole("heading", { name: "Локальна платформа для українців у Торревʼєсі" })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Навігація по Торревʼєха" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Оголошення" }).first()).toBeVisible();
});

test("listings page opens", async ({ page }) => {
  await page.goto("/torrevieja/listings");

  await expect(page.getByRole("heading", { name: "Свіжі оголошення" })).toBeVisible();
  await expect(page.getByText("Оренда 2-кімнатної квартири біля моря")).toBeVisible();
  await expect(page.getByRole("searchbox", { name: "Пошук" })).toBeVisible();
});

test("listings filters and detail page work", async ({ page }) => {
  await page.goto("/alicante/listings");

  await page.getByRole("link", { name: "Робота" }).click();
  await expect(page.getByText("Бариста на вечірні зміни в центрі")).toBeVisible();
  await expect(page.getByText("Шукаємо квартиру на довгу оренду")).toHaveCount(0);

  await page.getByRole("searchbox", { name: "Пошук" }).fill("бариста");
  await page.getByRole("button", { name: "Знайти" }).click();
  await expect(page.getByText("Бариста на вечірні зміни в центрі")).toBeVisible();
  await expect(page.getByText("категорія: Робота")).toBeVisible();

  await page.getByRole("link", { name: "Відкрити деталі" }).click();
  await expect(page.getByRole("heading", { name: "Бариста на вечірні зміни в центрі" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Деталі" })).toBeVisible();
});

test("events page opens", async ({ page }) => {
  await page.goto("/alicante/events");

  await expect(page.getByRole("heading", { name: "Події поруч" })).toBeVisible();
  await expect(page.getByText("Практичний воркшоп по NIE")).toBeVisible();
});

test("services page opens", async ({ page }) => {
  await page.goto("/alicante/services");

  await expect(page.getByRole("heading", { name: "Послуги" })).toBeVisible();
  await expect(page.getByText("Mar Legal Consult")).toBeVisible();
});

test("guide page opens", async ({ page }) => {
  await page.goto("/torrevieja/guide");

  await expect(page.getByRole("heading", { name: "Гід" })).toBeVisible();
  await expect(page.getByText("Як отримати NIE")).toBeVisible();
});

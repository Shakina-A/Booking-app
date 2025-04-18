import { test, expect } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);   
 
   //get the sign in button
   await page.getByRole("link",{name:"Sign In"}).click();
 
   await expect(page.getByRole("heading",{name:"Sign In"})).toBeVisible();
 
   await page.locator("[name=email]").fill("1@1.com");
   await page.locator("[name=password]").fill("password123");
 
   await page.getByRole("button",{name:"Login"}).click();
 
   await expect(page.getByText("Sign in Successful")).toBeVisible();
});

test("should allow user to add a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}add-hotel`);

  await page.locator('[name="name"]').fill("Test Hotel");
  await page.locator('[name="city"]').fill("Test City");
  await page.locator('[name="country"]').fill("Test Country");
  await page
    .locator('[name="description"]')
    .fill("This is a description for the Test Hotel");
  await page.locator('[name="pricePerNight"]').fill("100");
  await page.selectOption('select[name="starRating"]', "3");

  await page.getByText("Budget").click();

  await page.getByLabel("Free Wifi").check();
  await page.getByLabel("Parking").check();

  await page.locator('[name="adultCount"]').fill("2");
  await page.locator('[name="childCount"]').fill("4");

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "1a.jpg"),
    path.join(__dirname, "files", "1b.jpg"),
    path.join(__dirname, "files", "1c.jpg"),
    path.join(__dirname, "files", "1d.jpg"),
    path.join(__dirname, "files", "1e.jpg"),
  ]);

  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel Saved!")).toBeVisible();
});

test("should display hotels", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);

  await expect(page.getByRole("heading", { name: "Radisson Blu Hotel" })).toBeVisible();
  await expect(page.getByText("Located in Central Chennai")).toBeVisible();
  await expect(page.getByText("Chennai, India")).toBeVisible();
  await expect(page.getByText("Family")).toBeVisible();
  await expect(page.getByText("£400 per night")).toBeVisible();
  await expect(page.getByText("2 adults, 2 children")).toBeVisible();
  await expect(page.getByText("4 Star Rating")).toBeVisible();

  await expect(
    page.getByRole("link", { name: "View Details" }).first()
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
});

test("should edit hotel", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);

  await page.getByRole("link", { name: "View Details" }).first().click();

  await page.waitForSelector('[name="name"]', { state: "attached" });
  await expect(page.locator('[name="name"]')).toHaveValue("Radisson Blu Hotel ");
  await page.locator('[name="name"]').fill("Radisson Blu Hotel UPDATED");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel Updated!")).toBeVisible();

  await page.reload();

  await expect(page.locator('[name="name"]')).toHaveValue(
    "Radisson Blu Hotel UPDATED"
 );
  await page.locator('[name="name"]').fill("Radisson Blu Hotel ");
  await page.getByRole("button", { name: "Save" }).click();
});
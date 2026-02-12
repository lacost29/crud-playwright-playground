import test, { expect } from "@playwright/test";

test("a CRUD app user is able to add/update/read and delete another user", async ({
  page,
}) => {
  // Navigate to CRUD application
  await page.goto("http://localhost:3000/");

  // Enter new user's details > Click 'Add new user' button
  await page.locator("[name='gender']").selectOption("male");
  await page.locator("[name='name']").fill("Steve Tyler");
  await page.locator("[name='profession']").fill("Product Owner");
  await page
    .locator("//html/body/div/div/div/div[1]/form/div[4]/div/div/input")
    .fill("1990-01-01");

  await page
    .locator("//html/body/div/div/div/div[1]/form/div[5]/button")
    .click();

  // Verify new user is successfully created
  const createdUserTableRow = page
    .locator("//td[text()='Steve Tyler']")
    .locator("//parent::tr");
  await expect(createdUserTableRow.locator("//td[1]")).toHaveText("male");
  await expect(createdUserTableRow.locator("//td[2]")).toHaveText(
    "Steve Tyler",
  );
  await expect(createdUserTableRow.locator("//td[3]")).toHaveText("1990-01-01");
  await expect(createdUserTableRow.locator("//td[4]")).toHaveText(
    "Product Owner",
  );

  // Edit user's details > Click 'Update' button
  await createdUserTableRow.locator("//td[5]/button[1]").click();
  await page.locator("[name='gender']").selectOption("male");
  await page.locator("[name='name']").fill("Steve Tyler Jn");
  await page.locator("[name='profession']").fill("Head of Product");
  await page
    .locator("//html/body/div/div/div/div[1]/form/div[4]/div/div/input")
    .fill("1980-11-12");

  await page
    .locator("//html/body/div/div/div/div[1]/form/div[5]/button[1]")
    .click();

  // Verify new user is successfully created
  const updatedUserTableRow = page
    .locator("//td[text()='Steve Tyler Jn']")
    .locator("//parent::tr");
  await expect(updatedUserTableRow.locator("//td[1]")).toHaveText("male");
  await expect(updatedUserTableRow.locator("//td[2]")).toHaveText(
    "Steve Tyler Jn",
  );
  await expect(updatedUserTableRow.locator("//td[3]")).toHaveText("1980-11-12");
  await expect(updatedUserTableRow.locator("//td[4]")).toHaveText(
    "Head of Product",
  );

  // Delete the user > Verify user is deleted
  await updatedUserTableRow.locator("//td[5]//button[2]").click();
  await expect(updatedUserTableRow).toHaveCount(0);
});

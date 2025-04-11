import { expect, test } from "@playwright/test"

test("should navigate to the register page, return to the login page and navigate to the landing page", async ({
  page,
}) => {
  await page.goto("/login")
  await page.click("text=Criar uma conta aqui")
  await expect(page).toHaveURL("/register")

  await page.goto("/register")
  await page.click("text=Entre aqui")
  await expect(page).toHaveURL("/login")

  await page.click("text=Voltar ao início")
  await expect(page).toHaveURL("/")
})

test("should navigate to the register page with different buttons, returning to the landing page if necessary", async ({
  page,
}) => {
  await page.goto("/")

  await page.click("text=Começar teste gratuito")
  await expect(page).toHaveURL("/register")

  await page.click("text=Voltar ao início")
  await expect(page).toHaveURL("/")

  await page.click("text=Começar gratuitamente")
  await expect(page).toHaveURL("/register")

  await page.click("text=Voltar ao início")
  await expect(page).toHaveURL("/")

  await page.click("text=Começar agora")
  await expect(page).toHaveURL("/register")
})

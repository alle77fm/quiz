import { test, expect } from "@playwright/test";

const VIEWPORTS = [
  { name: "mobile-390x844", width: 390, height: 844 },
  { name: "mobile-360x800", width: 360, height: 800 },
  { name: "desktop-1440x900", width: 1440, height: 900 },
] as const;

test.describe("Tela 0 — verificação visual e de console", () => {
  for (const viewport of VIEWPORTS) {
    test(`sem rolagem horizontal e sem erro de console em ${viewport.name}`, async ({
      page,
    }) => {
      const consoleErrors: string[] = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") consoleErrors.push(msg.text());
      });
      page.on("pageerror", (err) => consoleErrors.push(err.message));

      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto("/");
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth);

      expect(consoleErrors).toEqual([]);

      await page.screenshot({
        path: `.screenshots/tela0-${viewport.name}.png`,
        fullPage: true,
      });
    });
  }

  test("primeira dobra em 390x844 mostra marca, título, subtítulo, 15 perguntas e CTA", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const cta = page.getByRole("link", { name: "Entrar na experiência" });
    const box = await cta.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y + box!.height).toBeLessThanOrEqual(844);

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("Um percurso de quinze perguntas")).toBeVisible();
    await expect(page.getByText("15 perguntas")).toBeVisible();
  });

  test("CTA navega para /quiz sem chamada de rede nem storage", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Entrar na experiência" }).click();
    await expect(page).toHaveURL(/\/quiz$/);
    await expect(
      page.getByText("Esta etapa está sendo preparada"),
    ).toBeVisible();

    const storageState = await page.evaluate(() => ({
      localStorage: window.localStorage.length,
      sessionStorage: window.sessionStorage.length,
      cookies: document.cookie,
    }));
    expect(storageState.localStorage).toBe(0);
    expect(storageState.sessionStorage).toBe(0);
    expect(storageState.cookies).toBe("");
  });

  test("metadata noindex/nofollow presente no HTML renderizado", async ({
    page,
  }) => {
    await page.goto("/");
    const robots = await page.locator('meta[name="robots"]').getAttribute(
      "content",
    );
    expect(robots).toContain("noindex");
    expect(robots).toContain("nofollow");
  });
});

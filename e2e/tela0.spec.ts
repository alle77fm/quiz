import { test, expect } from "@playwright/test";

const VIEWPORTS = [
  { name: "mobile-360x800", width: 360, height: 800 },
  { name: "mobile-390x844", width: 390, height: 844 },
  { name: "mobile-430x932", width: 430, height: 932 },
  { name: "desktop-1366x768", width: 1366, height: 768 },
  { name: "desktop-1440x900", width: 1440, height: 900 },
  { name: "desktop-1920x1080", width: 1920, height: 1080 },
] as const;

test.describe("Tela 0 — verificação visual e de console (redesign dark/gold)", () => {
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
        fullPage: false,
      });
    });
  }

  test("conteúdo essencial visível: headline, 15 perguntas e CTA", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("15 perguntas")).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Entrar na experiência" }),
    ).toBeVisible();
  });

  test("CTA precede a headline e aparece na primeira dobra mobile", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto("/");

    const cta = page.getByRole("link", { name: "Entrar na experiência" });
    const headline = page.getByRole("heading", { level: 1 });
    const [ctaBox, headlineBox] = await Promise.all([
      cta.boundingBox(),
      headline.boundingBox(),
    ]);

    expect(ctaBox).not.toBeNull();
    expect(headlineBox).not.toBeNull();
    expect(ctaBox!.y + ctaBox!.height).toBeLessThanOrEqual(800);
    expect(ctaBox!.y).toBeLessThan(headlineBox!.y);
  });

  test("CTA exibe foco visível por teclado", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.keyboard.press("Tab");

    const cta = page.getByRole("link", { name: "Entrar na experiência" });
    await expect(cta).toBeFocused();
    await expect(cta).toHaveCSS("outline-style", "solid");
  });

  test("primeira dobra em 1440x900 mostra marca, headline e CTA sem rolar", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    const cta = page.getByRole("link", { name: "Entrar na experiência" });
    const box = await cta.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y + box!.height).toBeLessThanOrEqual(900);

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("main").getByText("Casa com Alma")).toBeVisible();
  });

  test("CTA navega para /quiz e inicia a primeira pergunta, sem storage", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Entrar na experiência" }).click();
    await expect(page).toHaveURL(/\/quiz$/);
    await expect(page.getByRole("progressbar")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

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

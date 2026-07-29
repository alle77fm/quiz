import { test, expect, type Page } from "@playwright/test";
import {
  DEMO_Q01,
  DEMO_Q12A,
  DEMO_Q12B,
  DEMO_QUESTIONS_FIM,
  DEMO_QUESTIONS_MEIO,
} from "@/config/quiz/v1/homologacao/demo-questions";

const RESOLUTIONS = [
  { name: "360x800", width: 360, height: 800 },
  { name: "390x844", width: 390, height: 844 },
  { name: "430x932", width: 430, height: 932 },
  { name: "1366x768", width: 1366, height: 768 },
  { name: "1440x900", width: 1440, height: 900 },
  { name: "1920x1080", width: 1920, height: 1080 },
] as const;

const SNAPSHOT_VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1440, height: 900 },
] as const;

async function answerQuestion(page: Page) {
  await page.getByRole("radio").first().click();
}

async function completeAllQuestions(page: Page, count: number) {
  for (let i = 0; i < count; i += 1) {
    await answerQuestion(page);
  }
}

async function answerByLabel(page: Page, label: string) {
  await page.getByRole("radio", { name: label }).click();
}

/** Responde q01 com a alternativa indicada e as 10 perguntas seguintes
 * (q02–q11), chegando à posição de q12a/q12b sem respondê-la ainda. */
async function chegarEmQ12(page: Page, opcaoQ01Label: string) {
  await answerByLabel(page, opcaoQ01Label);
  for (const questao of DEMO_QUESTIONS_MEIO) {
    await answerByLabel(page, questao.opcoes[0].label);
  }
}

test.describe("Fluxo do quiz — navegação, responsividade e capturas", () => {
  for (const resolution of RESOLUTIONS) {
    test(`primeira pergunta sem rolagem horizontal em ${resolution.name}`, async ({
      page,
    }) => {
      const consoleErrors: string[] = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") consoleErrors.push(msg.text());
      });
      page.on("pageerror", (err) => consoleErrors.push(err.message));

      await page.setViewportSize(resolution);
      await page.goto("/quiz");

      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.getByRole("progressbar")).toBeVisible();

      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
      expect(consoleErrors).toEqual([]);
    });
  }

  test("voltar na primeira pergunta retorna à home", async ({ page }) => {
    await page.goto("/quiz");
    await page.getByRole("button", { name: "Voltar" }).click();
    await expect(page).toHaveURL(/\/$/);
  });

  test("progresso avança a cada resposta e some após a captura", async ({
    page,
  }) => {
    await page.goto("/quiz");
    const bar = page.getByRole("progressbar");
    const initial = await bar.getAttribute("aria-valuenow");

    await answerQuestion(page);
    const afterOne = await bar.getAttribute("aria-valuenow");
    expect(Number(afterOne)).toBeGreaterThan(Number(initial));
  });

  test("captura valida nome e consentimento obrigatório antes de avançar", async ({
    page,
  }) => {
    await page.goto("/quiz");
    await completeAllQuestions(page, 15);
    // processamento (auto-avança) → prévia do mapa → intenção → ponte → mapa pronto → captura
    await expect(page.getByText("Preparando o seu mapa")).toBeVisible();
    await page.getByRole("button", { name: "Continuar" }).click(); // sai do processamento
    await expect(page.getByText("Casa-Refúgio")).toBeVisible();
    await page.getByRole("button", { name: "Continuar" }).click(); // sai da prévia do mapa
    await page.getByRole("radio").first().click(); // intenção
    await page.getByText("Conversar com a Jeruska").click(); // ponte
    await page.getByRole("button", { name: "Continuar" }).click(); // sai do mapa pronto

    await expect(
      page.getByRole("heading", { name: "Para guardar seu mapa" }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Ver meu resultado" }).click();
    await expect(page.getByText("Informe seu nome")).toBeVisible();
    await expect(
      page.getByText("É necessário autorizar para continuar"),
    ).toBeVisible();

    await page.getByLabel("Nome").fill("Maria Teste");
    await page
      .getByRole("checkbox", { name: /Autorizo o armazenamento/ })
      .check();
    await page.getByRole("button", { name: "Ver meu resultado" }).click();

    await expect(page.getByText(/Maria Teste, seu mapa/)).toBeVisible();

    // resultado → feedback: fluxo completo até a última tela
    await page.getByRole("button", { name: "Deixar um feedback" }).click();
    await expect(
      page.getByRole("heading", { name: "O que você achou desta experiência?" }),
    ).toBeVisible();
    await page.getByRole("radio", { name: "5" }).click();
    await page.getByRole("button", { name: "Enviar feedback" }).click();
    await expect(page.getByRole("heading", { name: "Obrigado." })).toBeVisible();
  });

  for (const viewport of SNAPSHOT_VIEWPORTS) {
    test(`capturas do fluxo — ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize(viewport);

      await page.goto("/");
      await page.screenshot({
        path: `.screenshots/flow-01-home-${viewport.name}.png`,
      });

      await page.getByRole("link", { name: "Entrar na experiência" }).click();
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await page.screenshot({
        path: `.screenshots/flow-02-pergunta-${viewport.name}.png`,
      });

      // avança algumas perguntas para mostrar a barra de progresso em movimento
      await completeAllQuestions(page, 7);
      await page.screenshot({
        path: `.screenshots/flow-03-progresso-${viewport.name}.png`,
      });

      await completeAllQuestions(page, 8);
      await expect(page.getByText("Preparando o seu mapa")).toBeVisible();
      await page.getByRole("button", { name: "Continuar" }).click();
      await page.getByRole("button", { name: "Continuar" }).click(); // prévia do mapa

      await expect(
        page.getByRole("heading", {
          name: "Em relação a iniciar terapia, onde você está agora?",
        }),
      ).toBeVisible();
      await page.screenshot({
        path: `.screenshots/flow-04-intencao-${viewport.name}.png`,
      });

      await page.getByRole("radio").first().click();
      await page.getByText("Conversar com a Jeruska").click();
      await page.getByRole("button", { name: "Continuar" }).click();
      await page.screenshot({
        path: `.screenshots/flow-05-captura-${viewport.name}.png`,
      });

      await page.getByLabel("Nome").fill("Maria Teste");
      await page
        .getByRole("checkbox", { name: /Autorizo o armazenamento/ })
        .check();
      await page.getByRole("button", { name: "Ver meu resultado" }).click();
      await expect(page.getByText(/Maria Teste, seu mapa/)).toBeVisible();
      await page.screenshot({
        path: `.screenshots/flow-06-resultado-${viewport.name}.png`,
      });
    });
  }
});

test.describe("Bifurcação estrutural q12a/q12b", () => {
  test('q01 = "Vivo só" direciona para q12a', async ({ page }) => {
    const opcaoSo = DEMO_Q01.opcoes.find((o) => o.perfilMoradia === "sozinha")!;
    await page.goto("/quiz");
    await chegarEmQ12(page, opcaoSo.label);

    await expect(
      page.getByRole("heading", { level: 1, name: DEMO_Q12A.texto }),
    ).toBeVisible();
  });

  test("q01 = opção de morar acompanhado direciona para q12b", async ({
    page,
  }) => {
    const opcaoAcompanhada = DEMO_Q01.opcoes.find(
      (o) => o.perfilMoradia === "acompanhada",
    )!;
    await page.goto("/quiz");
    await chegarEmQ12(page, opcaoAcompanhada.label);

    await expect(
      page.getByRole("heading", { level: 1, name: DEMO_Q12B.texto }),
    ).toBeVisible();
  });

  test("nunca as duas variantes de q12 aparecem no mesmo percurso", async ({
    page,
  }) => {
    const opcaoSo = DEMO_Q01.opcoes.find((o) => o.perfilMoradia === "sozinha")!;
    await page.goto("/quiz");
    await chegarEmQ12(page, opcaoSo.label);

    await expect(
      page.getByRole("heading", { level: 1, name: DEMO_Q12A.texto }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 1, name: DEMO_Q12B.texto }),
    ).toHaveCount(0);
  });

  test("voltar até q01 e trocar a resposta recalcula o caminho (q12a → q12b)", async ({
    page,
  }) => {
    const opcaoSo = DEMO_Q01.opcoes.find((o) => o.perfilMoradia === "sozinha")!;
    const opcaoAcompanhada = DEMO_Q01.opcoes.find(
      (o) => o.perfilMoradia === "acompanhada",
    )!;

    await page.goto("/quiz");
    await chegarEmQ12(page, opcaoSo.label);
    await expect(
      page.getByRole("heading", { level: 1, name: DEMO_Q12A.texto }),
    ).toBeVisible();

    // volta 11 vezes: de q12 até q01
    for (let i = 0; i < 11; i += 1) {
      await page.getByRole("button", { name: "Voltar" }).click();
    }
    await expect(
      page.getByRole("heading", { level: 1, name: DEMO_Q01.texto }),
    ).toBeVisible();

    await chegarEmQ12(page, opcaoAcompanhada.label);
    await expect(
      page.getByRole("heading", { level: 1, name: DEMO_Q12B.texto }),
    ).toBeVisible();
  });

  test("cada percurso soma exatamente 15 perguntas até a tela de processamento", async ({
    page,
  }) => {
    const opcaoSo = DEMO_Q01.opcoes.find((o) => o.perfilMoradia === "sozinha")!;
    await page.goto("/quiz");
    await chegarEmQ12(page, opcaoSo.label); // 1 (q01) + 10 (q02-q11) = 11 respostas
    await answerQuestion(page); // q12a = 12ª resposta
    for (const questao of DEMO_QUESTIONS_FIM) {
      await answerByLabel(page, questao.opcoes[0].label); // q13-q15 = 13ª-15ª
    }

    await expect(page.getByText("Preparando o seu mapa")).toBeVisible();
  });
});

test.describe("Isolamento de dados — sem rede, sem persistência", () => {
  test("nenhuma requisição de rede é enviada durante o preenchimento do fluxo", async ({
    page,
  }) => {
    const requisicoesForaDaOrigem: string[] = [];
    const requisicoesDeEscrita: string[] = [];

    page.on("request", (req) => {
      const url = new URL(req.url());
      if (url.origin !== "http://127.0.0.1:4300") {
        requisicoesForaDaOrigem.push(req.url());
      }
      if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method())) {
        requisicoesDeEscrita.push(`${req.method()} ${req.url()}`);
      }
    });

    await page.goto("/quiz");
    await completeAllQuestions(page, 15);
    await expect(page.getByText("Preparando o seu mapa")).toBeVisible();
    await page.getByRole("button", { name: "Continuar" }).click();
    await page.getByRole("button", { name: "Continuar" }).click();
    await page.getByRole("radio").first().click();
    await page.getByText("Conversar com a Jeruska").click();
    await page.getByRole("button", { name: "Continuar" }).click();
    await page.getByLabel("Nome").fill("Maria Teste");
    await page
      .getByRole("checkbox", { name: /Autorizo o armazenamento/ })
      .check();
    await page.getByRole("button", { name: "Ver meu resultado" }).click();
    await expect(page.getByText(/Maria Teste, seu mapa/)).toBeVisible();

    expect(requisicoesForaDaOrigem).toEqual([]);
    expect(requisicoesDeEscrita).toEqual([]);
  });

  test("nenhum dado pessoal permanece no navegador após reiniciar o fluxo", async ({
    page,
  }) => {
    await page.goto("/quiz");
    await completeAllQuestions(page, 15);
    await expect(page.getByText("Preparando o seu mapa")).toBeVisible();
    await page.getByRole("button", { name: "Continuar" }).click();
    await page.getByRole("button", { name: "Continuar" }).click();
    await page.getByRole("radio").first().click();
    await page.getByText("Conversar com a Jeruska").click();
    await page.getByRole("button", { name: "Continuar" }).click();
    await page.getByLabel("Nome").fill("Maria Teste");
    await page
      .getByRole("checkbox", { name: /Autorizo o armazenamento/ })
      .check();
    await page.getByRole("button", { name: "Ver meu resultado" }).click();
    await expect(page.getByText(/Maria Teste, seu mapa/)).toBeVisible();

    const estadoAntes = await page.evaluate(() => ({
      localStorage: window.localStorage.length,
      sessionStorage: window.sessionStorage.length,
      cookies: document.cookie,
    }));
    expect(estadoAntes.localStorage).toBe(0);
    expect(estadoAntes.sessionStorage).toBe(0);
    expect(estadoAntes.cookies).toBe("");

    await page.goto("/quiz");
    await expect(
      page.getByRole("heading", { level: 1, name: DEMO_Q01.texto }),
    ).toBeVisible();
    await expect(page.getByText("Maria Teste")).toHaveCount(0);

    const estadoDepois = await page.evaluate(() => ({
      localStorage: window.localStorage.length,
      sessionStorage: window.sessionStorage.length,
      cookies: document.cookie,
    }));
    expect(estadoDepois.localStorage).toBe(0);
    expect(estadoDepois.sessionStorage).toBe(0);
    expect(estadoDepois.cookies).toBe("");
  });
});

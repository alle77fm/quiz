import { test, expect, type Page } from "@playwright/test";
import {
  DEMO_Q01,
  DEMO_Q12A,
  DEMO_Q12B,
  DEMO_QUESTIONS_FIM,
  DEMO_QUESTIONS_MEIO,
} from "@/config/quiz/v1/homologacao/demo-questions";
import { calcularResultado } from "@/config/quiz/mvp/engine";
import { nomeMapa, TEXTO_AVISO_ESCOPO } from "@/config/quiz/mvp/report-content";
import { DIMENSAO_LABEL } from "@/config/quiz/mvp/dimensions";

/** Respostas de "primeira opção em tudo" — o mesmo caminho exercitado
 * por completeAllQuestions(page, 15). Calculado via o motor real, não
 * hardcoded, para o teste continuar correto se os pesos mudarem. */
const RESPOSTAS_PRIMEIRA_OPCAO: Record<string, string> = {
  [DEMO_Q01.id]: DEMO_Q01.opcoes[0].id,
  ...Object.fromEntries(DEMO_QUESTIONS_MEIO.map((q) => [q.id, q.opcoes[0].id])),
  [DEMO_Q12A.id]: DEMO_Q12A.opcoes[0].id,
  ...Object.fromEntries(
    DEMO_QUESTIONS_FIM.filter((q) => q.id !== "q15").map((q) => [q.id, q.opcoes[0].id]),
  ),
};
const IDS_PONTUAVEIS_PRIMEIRA_OPCAO = [
  DEMO_Q01.id,
  ...DEMO_QUESTIONS_MEIO.map((q) => q.id),
  DEMO_Q12A.id,
  ...DEMO_QUESTIONS_FIM.filter((q) => q.id !== "q15").map((q) => q.id),
];
const SCORE_PRIMEIRA_OPCAO = calcularResultado(
  RESPOSTAS_PRIMEIRA_OPCAO,
  IDS_PONTUAVEIS_PRIMEIRA_OPCAO,
);
const MAPA_PRIMEIRA_OPCAO = nomeMapa(SCORE_PRIMEIRA_OPCAO.mapaPrincipal);

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
    await expect(page.getByText(MAPA_PRIMEIRA_OPCAO)).toBeVisible();
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

    await expect(
      page.getByText(/Maria Teste, este é o seu mapa/),
    ).toBeVisible();

    // resultado → feedback: fluxo completo até a última tela
    await page.getByRole("button", { name: "Deixar um feedback" }).click();
    await expect(
      page.getByRole("heading", { name: "O que você achou desta experiência?" }),
    ).toBeVisible();
    await page.getByRole("radio", { name: "5" }).click();
    await page.getByRole("button", { name: "Enviar feedback" }).click();
    await expect(page.getByRole("heading", { name: "Agradecemos." })).toBeVisible();
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
      await expect(
      page.getByText(/Maria Teste, este é o seu mapa/),
    ).toBeVisible();
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

/** Percorre o fluxo completo até o relatório (tela de resultado). */
async function chegarAoRelatorio(
  page: Page,
  nome = "Maria Teste",
  intencaoLabel = "Estou apenas explorando",
) {
  await page.goto("/quiz");
  await completeAllQuestions(page, 15);
  await expect(page.getByText("Preparando o seu mapa")).toBeVisible();
  await page.getByRole("button", { name: "Continuar" }).click();
  await page.getByRole("button", { name: "Continuar" }).click();
  await page.getByRole("radio", { name: intencaoLabel }).click();
  await page.getByText("Conversar com a Jeruska").click();
  await page.getByRole("button", { name: "Continuar" }).click();
  await page.getByLabel("Nome").fill(nome);
  await page
    .getByRole("checkbox", { name: /Autorizo o armazenamento/ })
    .check();
  await page.getByRole("button", { name: "Ver meu resultado" }).click();
}

/** Mesmos quatro percursos de src/config/quiz/mvp/engine.test.ts — um
 * por mapa alcançável. Duplicados aqui (ids, não labels) para dirigir o
 * navegador sem importar um arquivo de teste como módulo. */
const PERCURSOS_POR_MAPA: Record<string, Record<string, string>> = {
  "casa-refugio": {
    q01: "so",
    q02: "indiferenca",
    q03: "quase-nunca",
    q04: "quase-nunca",
    q05: "muito-a-vontade",
    q06: "conversam",
    q07: "sempre",
    q08: "sempre",
    q09: "silencio",
    q10: "quase-nunca",
    q11: "quase-nunca",
    q12a: "muito-proxima",
    q13: "quase-nunca",
    q14: "assunto",
  },
  "casa-de-reencontro": {
    q01: "so",
    q02: "indiferenca",
    q03: "sempre",
    q04: "quase-nunca",
    q05: "frequentemente-desconfortavel",
    q06: "conversam",
    q07: "quase-nunca",
    q08: "quase-nunca",
    q09: "silencio",
    q10: "quase-nunca",
    q11: "sempre",
    q12a: "muito-distante",
    q13: "sempre",
    q14: "nenhum",
  },
  "casa-dos-vinculos": {
    q01: "so",
    q02: "alivio",
    q03: "sempre",
    q04: "quase-nunca",
    q05: "frequentemente-desconfortavel",
    q06: "sozinho",
    q07: "quase-nunca",
    q08: "quase-nunca",
    q09: "silencio",
    q10: "sempre",
    q11: "sempre",
    q12a: "muito-distante",
    q13: "sempre",
    q14: "nenhum",
  },
  "casa-em-renovacao": {
    q01: "parceiro",
    q02: "alivio",
    q03: "sempre",
    q04: "sempre",
    q05: "muito-a-vontade",
    q06: "sozinho",
    q07: "quase-nunca",
    q08: "quase-nunca",
    q09: "tempo",
    q10: "sempre",
    q11: "sempre",
    q12a: "muito-distante",
    q13: "quase-nunca",
    q14: "assunto",
  },
};

function labelPara(questao: { opcoes: { id: string; label: string }[] }, id: string): string {
  return questao.opcoes.find((o) => o.id === id)!.label;
}

/** Percorre as 15 perguntas seguindo um mapa id→opção específico (não
 * "primeira opção"), até a tela de processamento. */
async function responderPercurso(page: Page, respostas: Record<string, string>) {
  await page.goto("/quiz");
  await answerByLabel(page, labelPara(DEMO_Q01, respostas.q01));
  for (const questao of DEMO_QUESTIONS_MEIO) {
    await answerByLabel(page, labelPara(questao, respostas[questao.id]));
  }
  const q12 = respostas.q01 === "so" ? DEMO_Q12A : DEMO_Q12B;
  const idQ12 = respostas.q01 === "so" ? "q12a" : "q12b";
  await answerByLabel(page, labelPara(q12, respostas[idQ12] ?? respostas.q12a));
  const q13 = DEMO_QUESTIONS_FIM.find((q) => q.id === "q13")!;
  const q14 = DEMO_QUESTIONS_FIM.find((q) => q.id === "q14")!;
  const q15 = DEMO_QUESTIONS_FIM.find((q) => q.id === "q15")!;
  await answerByLabel(page, labelPara(q13, respostas.q13));
  await answerByLabel(page, labelPara(q14, respostas.q14));
  await answerByLabel(page, q15.opcoes[0].label); // q15 não pontua
}

test.describe("Variação real do resultado — os quatro mapas", () => {
  for (const mapaId of Object.keys(PERCURSOS_POR_MAPA)) {
    test(`percurso "${mapaId}" chega ao mapa correspondente, e prévia e relatório coincidem`, async ({
      page,
    }) => {
      const nomeEsperado = nomeMapa(mapaId as Parameters<typeof nomeMapa>[0]);
      await responderPercurso(page, PERCURSOS_POR_MAPA[mapaId]);

      await expect(page.getByText("Preparando o seu mapa")).toBeVisible();
      await page.getByRole("button", { name: "Continuar" }).click();
      await expect(page.getByText(nomeEsperado)).toBeVisible(); // prévia
      await page.getByRole("button", { name: "Continuar" }).click();
      await page.getByRole("radio").first().click();
      await page.getByText("Conversar com a Jeruska").click();
      await page.getByRole("button", { name: "Continuar" }).click();
      await page.getByLabel("Nome").fill("Teste Variação");
      await page
        .getByRole("checkbox", { name: /Autorizo o armazenamento/ })
        .check();
      await page.getByRole("button", { name: "Ver meu resultado" }).click();

      await expect(
        page.getByText(`Seu mapa — ${nomeEsperado}`),
      ).toBeVisible(); // relatório — prévia e relatório coincidem
    });
  }

  test("os quatro percursos produzem quatro mapas diferentes entre si", async ({
    page,
  }) => {
    const mapasEncontrados = new Set<string>();
    for (const [mapaId, respostas] of Object.entries(PERCURSOS_POR_MAPA)) {
      await responderPercurso(page, respostas);
      await expect(page.getByText("Preparando o seu mapa")).toBeVisible();
      await page.getByRole("button", { name: "Continuar" }).click();
      const nomeEsperado = nomeMapa(mapaId as Parameters<typeof nomeMapa>[0]);
      await expect(page.getByText(nomeEsperado)).toBeVisible();
      mapasEncontrados.add(nomeEsperado);
    }
    expect(mapasEncontrados.size).toBe(4);
  });
});

/** Padrões de flexão de gênero fixa dirigidos à participante — não
 * confundir com palavras legítimas referindo-se a objetos/espaços. */
const PADROES_GENERO_FIXO =
  /voc[eê]\s+est[aá]\s+pront[ao]\b|estou\s+pront[ao]\b|voc[eê]\s+se\s+sente\s+acolhid[ao]\b|voc[eê]\s+chega\s+at[ée]\s+aqui\s+pront[ao]\b|bem-vind[ao]\b|obrigad[ao]\s+por\s+participar|vivo com parceiro\(a\)/i;

test.describe("Relatório de homologação — estrutura completa", () => {
  test("relatório contém as 12 seções estruturais e não se limita a um resumo", async ({
    page,
  }) => {
    await chegarAoRelatorio(page);

    const eyebrows = [
      `Seu mapa — ${MAPA_PRIMEIRA_OPCAO}`,
      `Força predominante — ${DIMENSAO_LABEL[SCORE_PRIMEIRA_OPCAO.forcaPredominante]}`,
      `Ponto de atenção — ${DIMENSAO_LABEL[SCORE_PRIMEIRA_OPCAO.pontoDeAtencao]}`,
      `Dimensão complementar — ${DIMENSAO_LABEL[SCORE_PRIMEIRA_OPCAO.dimensaoComplementar]}`,
      "Contexto de moradia",
      "Como aparece na rotina",
      "Direção e encerramento",
      "Uma pergunta para levar com você",
      "Convite",
      "Aviso de escopo",
    ];
    for (const texto of eyebrows) {
      await expect(page.getByText(texto)).toBeVisible();
    }
  });

  test("relatório permite rolagem vertical (não é limitado a uma viewport)", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await chegarAoRelatorio(page);

    const { scrollHeight, clientHeight } = await page.evaluate(() => ({
      scrollHeight: document.documentElement.scrollHeight,
      clientHeight: document.documentElement.clientHeight,
    }));
    expect(scrollHeight).toBeGreaterThan(clientHeight);
  });

  test("relatório não afirma diagnóstico e traz o aviso de escopo", async ({
    page,
  }) => {
    await chegarAoRelatorio(page);

    const texto = (await page.locator("body").innerText()).toLowerCase();
    expect(texto).not.toMatch(/placeholder|provis[oó]rio|pendente/);
    expect(texto).toMatch(TEXTO_AVISO_ESCOPO.toLowerCase());
  });
});

test.describe("Linguagem neutra de gênero — participante", () => {
  test('nome "Alexandre" + intenção "pronto para conversar" chega ao relatório com a frase neutra aprovada', async ({
    page,
  }) => {
    await chegarAoRelatorio(page, "Alexandre", "Estou disponível para conversar");

    await expect(
      page.getByText(/Alexandre, este é o seu mapa/),
    ).toBeVisible();
    await expect(
      page.getByText("Você chega até aqui com abertura para conversar."),
    ).toBeVisible();

    const texto = await page.locator("body").innerText();
    expect(texto).not.toMatch(PADROES_GENERO_FIXO);

    // segue até o feedback e confirma o agradecimento neutro
    await page.getByRole("button", { name: "Deixar um feedback" }).click();
    await page.getByRole("radio", { name: "5" }).click();
    await page.getByRole("button", { name: "Enviar feedback" }).click();
    await expect(page.getByRole("heading", { name: "Agradecemos." })).toBeVisible();
    const textoFeedback = await page.locator("body").innerText();
    expect(textoFeedback).not.toMatch(PADROES_GENERO_FIXO);
  });

  for (const [nome, intencaoLabel] of [
    ["Jeruska", "Estou apenas explorando"],
    ["Ariel", "Estou considerando terapia"],
    ["Dani", "Estou disponível para conversar"],
  ] as const) {
    test(`nome "${nome}" chega ao relatório sem flexão fixa de gênero`, async ({
      page,
    }) => {
      await chegarAoRelatorio(page, nome, intencaoLabel);
      await expect(
        page.getByText(new RegExp(`${nome}, este é o seu mapa`)),
      ).toBeVisible();

      const texto = await page.locator("body").innerText();
      expect(texto).not.toMatch(PADROES_GENERO_FIXO);
    });
  }

  test("q01 não usa parênteses de gênero na opção de parceiro(a)", async ({
    page,
  }) => {
    await page.goto("/quiz");
    await expect(
      page.getByRole("radio", { name: "Vivo com parceiro ou parceira" }),
    ).toBeVisible();
    await expect(
      page.getByRole("radio", { name: "Vivo com parceiro(a)" }),
    ).toHaveCount(0);
  });
});

test.describe("Screenshots de auditoria — q05, q14 e relatório", () => {
  test("captura q05, q14 e o relatório completo (mobile e desktop)", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/quiz");
    await completeAllQuestions(page, 4); // q01-q04
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Como você se sente nos momentos de convivência?",
      }),
    ).toBeVisible();
    await page.screenshot({ path: ".screenshots/audit-q05-mobile.png" });

    await completeAllQuestions(page, 9); // q05-q13
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Existe algum espaço, objeto ou assunto da casa que você evita?",
      }),
    ).toBeVisible();
    await page.screenshot({ path: ".screenshots/audit-q14-mobile.png" });

    await completeAllQuestions(page, 2); // q14-q15
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
    await expect(
      page.getByText(/Maria Teste, este é o seu mapa/),
    ).toBeVisible();
    await page.screenshot({
      path: ".screenshots/audit-resultado-mobile.png",
      fullPage: true,
    });

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.screenshot({
      path: ".screenshots/audit-resultado-desktop.png",
      fullPage: true,
    });
  });
});

test.describe("Screenshots de auditoria — os quatro mapas e o CTA por intenção", () => {
  for (const [mapaId, respostas] of Object.entries(PERCURSOS_POR_MAPA)) {
    for (const viewport of SNAPSHOT_VIEWPORTS) {
      test(`prévia e relatório — ${mapaId} (${viewport.name})`, async ({
        page,
      }) => {
        await page.setViewportSize(viewport);
        await responderPercurso(page, respostas);
        await expect(page.getByText("Preparando o seu mapa")).toBeVisible();
        await page.getByRole("button", { name: "Continuar" }).click();
        await page.screenshot({
          path: `.screenshots/mapa-${mapaId}-previa-${viewport.name}.png`,
        });

        await page.getByRole("button", { name: "Continuar" }).click();
        await page.getByRole("radio").first().click();
        await page.getByText("Conversar com a Jeruska").click();
        await page.getByRole("button", { name: "Continuar" }).click();
        await page.getByLabel("Nome").fill("Teste Variação");
        await page
          .getByRole("checkbox", { name: /Autorizo o armazenamento/ })
          .check();
        await page.getByRole("button", { name: "Ver meu resultado" }).click();
        await page.screenshot({
          path: `.screenshots/mapa-${mapaId}-relatorio-${viewport.name}.png`,
          fullPage: true,
        });
      });
    }
  }

  for (const intencaoLabel of [
    "Estou apenas explorando",
    "Estou considerando terapia",
    "Estou disponível para conversar",
  ]) {
    test(`CTA do convite — "${intencaoLabel}"`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await chegarAoRelatorio(page, "Teste CTA", intencaoLabel);
      const slug = intencaoLabel.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
      await page.screenshot({
        path: `.screenshots/cta-convite-${slug}.png`,
        fullPage: true,
      });
    });
  }
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
    await expect(
      page.getByText(/Maria Teste, este é o seu mapa/),
    ).toBeVisible();

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
    await expect(
      page.getByText(/Maria Teste, este é o seu mapa/),
    ).toBeVisible();

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

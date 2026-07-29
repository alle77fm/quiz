# DATA_MODEL — Casa com Alma

> Tabela única `quiz_response`: colunas, estrutura dos JSONs, geração de token,
> isolamento de schema e RLS.
> Este documento é especificação, não implementação.
>
> **Revisão 1:** `scoreSnapshot` passa a gravar bruto, mínimo teórico, máximo
> teórico e normalizado por dimensão (§6); `consentiu_tratamento` muda de objeto
> (§0 abaixo); retenção fechada em 90 dias (§10, novo).

## 0. Mudança de objeto do consentimento obrigatório

`consentiu_tratamento` passou a autorizar o **armazenamento** das respostas e do
resultado e a criação do acesso em `/r/[token]` — não mais "o tratamento das
respostas" de forma genérica, porque o cálculo já ocorreu antes desta coluna existir
(ver §7). Ver `PRIVACY_RULES.md` §1.1 para o texto e a justificativa completa.

---

## 1. `acolhimento` no resultado — não é uma quarta intenção

Repetindo aqui porque é o ponto mais fácil de ler errado em toda a especificação (ver
também `REPORT_COMPOSER.md` §1): a coluna `intencao_terapia` continua com exatamente
três valores possíveis (`explorando`, `considerando`, `pronto_para_conversar`).
`acolhimento` **não** é um quarto valor dessa coluna — é o nome de uma variante de
bloco dentro de `resultado.nivelApoioConvite`, selecionada pelo motor quando
`nivelApoio = 2`, independentemente do valor gravado em `intencao_terapia`. As duas
coisas são gravadas lado a lado e não se sobrescrevem.

## 2. Tabela `quiz_response`

```
quiz_response
  id                    uuid            PK, gerado pelo banco
  token                 text unique     ver §4
  quiz_versao           text            obrigatório — versão do conteúdo (config)
  nome                  text            obrigatório
  whatsapp              text null       obrigatório apenas se consentiu_contato = true
  consentiu_tratamento  boolean         obrigatório, nunca pré-marcado na origem
  consentiu_contato     boolean         obrigatório, nunca pré-marcado na origem
  consentimento_versao  text            obrigatório — versão dos textos de consentimento
  consentido_em         timestamptz     obrigatório
  respostas             jsonb           obrigatório — ver §5
  resultado             jsonb           obrigatório — ver §6
  intencao_terapia      text            obrigatório — 'explorando' | 'considerando' | 'pronto_para_conversar'
  envio_status          text            obrigatório — ver §3
  envio_erro            text null       preenchido apenas quando envio_status = 'erro'
  enviado_em            timestamptz null
  feedback_nota         int null        1 a 5, preenchido após a tela 8
  feedback_texto        text null       até 500 caracteres, opcional
  criado_em             timestamptz     obrigatório, default now()
  atualizado_em         timestamptz     obrigatório, atualizado a cada escrita
```

## 3. `envio_status`

```
'nao_autorizado' | 'pendente' | 'enviado' | 'erro'
```

- `nao_autorizado` — `consentiu_contato = false`; nenhum disparo ocorre nem ocorrerá.
- `pendente` — consentimento dado, disparo ainda não confirmado (inclui o caso de
  `after()` falhar, ver `DELIVERY_CONTRACT.md`).
- `enviado` — disparo confirmado.
- `erro` — disparo tentado e falhou; `envio_erro` preenchido; elegível para reenvio
  manual.

## 4. Geração do `token`

- Longo (mínimo 128 bits de entropia).
- Gerado por gerador criptograficamente seguro do runtime do servidor (não
  `Math.random`).
- Não sequencial — não pode ser derivado de `id`, de `criado_em` ou de qualquer campo
  incremental.
- Sem dado pessoal embutido (não deriva de nome, telefone ou qualquer resposta).
- Codificação recomendada: base64url ou equivalente, sem caracteres que exijam
  URL-encoding, para uso direto em `/r/[token]`.

## 5. Estrutura do JSON de `respostas`

```ts
{
  q01: string       // id da alternativa selecionada, ex: "q01-a2"
  q02: string
  q03: string
  q04: string
  q05: string
  q06: string
  q07: string
  q08: string
  q09: string
  q10: string
  q11: string
  q12Variante: "q12a" | "q12b"   // determinada pela resposta de q01
  q12: string                     // id da alternativa selecionada, dentro da variante acima
  q13: string
  q14: string
  q15: string
}
```

`intencao_terapia` **não** é armazenada dentro de `respostas` — é coletada depois do
cálculo (tela 3) e vive na coluna própria da tabela (§2), porque é conceitualmente
distinta das respostas ao quiz de 15 perguntas.

## 6. Estrutura do JSON de `resultado`

```ts
{
  quizVersao: string
  mapaPrincipal: string
  forcaPredominante: Dimension
  pontoDeAtencao: Dimension
  dimensaoComplementar: Dimension
  nivelApoio: 0 | 1 | 2
  convite: {
    variante: "explorando" | "considerando" | "pronto_para_conversar" | "acolhimento"
  }
  ecosSelecionados: Array<{
    posicao: 1 | 2 | 3
    alternativaId: string
  }>                              // 0 a 3 entradas
  scoreSnapshot: {
    scores: Record<Dimension, {
      bruto: number
      minimoTeorico: number
      maximoTeorico: number
      normalizado: number          // 0-100, ou 50 no caso degenerado (SCORING_MATRIX.md §6.1)
    }>
    eixoDoMapa: [Dimension, Dimension]   // Revisão 2 — par de dimensões do mapa vencedor
  }
}
```

`scoreSnapshot` foi ampliado na Revisão 1: antes gravava apenas `scores:
Record<Dimension, number>` (o bruto). Agora grava, por dimensão, os quatro valores
usados pela normalização (`SCORING_MATRIX.md` §6) — necessário porque força, ponto
de atenção, mapa principal e dimensão complementar passam a ser calculados
exclusivamente sobre `normalizado`, e reconstituir um resultado antigo exige saber
também `minimoTeorico`/`maximoTeorico` daquele momento (que dependem de qual
variante de `q12` foi respondida, ver `SCORING_MATRIX.md` §6).

**Revisão 2:** `scoreSnapshot` passa a gravar também `eixoDoMapa` — o par de
dimensões do mapa principal vencedor (`SCORING_MATRIX.md` §8.1), necessário para
reconstituir por que a dimensão complementar daquele resultado foi excluída das
candidatas (`SCORING_MATRIX.md` §10).

`nivelApoio` está sempre presente, com valor `0`, `1` ou `2` — nunca ausente, nunca
outro valor (ver `LANGUAGE_RULES.md` §4.7 para a validação estrutural correspondente).

`convite.variante = "acolhimento"` só é válido quando `nivelApoio = 2`; qualquer outra
combinação é erro de configuração, não um estado válido de dado.

## 7. Cálculo não persiste nada (adendo 5.12)

O cálculo do resultado roda no servidor no submit de `q15`, antes de qualquer
gravação. Nenhuma linha é inserida em `quiz_response` nesse momento. A única escrita
na tabela ocorre no submit da tela 6, já com `respostas`, `resultado`,
`intencao_terapia` e os dois consentimentos completos. Isso significa que não existe
estado parcial gravado no banco para uma participante que abandona o quiz antes da
tela 6 — consistente com a métrica de conclusão de `MVP_SCOPE.md` §5.

## 8. Isolamento e acesso

- A tabela vive em um schema Supabase separado de `public`, para não ser exposta pela
  Data API automática.
- RLS ligada, **sem policies** — nenhum acesso é permitido via chave anônima ou
  autenticada de cliente. Todo acesso passa pelo servidor, com a service role.
- O token protege o acesso ao relatório em `/r/[token]`: a rota busca por `token`,
  nunca por `id` sequencial, e o relatório de uma participante nunca é acessível a
  partir do de outra (ver também `PRIVACY_RULES.md`).

## 9. Índices

- Índice único em `token` (já garantido pela constraint `unique`).
- Índice em `envio_status` — usado para localizar `pendente` e `erro` no fluxo de
  reenvio manual (`DELIVERY_CONTRACT.md`).
- Índice em `criado_em` — para consultas administrativas ordenadas por data, e para
  o cálculo do prazo de retenção do §10 (localizar linhas com `criado_em` além dos
  90 dias).

## 10. Retenção — fechado em 90 dias (Revisão 1)

- `criado_em` é a referência para contar o prazo de retenção de `PRIVACY_RULES.md`
  §5: 90 dias.
- `/r/[token]` permanece estável e imutável durante todo o período — nenhuma escrita
  em `quiz_response` acontece entre o submit da tela 6 e a exclusão ao fim do prazo,
  exceto `feedback_nota`/`feedback_texto` (tela 8) e as colunas de envio
  (`envio_status`, `envio_erro`, `enviado_em`).
- Ao fim dos 90 dias, a linha é excluída fisicamente pelo mesmo fluxo de
  `PRIVACY_RULES.md` §7 (exclusão a pedido), não por um procedimento separado.
- Sujeito a revisão jurídica antes do teste controlado — este documento não decide
  base legal.

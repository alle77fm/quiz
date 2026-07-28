# LANGUAGE_RULES — Casa com Alma

> Construções permitidas e proibidas, especificação do linter de linguagem e das
> validações estruturais que rodam sobre a configuração do quiz.
> Este documento é especificação, não implementação.

---

## 1. Construções permitidas

- "suas respostas sugerem…"
- "isso pode aparecer…"
- "talvez valha observar…"
- "você marcou que…"
- "este tema pode ser aprofundado…"

## 2. Proibido

- Afirmação de origem ou causalidade.
- Interpretação de conteúdo inconsciente.
- Diagnóstico, hipótese diagnóstica ou nomeação de quadro.
- Rótulos de personalidade, de traço ou de "trava".
- Definição de propósito de vida.
- Prescrição de ações terapêuticas.
- Construções "você é…" e "isso aconteceu porque…".
- Urgência, escassez, cronômetro, "não feche esta página".
- Comparação social ou ranking.
- Exibição de pontuação interna.
- Os termos: diagnóstico, análise, nível, índice, teste psicológico, trauma,
  inconsciente, transtorno, sintoma, patologia, cura.
- Verbo de ação comercial na variante `acolhimento` da família Convite: "agende",
  "garanta", "aproveite" (lista inicial; ver §5 sobre extensão da lista).

## 3. Especificação do linter

- **Escopo:** apenas os diretórios de conteúdo apresentado à participante (blocos do
  relatório, alternativas, textos de tela). **Não inspeciona** código, testes,
  documentação interna ou o payload enviado à psicóloga (ver `DELIVERY_CONTRACT.md`) —
  o payload usa vocabulário técnico por natureza e é auditado por regras próprias.
- **Padrões causais completos**, não palavras isoladas. A palavra "porque" sozinha não
  é infração; "isso acontece porque você", "a origem disso está", "isso significa que
  você" são.
- **Construções de identidade:** "você é" seguido de adjetivo ou substantivo.
- **Termos proibidos:** lista do §2, com correspondência de palavra inteira (não
  substring — "diagnosticado" não deve disparar por conter "diagnostic", mas a forma
  completa deve ser incluída explicitamente na lista de correspondência se for
  proibida).
- **Flexões de gênero:** particípios e adjetivos femininos ou masculinos aplicados à
  participante (ex.: "você ficou cansada", "você está preparado").
- **Falha o build** quando encontra qualquer ocorrência.
- **Mecanismo de exceção:** documentado e explícito, por item, não por arquivo inteiro.
  Exemplo necessário: o aviso de não-diagnóstico (família 12) precisa conter a palavra
  "diagnóstico" para dizer que o produto não faz diagnóstico. A exceção é registrada
  como uma anotação no próprio bloco (ex.: comentário estruturado ou campo
  `linterExceptions: string[]` no objeto do bloco), nunca como desativação do linter
  para o arquivo inteiro — isso preservaria a checagem sobre todo o resto do conteúdo
  daquele arquivo.

## 4. Validações estruturais

Rodam sobre a configuração do quiz, antes de qualquer relatório existir:

### 4.1 Gerais (do prompt original)

- IDs duplicados em perguntas, alternativas ou blocos.
- Ecos incompatíveis com o cômodo que declaram (ver `QUIZ_CONTENT.md` §4 e
  `REPORT_COMPOSER.md` §7 — Eco 3 só pode vir do cômodo Contexto).
- Blocos vazios ou fora do orçamento de palavras da sua família.
- Referências contextuais proibidas dentro de blocos ("como vimos", "além disso",
  "essa mesma sensação", "por isso").
- Flexões de gênero.
- Repetição do mesmo bloco em um único relatório.
- Alternativa com `reportEcho` preenchido mas `eligibleForEcho: false`, e o inverso.
- Dimensão complementar igual a qualquer dimensão de eixo do mapa principal (ver
  `SCORING_MATRIX.md` §6.1).

### 4.2 Cardinalidade (adendo 5.8)

- Nunca mais de um bloco da mesma família em um relatório (exceto ecos, que têm
  cardinalidade própria 0–3).
- Exatamente 1 bloco de força predominante, 1 de ponto de atenção, 1 de dimensão
  complementar por relatório.
- Exatamente 1 variante da família Convite por relatório — nunca zero, nunca duas.

### 4.3 `nivelApoio` (adendo 5.10.7)

- `nivelApoio` está sempre presente no objeto `resultado`, com valor `0`, `1` ou `2`.
  Qualquer outro valor falha o build.
- `nivelApoio = 2` implica variante de convite `acolhimento`. Qualquer outra
  combinação (nível 2 com variante `explorando`, `considerando` ou
  `pronto_para_conversar`) falha o build.
- `nivelApoio ∈ {1, 2}` implica bloco de apoio presente.
- `nivelApoio = 0` implica bloco de apoio ausente.
- A variante `acolhimento` está livre de verbo de ação comercial, conforme a lista do
  §2 (extensível — ver nota abaixo).

> **Nota sobre a lista de verbos comerciais:** o adendo referencia "lista definida no
> verificador" para os verbos proibidos na variante `acolhimento`, sem fornecer a
> lista completa. Mantive aqui os três exemplos citados ("agende", "garanta",
> "aproveite") como ponto de partida e sinalizo que a lista final é
> `[PENDENTE · JERUSKA]` — ela depende do vocabulário real que a psicóloga usa nas
> quatro variantes de convite, e só pode ser fechada depois que esses blocos forem
> escritos.

## 5. Como as validações se relacionam com o linter

O linter (§3) roda sobre **texto livre** (blocos, alternativas, telas) e procura
padrões de linguagem. As validações estruturais (§4) rodam sobre a **configuração**
(objetos TypeScript: perguntas, alternativas, blocos, resultado) e procuram problemas
de forma, cardinalidade e consistência de dados. Um mesmo problema pode, em alguns
casos, ser pego pelos dois — por exemplo, uma alternativa com flexão de gênero no
`reportEcho` é pega pelo linter (é texto), enquanto uma alternativa com `reportEcho`
preenchido e `eligibleForEcho: false` é pega pela validação estrutural (é
inconsistência de dados, não de linguagem). Os dois mecanismos falham o build de forma
independente.

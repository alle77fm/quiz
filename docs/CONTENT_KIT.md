# CONTENT_KIT — Casa com Alma

> Checklist de escrita para a Jeruska: contagem, limite de palavras por item e regras
> de linguagem aplicáveis, agrupado por família. Sem nenhum texto de exemplo.
> Este documento é especificação, não implementação. É o que a psicóloga recebe para
> começar a escrever.
>
> **Revisão 1:** totais recalculados (`N_q01=4`, `N_q15=8`, ambos fechados; Tela 0
> adicionada); restrição de cobertura mínima registrada no topo (§0); ordem de fila
> de escrita registrada no topo (§0).
>
> **Revisão 2:** nenhum total mudou (68/≤56/50/23, confirmados). Cobertura mínima
> refinada por caminho `q12a`/`q12b` (ver `SCORING_MATRIX.md` §4); mapa principal
> fechado por par de dimensões (`eixoDoMapa`); reafirmado que a hipótese de 48
> `reportEcho` não é critério de aceite (§2).
>
> **Correção pós-Fase-0:** regra de contagem de textos de tela declarada
> explicitamente (§4); Tela 6 recontada — total de textos de tela sobe de 23 para
> **24**; rótulos de campo de formulário listados à parte, `[PENDENTE · ALEXANDRE]`
> (§4.1); item novo no Grupo A de §8 — ratificação do critério de seleção da
> dimensão complementar.

---

## 0. Antes de qualquer tabela — ordem da fila e restrição que a condiciona

**Item 1 da fila de escrita da psicóloga: as seis definições operacionais de
dimensão** (Grupo E, §6). Sem elas, nenhum peso pode ser atribuído a nenhuma
alternativa — a tabela de contribuição pergunta→dimensão (`SCORING_MATRIX.md` §2)
não pode ser preenchida sem saber o que cada dimensão significa operacionalmente.
Todo o restante do inventário abaixo (Grupo A em diante) fica bloqueado até essas
seis frases existirem.

**Restrição que condiciona a distribuição de pesos:** `SCORING_MATRIX.md` §4 exige
que **toda dimensão receba contribuição de no mínimo três perguntas**. Isso não é um
detalhe técnico isolado — condiciona como a Jeruska pode distribuir pesos entre as
16 perguntas: nenhuma dimensão pode ficar concentrada em uma ou duas perguntas
apenas, mesmo que pareça a escolha mais natural de conteúdo. Ler `SCORING_MATRIX.md`
§4 e §6 (normalização) antes de atribuir qualquer peso.

## 1. Como usar este checklist

Cada grupo abaixo lista **quantos itens** escrever, **quantas palavras por item** e
**quais regras de `LANGUAGE_RULES.md`** valem para aquele grupo. Nenhum item deste
documento contém texto de exemplo — apenas contagem e limite.

Regras que valem para **todo** item de todo grupo, sem exceção: segunda pessoa, sem
flexão de gênero, sem referência a texto anterior, sem os termos e construções
proibidos em `LANGUAGE_RULES.md` §2. Cada grupo abaixo lista apenas as regras
**adicionais** específicas dele.

## 2. Grupo A — Alternativas do quiz (`QUIZ_CONTENT.md`)

| Item | Quantidade (`N_q01=4`, `N_q15=8`, fechados) | Palavras por item |
|---|---|---|
| `label` de alternativa | **68** | Livre (texto de opção, curto) |
| `reportEcho` de alternativa | **≤ 56** (universo elegível: `q02`–`q14`, exclui `q01` e `q15` por regra fechada) | Sem limite fixo — reformulação natural, curta |
| `reportEcho` — hipótese de planejamento (≈15% neutras entre as elegíveis) | **48** | — |
| Pesos (`weights`) por alternativa | 68 (`q01`–`q14` contribuem; `q15` nunca tem peso) | Numérico, não é texto |

**Regras adicionais deste grupo:**
- `reportEcho` não repete o `label` literalmente.
- Todas as alternativas de `q01` e `q15`: `reportEcho` vazio (`null`) e
  `eligibleForEcho: false`, por regra estrutural — `q01` ainda recebe pesos
  normalmente (contribui para score), só não gera eco.
- Para `q01`: marcar qual alternativa caracteriza "mora sozinha" (leva a `q12a`) e
  quais caracterizam "mora acompanhada" (levam a `q12b`).
- `q12a` e `q12b` têm **enunciados próprios**, diferentes entre si (fechado na
  Revisão 1), além de alternativas e pesos próprios.
- `q15`: oito alternativas. As oito chaves de direção (`paz`, `leveza`, `uniao`,
  `seguranca`, `liberdade`, `afeto`, `presenca`, `clareza`) são **hipótese de
  trabalho** — a Jeruska pode substituir qualquer uma, desde que o total permaneça
  oito.

## 3. Grupo B — Blocos de relatório (`REPORT_COMPOSER.md`)

| Família | Itens | Palavras por item |
|---|---|---|
| 1. Abertura | 4 | 45–60 |
| 2. Mapa principal | 4 | 85–110 |
| 3. Força predominante | 6 | 65–85 |
| 4. Ponto de atenção | 6 | 65–85 |
| 5. Dimensão complementar | 6 | 55–75 |
| 6. Contexto de moradia | 4 (`N_q01`, fechado) | 38–55 |
| 7. Ecos | 0 — reaproveita `reportEcho` do Grupo A, não escrever de novo | — |
| 8. Como aparece na rotina | 6 | 55–75 |
| 9. Direção e encerramento | 8 (`N_q15`, fechado) | 55–75 |
| 10. Convite | 4 (`explorando`, `considerando`, `pronto_para_conversar`, `acolhimento`) | 45–65 |
| 11. Bloco de apoio | 1 | 35–55 |
| 12. Aviso de não-diagnóstico | 1 | 20–30 |
| **Subtotal** | **50** | — |

**Regras adicionais deste grupo:**
- Cada bloco autossuficiente — nenhuma referência a outro bloco do mesmo relatório.
- Sem numeração de questões — contextualizar sempre pelo cômodo.
- Família 10, variante `acolhimento`: sem linguagem de conversão, oferta, urgência ou
  benefício; sem verbo de ação comercial; nomear a psicóloga e informar
  disponibilidade; mesmo registro de tom do bloco de apoio.
- Família 11 (bloco de apoio): acolhimento breve e canais de apoio públicos. Nunca
  alarmista, nunca acusatório, nunca interpretativo.
- Família 12 (aviso de não-diagnóstico): único bloco autorizado a conter a palavra
  "diagnóstico", sob o mecanismo de exceção do linter.

## 4. Grupo C — Textos de tela (`FINAL_SEQUENCE.md`)

**Regra de contagem** (declarada aqui, aplicada uniformemente às nove telas em
`FINAL_SEQUENCE.md` §15): conta como texto de tela todo texto exibido à
participante que precise ser redigido, incluindo título, subtítulo, corpo, aviso,
rótulo de opção e CTA. **Não contam:** os textos dos dois consentimentos
(Grupo D, `PRIVACY_RULES.md`) e rótulos de campo de formulário (§4.1 abaixo).

| Tela | Itens |
|---|---|
| 0. Entrada da experiência | 5 |
| 1. Processamento | 1 |
| 2. Prévia do mapa | 4 |
| 3. Intenção | 4 |
| 4. Ponte para a terapia | 3 |
| 5. Mapa pronto | 2 |
| 6. Captura e consentimentos (mensagem de confiança + CTA) | **2** |
| 7. Resultado completo (reconhecimento + nota de validade do link) | 2 |
| 8. Feedback | 1 |
| **Subtotal** | **24** |

**Correção nesta revisão:** a Tela 6 estava subcontada em 1 — a versão anterior
somava só a mensagem de confiança e deixava de fora o CTA de envio, apesar de a
especificação original impor restrição explícita sobre ele ("CTA não usa a palavra
'análise'"), o que por si só já o tornava um texto redigido e contável. Subtotal
sobe de 23 para **24**. Ver `FINAL_SEQUENCE.md` §15 para a decomposição completa.

**Regras adicionais deste grupo:**
- Tela 0: sem promessa de resultado, benefício ou transformação; sem estimativa de
  duração; nota de transparência é informativa, não pode soar como consentimento.
- Tela 4: proibido vermelho contra verde, termo depreciativo, ou promessa de cura,
  solução ou resultado.
- Tela 6: CTA não usa a palavra "análise".
- Tela 7: abre com reconhecimento, não com constatação de falta; a nota de validade
  do link não descreve o armazenamento como permanente ou indefinido.

### 4.1 Rótulos de campo de formulário — listados à parte, não somados ao Grupo C

`[PENDENTE · ALEXANDRE]`, cada um — decisão de UI genérica, não conteúdo da
Jeruska:

| Tela | Campo |
|---|---|
| 6. Captura e consentimentos | Rótulo do campo "nome" |
| 6. Captura e consentimentos | Rótulo do campo "WhatsApp" |
| 8. Feedback | Rótulo do campo de nota (1–5) |
| 8. Feedback | Rótulo do campo de comentário |

Quatro rótulos, fora do total de 24.

## 5. Grupo D — Consentimentos (`PRIVACY_RULES.md`)

| Item | Itens |
|---|---|
| Consentimento obrigatório (agora: autoriza armazenamento + acesso em `/r/[token]`) | 1 |
| Consentimento opcional (contato) | 1 |
| **Subtotal** | **2** |

**Regra adicional deste grupo:** cada texto precisa de uma versão registrada
(`consentimento_versao`). O texto do consentimento obrigatório não pode afirmar que
autoriza um processamento que já ocorreu — ver `PRIVACY_RULES.md` §1.1.

## 6. Grupo E — Definições operacionais de dimensão (`SCORING_MATRIX.md`)

| Item | Itens |
|---|---|
| Definição de dimensão (uma frase cada) | 6 |
| **Subtotal** | **6** |

**Regra adicional deste grupo:** descritiva e operacional, não clínica. **Item 1 da
fila de escrita** — ver §0.

## 7. Total consolidado

### 7.1 As quatro categorias centrais (labels, reportEcho, blocos, telas)

| Categoria | Total |
|---|---|
| `label` de alternativa | 68 |
| `reportEcho` | ≤ 56 (hipótese de planejamento: 48) |
| Blocos de relatório | 50 |
| Textos de tela | **24** (corrigido de 23 — Tela 6 subcontada, ver §4) |
| **Total (limite superior)** | **≤ 198** |
| **Total (hipótese de planejamento, com reportEcho=48)** | **190** |

### 7.2 Total geral do que a psicóloga precisa escrever (todos os grupos)

| Grupo | Total |
|---|---|
| A — Alternativas (label + reportEcho) | 68 + ≤56 |
| B — Blocos de relatório | 50 |
| C — Textos de tela | 24 |
| D — Consentimentos | 2 |
| E — Definições de dimensão | 6 |
| **Total geral (limite superior)** | **≤ 206** |
| **Total geral (hipótese de planejamento)** | **198** |

Não incluído em nenhum total acima: os quatro rótulos de campo de formulário
(§4.1), que são `[PENDENTE · ALEXANDRE]`, não conteúdo da Jeruska.

## 8. Classificação das pendências por fase

> **Atenção de nomenclatura:** os "Grupo A"–"Grupo E" das seções 2 a 6 acima
> agrupam **categorias de conteúdo** (alternativas, blocos, telas, consentimentos,
> definições). Os "Grupo A"–"Grupo D" **desta** seção agrupam as mesmas pendências
> por **quando precisam ser resolvidas**. São dois eixos de classificação
> diferentes sobre o mesmo conjunto de itens — não confundir um com o outro.

A convenção de marcador inline não muda: existem exatamente dois marcadores em
todo o projeto, `[PENDENTE · JERUSKA]` e `[PENDENTE · ALEXANDRE]`. A classificação
por fase vive nesta tabela, não em um terceiro marcador.

### Grupo A — bloqueiam a Fase 2 (motor determinístico)

Responsável: Jeruska, em todos os itens.

- Definições operacionais das seis dimensões (`SCORING_MATRIX.md` §1.1) — **item 1
  da fila**, ver §0 acima: sem elas nenhum peso pode ser atribuído, e todo o
  restante deste grupo fica bloqueado atrás dele.
- Pesos concretos das alternativas (`SCORING_MATRIX.md` §3).
- Tabela pergunta → dimensão (`SCORING_MATRIX.md` §2).
- Tabela mapa → par de dimensões, `eixoDoMapa` (`SCORING_MATRIX.md` §8.1).
- Limiar exato do nível 1 de apoio (`REPORT_COMPOSER.md` §6.1).
- Combinações nomeadas do nível 2 de apoio (`REPORT_COMPOSER.md` §6.1).
- Pesos de `q12a` e `q12b` (parte da tabela pergunta → dimensão).
- Ratificação da orientação positiva das seis dimensões, dimensão por dimensão
  (`SCORING_MATRIX.md` §7) — o mecanismo já está fechado; falta a Jeruska
  confirmar que cada definição que ela escrever respeita essa orientação.
- **Ratificação do critério de seleção da dimensão complementar** (`SCORING_MATRIX.md`
  §10.2, item novo desta correção) — duas opções documentadas (maior necessidade,
  vigente, ou maior score normalizado); a regra vigente já pode ser usada para
  implementar o motor da Fase 2, e trocar de opção depois é alteração de uma única
  função de seleção, sem impacto em inventário, orçamento de palavras ou número de
  blocos.

### Grupo B — bloqueiam a Fase 3 e a homologação funcional

Responsável: Jeruska, em todos os itens.

- Enunciados finais de `q12a` e `q12b` (`QUIZ_CONTENT.md` §2).
- Labels finais das alternativas de `q01` (`QUIZ_CONTENT.md` §6).
- Alternativas finais de `q12a` e `q12b`.
- Conteúdo definitivo das oito posições de `q15` (`QUIZ_CONTENT.md` §7).
- Textos finais dos dois consentimentos (`PRIVACY_RULES.md` §1).
- Blocos finais do relatório — todas as famílias de `REPORT_COMPOSER.md` §4.
- `reportEcho` finais (`QUIZ_CONTENT.md`).
- Textos das telas, incluindo os cinco da Tela 0 (`FINAL_SEQUENCE.md`).
- Texto final do bloco de apoio (família 11).
- Variante `acolhimento` da família Convite (família 10).

### Grupo C — refinamento em homologação

**Não usa marcador de pendência.** Lista completa em `MVP_SCOPE.md`, seção
"Refinamento em homologação": imagem da Tela 0, duração percebida da animação,
ritmo entre telas, tipografia, espaçamentos, responsividade, extensão percebida do
relatório, nomenclatura dos botões, tom da ponte para a terapia, CTA final, ordem
visual dos blocos, sensação de repetição, percepção de valor da experiência.
Nenhum item deste grupo bloqueia a Fase 1.

**Exceção:** contraste não entra neste grupo — é requisito WCAG AA de aceite, não
refinamento (`FINAL_SEQUENCE.md` §2.9).

### Grupo D — decisões fechadas

Não reapresentar como pendência: stack (Next.js/Tailwind/Supabase/Vercel/TS
estrito), cardinalidades (`q01=4`, `q15=8`, `q12a`/`q12b` separados), mecanismo do
mapa (par de dimensões, `eixoDoMapa`), normalização 0–100, cobertura mínima (três
perguntas por caminho, diferença máxima dois), retenção (90 dias), reenvio por
script (`retry-delivery`), estrutura da Tela 0, ausência de coleta de gênero,
ausência de PDF/LLM/n8n/painel administrativo, cardinalidade exata de 2 por par de
eixo (`SCORING_MATRIX.md` §8.1), inventários consolidados (68 labels, ≤56
`reportEcho`, 50 blocos, **24** textos de tela, cenários 528/793/848/848).

## 9. Conferência cruzada com `QUIZ_CONTENT.md` e `REPORT_COMPOSER.md`

- `QUIZ_CONTENT.md` §5: total de `label` = 68, total de `reportEcho` ≤ 56 (hipótese
  48). Idêntico ao Grupo A acima.
- `REPORT_COMPOSER.md` §11: total de blocos de relatório = 50. Idêntico ao Grupo B
  acima.
- `FINAL_SEQUENCE.md` §15: total de textos de tela = **24** (corrigido de 23 nesta
  revisão — Tela 6 subcontada). Idêntico ao Grupo C acima.
- Se o número de chaves de `q15` mudar (hoje 8, fechado — só o conteúdo das oito
  palavras é hipótese), os quatro documentos (`QUIZ_CONTENT.md`, `REPORT_COMPOSER.md`,
  `FINAL_SEQUENCE.md` não é afetado, este) precisam ser recalculados em conjunto.

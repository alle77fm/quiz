# CONTENT_KIT — Casa com Alma

> Checklist de escrita para a Jeruska: contagem, limite de palavras por item e regras
> de linguagem aplicáveis, agrupado por família. Sem nenhum texto de exemplo.
> Este documento é especificação, não implementação. É o que a psicóloga recebe para
> começar a escrever.

---

## 1. Como usar este checklist

Cada grupo abaixo lista **quantos itens** escrever, **quantas palavras por item** e
**quais regras de `LANGUAGE_RULES.md`** valem para aquele grupo. Nenhum item deste
documento contém texto de exemplo — apenas contagem e limite.

Regras que valem para **todo** item de todo grupo, sem exceção: segunda pessoa, sem
flexão de gênero, sem referência a texto anterior, sem os termos e construções
proibidos em `LANGUAGE_RULES.md` §2. Cada grupo abaixo lista apenas as regras
**adicionais** específicas dele.

## 2. Grupo A — Alternativas do quiz (`QUIZ_CONTENT.md`)

| Item | Quantidade (hipótese `N_q01=N_q15=4`) | Palavras por item |
|---|---|---|
| `label` de alternativa | 64 | Livre (texto de opção, curto) |
| `reportEcho` de alternativa | ≤ 64 (64 menos as alternativas marcadas como neutras) | Sem limite fixo — reformulação natural, curta |
| Pesos (`weights`) por alternativa | 64 (todas, exceto neutras têm ao menos uma dimensão) | Numérico, não é texto |

**Regras adicionais deste grupo:**
- `reportEcho` não repete o `label` literalmente.
- Alternativas neutras: `reportEcho` vazio (`null`) e sem peso.
- Decidir, por alternativa, se ela é elegível para eco (`eligibleForEcho`).
- Para `q01`: marcar quais alternativas caracterizam "mora sozinha" e quais
  caracterizam "mora acompanhada" (tabela de `QUIZ_CONTENT.md` §6).

## 3. Grupo B — Blocos de relatório (`REPORT_COMPOSER.md`)

| Família | Itens (hipótese) | Palavras por item |
|---|---|---|
| 1. Abertura | 4 | 45–60 |
| 2. Mapa principal | 4 | 85–110 |
| 3. Força predominante | 6 | 65–85 |
| 4. Ponto de atenção | 6 | 65–85 |
| 5. Dimensão complementar | 6 | 55–75 |
| 6. Contexto de moradia | `N_q01` (4) | 38–55 |
| 7. Ecos | 0 — reaproveita `reportEcho` do Grupo A, não escrever de novo | — |
| 8. Como aparece na rotina | 6 | 55–75 |
| 9. Direção e encerramento | `N_q15` (4) | 55–75 |
| 10. Convite | 4 (`explorando`, `considerando`, `pronto_para_conversar`, `acolhimento`) | 45–65 |
| 11. Bloco de apoio | 1 | 35–55 |
| 12. Aviso de não-diagnóstico | 1 | 20–30 |
| **Subtotal** | **46** | — |

**Regras adicionais deste grupo:**
- Cada bloco autossuficiente — nenhuma referência a outro bloco do mesmo relatório.
- Sem numeração de questões — contextualizar sempre pelo cômodo.
- Família 10, variante `acolhimento`: sem linguagem de conversão, oferta, urgência ou
  benefício; sem verbo de ação comercial; nomear a psicóloga e informar
  disponibilidade; mesmo registro de tom do bloco de apoio.
- Família 11 (bloco de apoio): acolhimento breve e canais de apoio públicos. Nunca
  alarmista, nunca acusatório, nunca interpretativo.
- Família 12 (aviso de não-diagnóstico): é o único bloco autorizado a conter a palavra
  "diagnóstico", sob o mecanismo de exceção do linter (`LANGUAGE_RULES.md` §3).

## 4. Grupo C — Textos de tela (`FINAL_SEQUENCE.md`)

| Tela | Itens |
|---|---|
| 1. Processamento | 1 |
| 2. Prévia do mapa | 4 |
| 3. Intenção | 4 |
| 4. Ponte para a terapia | 3 |
| 5. Mapa pronto | 2 |
| 6. Captura e consentimentos (mensagem de confiança) | 1 |
| 7. Resultado completo | 1 |
| 8. Feedback | 1 |
| **Subtotal** | **17** |

**Regras adicionais deste grupo:**
- Tela 4: proibido vermelho contra verde, termo depreciativo, ou promessa de cura,
  solução ou resultado; a coluna "refletir no seu tempo" descreve um caminho legítimo,
  não um déficit.
- Tela 6: CTA não usa a palavra "análise".
- Tela 7: abre com reconhecimento, não com constatação de falta.

## 5. Grupo D — Consentimentos (`PRIVACY_RULES.md`)

| Item | Itens |
|---|---|
| Consentimento obrigatório (tratamento) | 1 |
| Consentimento opcional (contato) | 1 |
| **Subtotal** | **2** |

**Regra adicional deste grupo:** cada texto precisa de uma versão registrada
(`consentimento_versao`); qualquer edição futura incrementa a versão, não substitui o
texto anterior nas respostas já gravadas.

## 6. Grupo E — Definições operacionais de dimensão (`SCORING_MATRIX.md`)

| Item | Itens |
|---|---|
| Definição de dimensão (uma frase cada) | 6 |
| **Subtotal** | **6** |

**Regra adicional deste grupo:** descritiva e operacional, não clínica — define o que
a dimensão mede como eixo do instrumento, não uma interpretação sobre uma pessoa.

## 7. Total consolidado

### 7.1 As quatro categorias centrais (labels, reportEcho, blocos, telas)

| Categoria | Total |
|---|---|
| `label` de alternativa | 64 |
| `reportEcho` | ≤ 64 |
| Blocos de relatório | 46 |
| Textos de tela | 17 |
| **Total (limite superior)** | **≤ 191** |

Este é o total pedido literalmente pela especificação de execução ("total de label,
total de reportEcho, total de blocos de relatório, total de textos de tela"). É um
limite superior, não um número fechado, porque `reportEcho` depende de quantas
alternativas a Jeruska marcar como neutras — ela pode ser menor que 64.

### 7.2 Total geral do que a psicóloga precisa escrever (todos os grupos)

| Grupo | Total |
|---|---|
| A — Alternativas (label + reportEcho) | 64 + ≤64 |
| B — Blocos de relatório | 46 |
| C — Textos de tela | 17 |
| D — Consentimentos | 2 |
| E — Definições de dimensão | 6 |
| **Total geral (limite superior)** | **≤ 199** |

## 8. Conferência cruzada com `QUIZ_CONTENT.md` e `REPORT_COMPOSER.md`

- `QUIZ_CONTENT.md` §5: total de `label` = 64, total de `reportEcho` ≤ 64. Idêntico ao
  Grupo A acima.
- `REPORT_COMPOSER.md` §11: total de blocos de relatório = 46. Idêntico ao Grupo B
  acima (subtotal 46).
- Se `N_q01` ou `N_q15` forem confirmados com valor diferente de 4, os três documentos
  (`QUIZ_CONTENT.md`, `REPORT_COMPOSER.md`, este) precisam ser recalculados juntos —
  nenhum dos três pode ser atualizado isoladamente sem quebrar esta conferência.

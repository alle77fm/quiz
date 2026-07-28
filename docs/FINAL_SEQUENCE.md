# FINAL_SEQUENCE — Casa com Alma

> As oito telas após a última pergunta: objetivo, conteúdo, comportamento e proibições
> de cada uma.
> Este documento é especificação, não implementação.

---

## 1. Onde o cálculo acontece (adendo 5.12)

O cálculo do resultado roda **no servidor**, em route handler. O `POST` acontece ao
submeter `q15` — a última pergunta do quiz, antes da tela 1. A animação da tela 1 só
começa depois de o resultado chegar do servidor. Isso satisfaz "sem chamada externa
durante a animação". A configuração do quiz (pesos, `reportEcho`, blocos) nunca é
importada por componente cliente; o cliente só recebe o objeto de resultado já
montado.

O cálculo, neste momento, **não persiste nada**. A gravação em `quiz_response` só
ocorre no submit da tela 6 (ver `DATA_MODEL.md`).

## 2. Tabela geral

| Tela | Nome | Natureza |
|---|---|---|
| 1 | Processamento | Animada, 3–5s |
| 2 | Prévia do mapa | Estática |
| 3 | Intenção | Interativa |
| 4 | Ponte para a terapia | Estática |
| 5 | Mapa pronto | Estática, transição |
| 6 | Captura e consentimentos | Formulário |
| 7 | Resultado completo | `/r/[token]` |
| 8 | Feedback | Interativa |

As telas 2, 3, 4 e 5 **não conhecem o nome da participante** — ele só é coletado na
tela 6. A barra de progresso continua avançando até a tela 6.

## 3. Tela 1 — Processamento

- **Objetivo:** transição visual enquanto o resultado (já calculado, ver §1) é
  preparado para exibição.
- **Conteúdo:** `[PENDENTE · JERUSKA]` — 1 texto (mensagem de espera/processamento),
  genérico, não específico por mapa.
- **Comportamento:** única animação do fluxo (ver §9 sobre a proibição da segunda
  animação). Duração de 3 a 5 segundos. Respeita `prefers-reduced-motion` — quando
  ativo, substitui a animação por uma transição estática equivalente, sem encurtar o
  tempo mínimo de forma abrupta.
- **Proibido:** qualquer chamada externa durante a animação (o resultado já chegou
  antes de a tela começar); qualquer conteúdo específico de mapa, força, atenção ou
  dimensão complementar.

## 4. Tela 2 — Prévia do mapa

- **Objetivo:** revelar o nome do mapa e uma frase curta, sem antecipar o restante do
  relatório.
- **Conteúdo:** nome do mapa (vem da configuração de mapas, não é um novo texto) + uma
  frase por mapa. `[PENDENTE · JERUSKA]` — 4 variantes (uma por mapa).
- **Comportamento:** estática.
- **Proibido:** antecipar forças, pontos de atenção, dimensão complementar ou qualquer
  reflexão aprofundada.

> **Decisão própria, sinalizada:** a especificação original lista, na seção 4 de
> proibições, "as descrições dos quatro mapas" como conteúdo que não devo escrever,
> mas não diz explicitamente em qual tela ou família essas descrições aparecem. Tratei
> a "frase" desta tela como sendo exatamente essa descrição de mapa (4 variantes, uma
> por mapa) — é o único lugar da especificação que pede um texto curto e específico de
> mapa, fora dos blocos já cobertos por `REPORT_COMPOSER.md`. Registrei aqui para que
> não seja contado duas vezes no inventário consolidado.

## 5. Tela 3 — Intenção

- **Objetivo:** coletar `intencao_terapia`.
- **Conteúdo:** `[PENDENTE · JERUSKA]` — 1 texto de pergunta + 3 labels de opção (uma
  por intenção: `explorando`, `considerando`, `pronto_para_conversar`). Total: 4
  textos.
- **Comportamento:** interativa, grava `intencao_terapia` na resposta em memória
  (persistência só na tela 6, ver `DATA_MODEL.md`).
- **Proibido:** nenhuma alternativa extrema ou de compromisso heroico (ex.: "quero
  resolver tudo agora").

## 6. Tela 4 — Ponte para a terapia

- **Objetivo:** apresentar dois caminhos igualmente legítimos.
- **Conteúdo:** `[PENDENTE · JERUSKA]` — 1 texto de cabeçalho + 2 textos de coluna
  ("refletir no seu tempo" e a coluna de conversar com a psicóloga). Total: 3 textos.
- **Comportamento:** estática, duas colunas.
- **Proibido:** a coluna "refletir no seu tempo" descrever um caminho como déficit —
  tem de ser um caminho legítimo. Proibido vermelho contra verde. Proibido termo
  depreciativo. Proibido prometer cura, solução ou resultado.

## 7. Tela 5 — Mapa pronto

- **Objetivo:** transição curta antes da captura, substituindo a segunda animação do
  modelo de referência.
- **Conteúdo:** `[PENDENTE · JERUSKA]` — 1 texto + 1 label de botão. Total: 2 textos.
- **Comportamento:** estática, curta, com botão.
- **Proibido:** qualquer segunda animação (ver §9).

## 8. Tela 6 — Captura e consentimentos

- **Objetivo:** coletar nome, WhatsApp (opcional) e os dois consentimentos.
- **Conteúdo:** nome obrigatório; WhatsApp obrigatório **apenas** se a participante
  autorizar o contato. Dois consentimentos separados, **nenhum pré-marcado** — os
  textos dos dois consentimentos são inventariados em `PRIVACY_RULES.md`, não aqui,
  para não duplicar a contagem. Além dos consentimentos: `[PENDENTE · JERUSKA]` — 1
  texto de mensagem de confiança (os dados só vão para a psicóloga mediante
  autorização). Total nesta tela, fora os consentimentos: 1 texto.
- **Comportamento:** formulário. Navegação para trás disponível **até** o submit (ver
  adendo 5.14). Após o submit, o fluxo é somente leitura.
- **Proibido:** qualquer consentimento pré-marcado. CTA não usa a palavra "análise".

## 9. Tela 7 — Resultado completo (`/r/[token]`)

- **Objetivo:** apresentar o relatório completo.
- **Conteúdo:** abre com o nome da participante e um reconhecimento — não uma
  constatação de falta. `[PENDENTE · JERUSKA]` — 1 texto de reconhecimento/abertura de
  tela (distinto do bloco "Abertura" da família 1 do `REPORT_COMPOSER.md`, que é
  específico por mapa; este é o texto de saudação da tela em si).

> **Decisão própria, sinalizada:** optei por tratar o "reconhecimento" da tela 7 como
> um único texto genérico (não uma variante por mapa), por ser um cumprimento de
> abertura de tela, distinto do bloco de abertura do relatório (que já existe na
> família 1 e é específico por mapa). Se a Jeruska preferir que este reconhecimento
> também varie por mapa, o inventário sobe em 3 (de 1 para 4 textos nesta linha).

- **Comportamento:** o resultado é imutável; nenhuma navegação para trás a partir
  desta tela.
- **Proibido:** tudo o que já é proibido nos blocos do relatório (ver
  `LANGUAGE_RULES.md`).

## 10. Tela 8 — Feedback

- **Objetivo:** coletar nota de 1 a 5 e comentário opcional.
- **Conteúdo:** `[PENDENTE · JERUSKA]` — 1 texto de pergunta de feedback. Total: 1
  texto.
- **Comportamento:** interativa. Comentário opcional de até 500 caracteres. O feedback
  **nunca** altera o resultado já calculado e gravado.
- **Proibido:** qualquer alteração retroativa do resultado a partir do feedback.

## 11. Navegação para trás (adendo 5.14)

- Telas do quiz (`q01`–`q15`) e telas 1 a 5: navegação livre para trás.
- Voltar ao quiz após a tela 1 invalida o resultado calculado e força novo cálculo ao
  reavançar. O determinismo garante o mesmo resultado se nenhuma resposta mudar (ver
  `SCORING_MATRIX.md` §11).
- Tela 6: navegação para trás disponível **até** o submit.
- Após o submit da tela 6, o fluxo é somente leitura. Telas 7 e 8 não oferecem voltar.
  O resultado em `/r/[token]` é imutável. Isso preserva a idempotência do envio (ver
  `DELIVERY_CONTRACT.md`): um resultado, no máximo um disparo.

## 12. Proibição da segunda animação

Tela 1 é a única animação do fluxo. Tela 5 substitui o que, em um modelo de
referência anterior, seria uma segunda animação — ela é estática, curta, com botão.
Nenhuma outra tela pode introduzir uma animação de carregamento ou processamento.

## 13. Inventário de textos de tela desta especificação

| Tela | Textos a escrever |
|---|---|
| 1. Processamento | 1 |
| 2. Prévia do mapa | 4 (uma por mapa — ver §4) |
| 3. Intenção | 4 (1 pergunta + 3 labels) |
| 4. Ponte para a terapia | 3 (1 cabeçalho + 2 colunas) |
| 5. Mapa pronto | 2 (1 texto + 1 label de botão) |
| 6. Captura e consentimentos | 1 (mensagem de confiança; consentimentos contados em `PRIVACY_RULES.md`) |
| 7. Resultado completo | 1 (reconhecimento, genérico — ver nota da §9) |
| 8. Feedback | 1 |
| **Total** | **17** |

Este total não inclui os dois textos de consentimento (`PRIVACY_RULES.md`) nem os
blocos do relatório (`REPORT_COMPOSER.md`), para evitar dupla contagem. Ver
`CONTENT_KIT.md` para o consolidado final.

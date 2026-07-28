# QUIZ_CONTENT — Casa com Alma

> Estrutura das 15 perguntas (16 entradas, com `q12a`/`q12b`). Este documento define
> formato e inventário, não o conteúdo das alternativas.
> Este documento é especificação, não implementação.

---

## 1. Convenção de leitura

Este documento **não contém** nenhuma alternativa, peso ou `reportEcho`. Onde a
especificação original já aprovou um texto (o enunciado da pergunta), ele é
transcrito literalmente. Todo o resto é `[PENDENTE · JERUSKA]`.

## 2. Tabela de perguntas

| id | Cômodo | Texto da pergunta (aprovado) | Nº de alternativas | Elegível para eco |
|---|---|---|---|---|
| `q01` | Contexto | Com quem você mora atualmente? | `N_q01` — ver §5, hipótese 4 | Sim — fonte de Eco 3 (contexto) |
| `q02` | Contexto | Ao chegar em casa, qual sensação aparece primeiro? | 4 | Sim — fonte de Eco 3 (contexto) |
| `q03` | Porta de entrada | Você consegue deixar as preocupações do lado de fora? | 4 | Sim — fonte de Eco 1/Eco 2 |
| `q04` | Porta de entrada | Sente que seu espaço e seus limites são respeitados? | 4 | Sim — fonte de Eco 1/Eco 2 |
| `q05` | Sala | Como você se sente nos momentos de convivência? | 4 | Sim — fonte de Eco 1/Eco 2 |
| `q06` | Sala | Quando algo incomoda, como as pessoas costumam lidar? | 4 | Sim — fonte de Eco 1/Eco 2 |
| `q07` | Sala | Você sente que pode falar e ser realmente ouvido? | 4 | Sim — fonte de Eco 1/Eco 2 |
| `q08` | Cozinha | As responsabilidades da casa são divididas de forma equilibrada? | 4 | Sim — fonte de Eco 1/Eco 2 |
| `q09` | Cozinha | O que mais parece estar faltando na rotina da casa? | 4 | Sim — fonte de Eco 1/Eco 2 |
| `q10` | Quarto | Seu quarto permite que você realmente descanse? | 4 | Sim — fonte de Eco 1/Eco 2 |
| `q11` | Quarto | Você consegue parar sem sentir culpa? | 4 | Sim — fonte de Eco 1/Eco 2 |
| `q12a` | Quarto | Como percebe a proximidade emocional em sua vida? — variante "mora sozinha" (ver nota abaixo) | 4 | Sim — fonte de Eco 1/Eco 2 |
| `q12b` | Quarto | Como percebe a proximidade emocional em sua vida? — variante "mora acompanhada" (ver nota abaixo) | 4 | Sim — fonte de Eco 1/Eco 2 |
| `q13` | Espaço pessoal | Você encontra tempo e espaço para cuidar de si? | 4 | Sim — fonte de Eco 1/Eco 2 |
| `q14` | Espaço pessoal | Existe algum espaço, objeto ou assunto da casa que você evita? | 4 | Sim — fonte de Eco 1/Eco 2 |
| `q15` | Janela | O que você gostaria de sentir mais dentro de sua casa e dentro de você? | `N_q15` — ver §5, hipótese 4 | **Não** — não pontua; alimenta a família 9 (direção e encerramento) |

> **Nota sobre `q12a`/`q12b`:** a especificação aprovada fornece um único enunciado para
> a pergunta 12 e determina que as duas variantes têm "alternativas e pesos próprios".
> Não está definido se o **texto do enunciado** também varia entre `q12a` e `q12b`, ou
> se apenas alternativas e pesos diferem com o mesmo enunciado.
> `[PENDENTE · ALEXANDRE / JERUSKA]` — confirmar antes da Fase 1. Nenhum novo enunciado
> foi inventado aqui: o texto acima é o único aprovado, repetido para as duas variantes
> como ponto de partida.

## 3. Formato do objeto de alternativa (Fase 1)

```ts
{
  id: string                  // ex: "q05-a3", único em todo o quiz
  label: string                // texto exibido no quiz
  reportEcho: string | null    // devolução em linguagem natural, ou null se neutra
  weights: Partial<Record<Dimension, number>>
  eligibleForEcho: boolean
}
```

Convenção de `id`: `{idDaPergunta}-a{N}`, `N` de 1 em diante na ordem de exibição.
Exemplo para `q12a`: `q12a-a1`, `q12a-a2`, `q12a-a3`, `q12a-a4`.

## 4. Regras

- `reportEcho` é escrito em segunda pessoa, sem flexão de gênero, e **não repete** o
  texto do `label` literalmente — é uma reformulação natural.
- Alternativas neutras têm `reportEcho: null` **e** `eligibleForEcho: false`. As duas
  condições andam juntas; uma sem a outra é erro de configuração (ver
  `LANGUAGE_RULES.md`, validações estruturais).
- Todo `id` de alternativa é único em todo o quiz — não só dentro da própria pergunta.
- Nenhuma alternativa pode ter `weights` vazio, exceto as neutras.
- A resposta de `q01` determina qual variante de `q12` é exibida (`q12a` ou `q12b`).
  A tabela alternativa-de-`q01` → variante-de-`q12` é o placeholder da seção 5.11 do
  adendo v1.1, reproduzida abaixo (§6).
- `q15` não contribui para nenhuma dimensão de pontuação; alimenta exclusivamente a
  família 9 (`Direção e encerramento`) do `REPORT_COMPOSER.md`.
- Eco 1 e Eco 2 só podem vir de alternativas de `q03`–`q14` (inclui `q12a`/`q12b`).
  Eco 3 só pode vir de alternativas de `q01`/`q02` (cômodo Contexto). Esta segmentação
  é convenção estrutural definida aqui para tornar a seleção de ecos verificável; ver
  `REPORT_COMPOSER.md` para a regra completa de seleção.

## 5. Inventário paramétrico

Fórmula:

```
total_perguntas    = 16   (14 fixas + q01 + q15)
total_alternativas = 14 × 4 + N_q01 + N_q15
                   = 56 + N_q01 + N_q15
total_labels       = total_alternativas
total_reportEcho   = total_alternativas − total_neutras
```

`total_neutras` é decisão de conteúdo da Jeruska (quantas alternativas, por pergunta,
são neutras) e não pode ser antecipado aqui. `total_reportEcho` é portanto um **limite
superior**, não um valor fechado.

### Tabela preenchida — hipótese de trabalho `N_q01 = 4`, `N_q15 = 4`

| Item | Valor |
|---|---|
| Total de perguntas | 16 |
| Total de alternativas (`total_labels`) | 56 + 4 + 4 = **64** |
| Total de `reportEcho` (limite superior) | **≤ 64** (64 − nº de alternativas neutras, a definir) |

`[PENDENTE · ALEXANDRE]` — confirmar `N_q01` e `N_q15`. Se qualquer um dos dois mudar,
recalcule esta tabela, a tabela de `REPORT_COMPOSER.md` (família 6 e família 9) e o
total consolidado de `CONTENT_KIT.md`.

## 6. Tabela alternativa de `q01` → variante de `q12` (placeholder)

| Alternativa de `q01` (`id`) | Caracteriza | Variante de `q12` exibida |
|---|---|---|
| `[PENDENTE · JERUSKA]` | mora sozinha | `q12a` |
| `[PENDENTE · JERUSKA]` | mora acompanhada | `q12b` |
| `[PENDENTE · JERUSKA]` | mora acompanhada | `q12b` |
| `[PENDENTE · JERUSKA]` | *(demais alternativas de `q01`, se houver mais de duas)* | `[PENDENTE · JERUSKA]` |

`q01` deve conter pelo menos uma alternativa de cada categoria (sozinha / acompanhada)
para que a bifurcação nunca fique indefinida. Nenhuma alternativa de `q01` pode ficar
sem mapeamento para uma das duas variantes de `q12`.

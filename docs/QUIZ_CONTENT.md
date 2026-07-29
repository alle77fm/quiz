# QUIZ_CONTENT — Casa com Alma

> Estrutura das 15 perguntas (16 entradas, com `q12a`/`q12b`). Este documento define
> formato e inventário, não o conteúdo das alternativas.
> Este documento é especificação, não implementação.
>
> **Revisão 1:** `N_q01 = 4` e `N_q15 = 8` fechados (não são mais hipótese
> paramétrica); `q12a`/`q12b` confirmadas com enunciados diferentes; elegibilidade de
> eco de `q01` e `q15` fechada como **não elegível**; inventário recalculado.
>
> **Revisão 2:** `q01` fechada estruturalmente em 1 alternativa "mora só" + 3
> "mora acompanhado" (não mais "ao menos uma de cada"); `q15` usa convenção de id
> própria `q15-k1`…`q15-k8`; hipótese de `reportEcho` (48) reafirmada como não
> sendo critério de aceite. Totais inalterados: 68 labels, ≤56 reportEcho.

---

## 1. Convenção de leitura

Este documento **não contém** nenhuma alternativa, peso ou `reportEcho`. Onde a
especificação original já aprovou um texto (o enunciado da pergunta), ele é
transcrito literalmente. Todo o resto é `[PENDENTE · JERUSKA]`.

## 2. Tabela de perguntas

| id | Cômodo | Texto da pergunta | Nº de alternativas | Elegível para eco |
|---|---|---|---|---|
| `q01` | Contexto | Com quem você mora atualmente? | **4** (fechado) | **Não** (fechado, Revisão 1) — alimenta apenas a família 6 (Contexto de moradia) |
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
| `q12a` | Quarto | `[PENDENTE · JERUSKA]` — enunciado próprio, variante "mora sozinha" | 4 | Sim — fonte de Eco 1/Eco 2 |
| `q12b` | Quarto | `[PENDENTE · JERUSKA]` — enunciado próprio, variante "mora acompanhada" | 4 | Sim — fonte de Eco 1/Eco 2 |
| `q13` | Espaço pessoal | Você encontra tempo e espaço para cuidar de si? | 4 | Sim — fonte de Eco 1/Eco 2 |
| `q14` | Espaço pessoal | Existe algum espaço, objeto ou assunto da casa que você evita? | 4 | Sim — fonte de Eco 1/Eco 2 |
| `q15` | Janela | O que você gostaria de sentir mais dentro de sua casa e dentro de você? | **8** (fechado) | **Não** (fechado) — não pontua; alimenta a família 9 (direção e encerramento) |

**Fechado nesta revisão:** `q12a` e `q12b` têm enunciados diferentes entre si (não
apenas alternativas e pesos diferentes, como a Fase 0 original deixava em aberto),
além de alternativas e pesos próprios. Quatro alternativas cada. Todos os textos
(enunciado e alternativas das duas variantes) são `[PENDENTE · JERUSKA]`.

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

**Exceção fechada nesta revisão — `q15`:** as oito posições estruturais de `q15`
usam a convenção própria `q15-k1` … `q15-k8` (não `q15-a1`…`q15-a8`), para marcar
que são posições estruturais fixas, distintas do conteúdo hipotético que cada uma
carrega (ver §7). O `k` não substitui a regra geral de unicidade — `q15-k1`…`q15-k8`
continuam únicos em todo o quiz, como qualquer outro `id`.

## 4. Regras

- `reportEcho` é escrito em segunda pessoa, sem flexão de gênero, e **não repete** o
  texto do `label` literalmente — é uma reformulação natural.
- Alternativas neutras têm `reportEcho: null` **e** `eligibleForEcho: false`. As duas
  condições andam juntas; uma sem a outra é erro de configuração (ver
  `LANGUAGE_RULES.md`, validações estruturais).
- Todo `id` de alternativa é único em todo o quiz — não só dentro da própria pergunta.
- Nenhuma alternativa pode ter `weights` vazio, exceto as neutras. `q01` e `q15` são
  exceção a esta exceção: **todas** as alternativas de `q01` e `q15` têm
  `reportEcho: null` e `eligibleForEcho: false` por regra estrutural fechada (§4.1),
  independentemente de serem ou não "neutras" em termos de peso — `q01` continua
  contribuindo com `weights` normalmente para o score (ver `SCORING_MATRIX.md` §5);
  `q15` nunca tem `weights` (não pontua, por definição da Fase 0 original).
- A resposta de `q01` determina qual variante de `q12` é exibida (`q12a` ou `q12b`).
  **Estrutura fechada nesta revisão (Revisão 2):** `q01` tem exatamente 4
  alternativas, distribuídas estruturalmente como **1 alternativa** que representa
  "morar só" e **3 alternativas** que representam "morar acompanhado" — não é mais
  "ao menos uma de cada categoria", é uma proporção fixa 1+3. A alternativa de
  "morar só" leva a `q12a`; as três alternativas de "morar acompanhado" levam a
  `q12b`. Os labels de `q01` que caracterizam cada categoria são
  `[PENDENTE · JERUSKA]` (ver §6).
- `q15` não contribui para nenhuma dimensão de pontuação; alimenta exclusivamente a
  família 9 (`Direção e encerramento`) do `REPORT_COMPOSER.md`. As oito alternativas
  de `q15` representam oito "chaves de direção" — ver §7, hipótese de trabalho.

### 4.1 Elegibilidade de eco — fechado nesta revisão

- `q01` **não** gera `reportEcho`. Alimenta apenas a família 6 (`Contexto de
  moradia`) do `REPORT_COMPOSER.md`.
- `q15` **não** gera `reportEcho`. Alimenta apenas a família 9 (`Direção e
  encerramento`).
- Todas as alternativas de `q01` e de `q15`: `reportEcho: null`,
  `eligibleForEcho: false` — por regra estrutural, não por serem neutras em peso.
- Eco 1 e Eco 2 só podem vir de alternativas de `q03`–`q14` (inclui `q12a`/`q12b`).
- **Eco 3 só pode vir de `q02`** (não de `q01` — correção desta revisão em relação à
  Fase 0 original, que tratava as duas perguntas do cômodo Contexto como fonte
  possível de Eco 3). Esta segmentação é convenção estrutural para tornar a seleção
  de ecos verificável; ver `REPORT_COMPOSER.md` para a regra completa de seleção.

## 5. Inventário

`N_q01 = 4` e `N_q15 = 8` estão fechados nesta revisão — o inventário abaixo não é
mais paramétrico nesses dois valores.

```
total_perguntas    = 16   (14 fixas @ 4 + q01 @ 4 + q15 @ 8)
total_alternativas = 14 × 4 + 4 + 8 = 56 + 12 = 68
total_labels       = total_alternativas = 68
total_elegivel_eco = total_alternativas − alternativas de q01 (4) − alternativas de q15 (8)
                   = 68 − 12 = 56
total_reportEcho   = total_elegivel_eco − total_neutras_entre_elegiveis
```

`total_neutras_entre_elegiveis` é decisão de conteúdo da Jeruska e não pode ser
antecipado com exatidão.

| Item | Valor |
|---|---|
| Total de perguntas | 16 |
| Total de alternativas (`total_labels`) | **68** |
| Total elegível para eco (universo de `q02`–`q14`) | 56 |
| Total de `reportEcho` — limite superior | **≤ 56** |
| Total de `reportEcho` — hipótese de trabalho (≈15% neutras entre as elegíveis, para planejamento) | **48** (56 × 0,85 ≈ 47,6, arredondado) |

**Revisão 2 — reafirmado:** a hipótese de 48 **não é critério de aceite** e **não
obriga** a Jeruska a escrever exatamente 48 `reportEcho`. Serve apenas como
estimativa de esforço para planejamento. Depois que o conteúdo profissional for
escrito, o inventário deve ser recalculado com o número real de alternativas
neutras.

## 6. Tabela alternativa de `q01` → variante de `q12` (placeholder)

Estrutura fechada nesta revisão: **1 alternativa** de `q01` caracteriza "morar só" e
leva a `q12a`; as **outras 3** caracterizam "morar acompanhado" e levam a `q12b`.

| Alternativa de `q01` (`id`) | Caracteriza | Variante de `q12` exibida |
|---|---|---|
| `[PENDENTE · JERUSKA]` | mora só | `q12a` |
| `[PENDENTE · JERUSKA]` | mora acompanhado | `q12b` |
| `[PENDENTE · JERUSKA]` | mora acompanhado | `q12b` |
| `[PENDENTE · JERUSKA]` | mora acompanhado | `q12b` |

Nenhuma alternativa de `q01` pode ficar sem mapeamento. A proporção 1+3 é fixa —
não é "ao menos uma de cada", como na revisão anterior deste documento.

## 7. `q15` — oito posições estruturais (`q15-k1`…`q15-k8`)

O número de posições estruturais de `q15` está **fechado em 8**:
`q15-k1`…`q15-k8` (convenção de `id` própria, ver §3). A cardinalidade de oito é
estrutura; o conteúdo de cada posição é conteúdo, não estrutura, e entra aqui
apenas como hipótese de trabalho fornecida pelo responsável pelo produto — **não
como conteúdo final aprovado**:

```
paz · leveza · uniao · seguranca · liberdade · afeto · presenca · clareza
```

A Jeruska pode substituir qualquer uma dessas oito palavras, ou todas, desde que o
total permaneça oito — o conteúdo definitivo das oito posições permanece
`[PENDENTE · JERUSKA]`. **Se o número de posições mudar** (hoje fechado em 8, não se
espera que mude), o inventário deste documento e a família 9 de
`REPORT_COMPOSER.md` mudam junto — os dois documentos e `CONTENT_KIT.md` precisam
ser recalculados em conjunto.

`q15` reafirmado: não contribui para pontuação; não gera `reportEcho`; alimenta
exclusivamente a família 9 (`Direção e encerramento`).

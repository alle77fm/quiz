# SCORING_MATRIX — Casa com Alma

> Regras de cálculo: dimensões, normalização, mapa principal, dimensão complementar,
> força predominante, ponto de atenção — incluindo a ordem de desempate dos papéis
> narrativos, que antes vivia num documento próprio e dedicado.
> Este documento é especificação, não implementação.
>
> **Revisão 2:** mecanismo do mapa principal fechado (Opção A — par de dimensões,
> §8); direcionalidade fechada como restrição estrutural (§7); dimensão
> complementar redefinida por `necessidade`, agora excluindo também o ponto de
> atenção como restrição rígida (§10); cobertura mínima refinada — por caminho
> (`q12a`/`q12b`), com noção de contribuição efetiva (§4); conteúdo do documento de
> desempate de papéis narrativos incorporado aqui; esse arquivo foi excluído (a
> Fase 0 volta a ter dez documentos).
>
> **Correção pós-Fase-0:** critério de seleção da dimensão complementar marcado
> como `[PENDENTE · JERUSKA]` de ratificação (§10.2) — a regra vigente (§10) não
> mudou. Validação nomeada de cardinalidade exata do par de eixo acrescentada
> (§8.1), da qual a garantia de não-vazio da complementar depende matematicamente
> (§10.1, generalização por `k`).

---

## 1. As seis dimensões

Ordem canônica fixa (usada em todo desempate deste documento):

1. `acolhimento`
2. `limites`
3. `autocuidado`
4. `vinculos`
5. `reciprocidade`
6. `movimento`

Esta ordem reproduz a seção 5.4 da especificação original. Ela não expressa
importância — é o critério de desempate de último recurso, igual para todo o motor.

Ordem canônica fixa dos quatro mapas (seção 5.5 da especificação original):

```
casa-refugio · casa-de-reencontro · casa-dos-vinculos · casa-em-renovacao
```

### 1.1 Definições operacionais — `[PENDENTE · JERUSKA]`

Uma frase por dimensão, descritiva e operacional, não clínica. **Item 1 da fila de
escrita** (ver `CONTENT_KIT.md` §0) — sem elas, nenhum peso pode ser atribuído.

Toda definição deve obedecer à restrição fechada do §7: as seis dimensões são
positivamente orientadas, sem exceção.

## 2. Contribuição de perguntas para dimensões

Tabela-formato (não preenchida — qual peso vai para qual dimensão é decisão de
conteúdo):

| Pergunta | `acolhimento` | `limites` | `autocuidado` | `vinculos` | `reciprocidade` | `movimento` |
|---|---|---|---|---|---|---|
| `q01`, `q02` … `q14` (ver `QUIZ_CONTENT.md`; `q15` fora — não pontua) | `[PENDENTE · JERUSKA]` | … | … | … | … | … |

## 3. Faixa de pesos

Pesos são inteiros no intervalo **`[-2, 2]`** — restrição técnica fechada da matriz.
Zero equivale a "sem contribuição a essa dimensão" e não precisa ser declarado
explicitamente. **Os pesos concretos continuam `[PENDENTE · JERUSKA]`** — a faixa é
estrutura; os valores são conteúdo.

## 4. Cobertura mínima por dimensão — por caminho (`q12a`/`q12b`)

### 4.1 Por que "por caminho"

`q12a` e `q12b` são mutuamente exclusivas — uma participante só responde uma das
duas. A cobertura efetiva de cada dimensão precisa, portanto, ser garantida **em
cada caminho possível**, não em uma contagem combinada que misturaria as duas
variantes. A validação roda **separadamente** para o caminho `q12a` e para o
caminho `q12b`.

### 4.2 Contribuição efetiva (definição fechada nesta revisão)

Uma pergunta só conta como contribuição efetiva para uma dimensão quando suas
alternativas produzem **variação real** de peso naquela dimensão — isto é, existe
ao menos duas alternativas dessa pergunta com valores diferentes de
`weights[dimensão]`.

Uma chave de peso presente em todas as alternativas de uma pergunta, mas com o
**mesmo valor em todas elas** (incluindo o caso de ser sempre zero, ou sempre
qualquer outro número fixo), **não conta** como cobertura efetiva — é contribuição
nominal, sem capacidade real de mover o score daquela dimensão.

### 4.3 Restrições (falham a validação estrutural, não o build de runtime — rodam
sobre a tabela de pesos, antes de qualquer relatório existir)

- Cada dimensão recebe contribuição efetiva de **no mínimo três perguntas**, em
  **cada** caminho (`q12a` e `q12b` avaliados separadamente).
- `maximoDePerguntasPorDimensao − minimoDePerguntasPorDimensao ≤ 2`, calculado sobre
  a contagem de perguntas com contribuição efetiva por dimensão, também avaliado
  separadamente para cada caminho.

A validação falha quando:

- alguma dimensão tem menos de três perguntas com contribuição efetiva, em
  qualquer um dos dois caminhos;
- a diferença entre a dimensão mais coberta e a menos coberta ultrapassa dois, em
  qualquer um dos dois caminhos;
- o caminho `q12a` satisfaz as regras acima e o caminho `q12b` não (ou o inverso) —
  os dois caminhos precisam satisfazer as duas restrições, cada um por si;
- alguma dimensão não tem variação real em nenhuma pergunta (cobertura nominal
  apenas, sem capacidade de alterar o score — ver §4.2).

### 4.4 Relação com a normalização

Esta restrição existe porque a normalização (§6) corrige a escala, mas agrava o
efeito da cobertura desigual: uma dimensão tocada por poucas perguntas atinge 0 ou
100 com mais frequência que uma dimensão tocada por muitas, o que a faria dominar
força/atenção sem que isso reflita a participante de fato ter mais ou menos daquele
recurso.

## 5. Cálculo do score bruto por dimensão

```
bruto(dimensão) = soma, sobre todas as perguntas respondidas por aquela
                  participante exceto q15 (incluindo q01 e a variante de
                  q12 efetivamente exibida — q12a OU q12b, nunca as duas),
                  do weights[dimensão] da alternativa selecionada
                  (0 quando a alternativa não declara peso para essa dimensão)
```

`q15` nunca contribui para nenhum `bruto(dimensão)` — alimenta exclusivamente a
família 9 (`Direção e encerramento`). `q01` contribui normalmente ao score; apenas
não gera eco (`QUIZ_CONTENT.md` §4.1) e também determina qual variante de `q12` é
exibida.

Determinístico por construção: soma de inteiros fixos, sem dependência de ordem de
iteração (soma comutativa) e sem chamada externa.

## 6. Normalização

Força predominante, ponto de atenção, mapa principal e dimensão complementar usam
**exclusivamente** scores normalizados — nunca o `bruto`.

```
minimoTeorico(dimensão) = soma, para cada pergunta do conjunto de §5 efetivamente
                          respondido por aquela participante, do MENOR
                          weights[dimensão] entre as alternativas dessa pergunta

maximoTeorico(dimensão) = soma, para o mesmo conjunto, do MAIOR
                          weights[dimensão] entre as alternativas de cada pergunta

normalizado(dimensão) = ((bruto(dimensão) - minimoTeorico(dimensão)) /
                         (maximoTeorico(dimensão) - minimoTeorico(dimensão))) * 100
```

`minimoTeorico`/`maximoTeorico` são calculados sobre o caminho efetivamente
respondido (`q12a` ou `q12b`), tornando o cálculo determinístico por participante.

### 6.1 Caso `maximoTeorico == minimoTeorico`

```
scoreNormalizado = 50
```

e a **validação estrutural da matriz falha** — uma dimensão sem variação real não é
considerada válida para produção. Diferente da leitura da revisão anterior (que
tratava este caso como puramente defensivo e inatingível): nesta revisão, ele **é**
um critério de reprovação explícito da matriz de pesos, não apenas um fallback
silencioso. O valor `50` ainda é computado (para o motor nunca produzir `NaN`
mesmo diante de uma configuração inválida), mas essa configuração não deve chegar à
produção — é exatamente o que a restrição de cobertura efetiva do §4.2 deveria
impedir.

## 7. Direcionalidade das dimensões — fechada como restrição estrutural

**Todas as seis dimensões são positivamente orientadas. Não existe dimensão com
lógica invertida no MVP.**

- Score alto representa **maior presença** de um recurso.
- Score baixo representa **menor presença** desse recurso.
- `necessidade(dimensão) = 100 − normalizado(dimensão)` (ver §10).

Isso fecha, nesta revisão, a pendência de mecanismo que a Revisão 1 deixou aberta —
não há mais duas leituras possíveis sobre se a direcionalidade poderia se inverter
dimensão a dimensão. A Jeruska ratifica cada definição **obedecendo a esta regra**;
ela não escolhe se a dimensão é positiva ou invertida — isso já está fechado.

`movimento` também deve ter definição positivamente orientada. Registrando um
limite do que ela não pode significar, sem propor o que significa (conteúdo
continua `[PENDENTE · JERUSKA]`): `movimento` não deve ser interpretada como
agitação, impulsividade, instabilidade ou excesso de atividade — essas seriam
leituras que tornariam "score alto" equivalente a "menos recurso", contrariando a
orientação positiva fechada acima.

## 8. Mapa principal — mecanismo fechado (Opção A: par de dimensões)

**Aprovado nesta revisão.** Cada um dos quatro mapas é associado a um **par de
dimensões**.

### 8.1 Tabela mapa → par de dimensões

`[PENDENTE · JERUSKA]` — a Jeruska fornece as associações; o executor técnico não
escolhe os pares.

| Mapa | Dimensão A | Dimensão B |
|---|---|---|
| `casa-refugio` | `[PENDENTE · JERUSKA]` | `[PENDENTE · JERUSKA]` |
| `casa-de-reencontro` | `[PENDENTE · JERUSKA]` | `[PENDENTE · JERUSKA]` |
| `casa-dos-vinculos` | `[PENDENTE · JERUSKA]` | `[PENDENTE · JERUSKA]` |
| `casa-em-renovacao` | `[PENDENTE · JERUSKA]` | `[PENDENTE · JERUSKA]` |

**Restrições estruturais sobre esta tabela** (validação falha se violadas):

- **Cardinalidade exata do par** — validação nomeada, acrescentada nesta correção:
  cada um dos quatro mapas tem **exatamente duas** dimensões em seu par de eixo.
  Nem uma, nem três, nem quatro. A validação roda sobre a tabela mapa→par (§8.1),
  não sobre respostas de participantes, e falha o build antes de qualquer cálculo.
- As duas dimensões de um mesmo mapa devem ser **diferentes** entre si.
- Os **quatro pares devem ser únicos** — nenhum par pode se repetir entre mapas
  (mesmo com as duas dimensões trocadas de posição).
- Nenhum mapa pode conter duas vezes a mesma dimensão.
- Nenhuma decisão de preenchimento desta tabela depende de aleatoriedade ou de
  ordem de iteração de objetos — é uma tabela estática, definida uma vez pela
  Jeruska e versionada em código.

O conjunto das duas dimensões associadas ao mapa vencedor é chamado, a partir desta
revisão, **`eixoDoMapa`**.

### 8.2 Fórmula do mapa principal

```
necessidade(dimensão) = 100 - normalizado(dimensão)

mapScore(M) = (necessidade(eixo1 de M) + necessidade(eixo2 de M)) / 2

mapa_principal = mapa com maior mapScore
```

### 8.3 Desempate entre mapas, nesta ordem

1. Maior `mapScore`.
2. Maior valor **mínimo** entre as duas necessidades do par (`min(necessidade(eixo1),
   necessidade(eixo2))`).
3. Maior valor **máximo** entre as duas necessidades do par (`max(necessidade(eixo1),
   necessidade(eixo2))`).
4. Ordem canônica fixa dos quatro mapas (§1).

A fórmula e a ordem de desempate estão **fechadas tecnicamente**. A Jeruska precisa
validar apenas quais dimensões compõem cada par (§8.1) — não o mecanismo.

### 8.4 Por que `necessidade`, não `normalizado`, no mapScore

O mapa principal é lido como "o ambiente que mais precisa de atenção segundo o par
de dimensões que o define" — por isso o mapScore usa `necessidade` (100 menos o
normalizado), não o normalizado diretamente. Isso é coerente com a direcionalidade
fechada no §7: como todas as dimensões são positivas (mais = mais recurso),
`necessidade` é a mesma transformação para as seis, sem exceção por dimensão.

## 9. Força predominante e ponto de atenção

**A) Força predominante**

```
força predominante = dimensão com maior normalizado(dimensão)
```

Desempate: ordem canônica fixa das dimensões (§1).

**B) Ponto de atenção**

```
ponto de atenção = dimensão com menor normalizado(dimensão), excluindo a força
                    predominante
```

Desempate: ordem canônica fixa das dimensões, aplicada às dimensões restantes após
excluir a força.

**Restrição:** força predominante ≠ ponto de atenção — garantida por construção
(exclusão no próprio cálculo, não apenas checagem posterior).

## 10. Dimensão complementar — redefinida nesta revisão

```
candidatas = as seis dimensões, EXCLUINDO:
             - as duas dimensões de eixoDoMapa (§8.1)
             - a força predominante (§9.A)
             - o ponto de atenção (§9.B)

dimensão complementar = dimensão de MAIOR necessidade(dimensão) entre as candidatas
```

Desempate: ordem canônica fixa das dimensões, aplicada às candidatas restantes.

**Mudança em relação à Revisão 1:** antes, a complementar era escolhida por maior
`normalizado` (força), e a exclusão do ponto de atenção era apenas preferência de
ordenação entre empatadas, não restrição. Nesta revisão, **as três exclusões
(eixoDoMapa, força, atenção) são todas restrições rígidas** — falham a validação se
violadas — e o critério de seleção passa a ser `necessidade` (maior necessidade
entre as candidatas), não mais `normalizado`.

**Validações obrigatórias:**

- Força predominante ≠ ponto de atenção.
- Dimensão complementar ≠ força predominante.
- Dimensão complementar ≠ ponto de atenção.
- Dimensão complementar não pertence a `eixoDoMapa`.
- Exatamente uma força predominante é renderizada por relatório.
- Exatamente um ponto de atenção é renderizado por relatório.
- Exatamente uma dimensão complementar é renderizada por relatório.
- Nunca dois blocos da mesma família (ver `LANGUAGE_RULES.md`).

### 10.1 Garantia de não-vazio para a dimensão complementar

O conjunto excluído (`eixoDoMapa` ∪ `{força}` ∪ `{atenção}`) tem, no mínimo, 2
dimensões e, no máximo, 4: `eixoDoMapa` sempre contribui 2 dimensões distintas
(§8.1); força e atenção são sempre distintas entre si (§9); mas força e/ou atenção
podem coincidir com uma ou ambas as dimensões de `eixoDoMapa`. No pior caso (força e
atenção ambas dentro de `eixoDoMapa`), o conjunto excluído tem exatamente 2
elementos; no melhor caso (força e atenção fora de `eixoDoMapa` e distintas entre
si), tem 4. Como há seis dimensões ao todo, sempre sobram **entre 2 e 4**
candidatas — nunca zero. A dimensão complementar sempre resolve.

**Esta prova depende da cardinalidade do par de eixo ser exatamente 2, e só vale
para esse caso.** Generalizando para um par de tamanho `k`: o conjunto excluído tem
entre `k` (pior caso, força e atenção ambas dentro do par) e `k + 2` elementos
(melhor caso), e sobram entre `6 − (k + 2)` e `6 − k` candidatas. No pior caso,
sobram `6 − (k + 2)` = `4 − k` candidatas. Com `k = 2` (o caso fechado nesta
especificação), o pior caso é `4 − 2 = 2` — nunca zero, como demonstrado acima. Mas
com `k = 4`, o pior caso seria `4 − 4 = 0` — **conjunto vazio**, e a dimensão
complementar não teria candidata nenhuma. A prova de não-vazio só é válida com
`k = 2`; é exatamente por isso que a validação de cardinalidade exata do §8.1 não é
apenas uma checagem de forma — é uma pré-condição matemática desta garantia.

### 10.2 Critério de seleção — aguarda ratificação (`[PENDENTE · JERUSKA]`)

A regra vigente (§10, corpo principal) continua em operação: **não foi alterada**.
Esta subseção registra que o critério em si — qual das candidatas vira a dimensão
complementar — ainda não foi ratificado pela Jeruska, e documenta o que está em
jogo, sem propor conteúdo psicológico.

**O que o critério vigente produz, estruturalmente:** com a regra atual (maior
`necessidade` entre as candidatas, isto é, menor `normalizado`), o relatório traz
um bloco derivado do maior score (força) e **dois** blocos derivados do extremo
baixo (ponto de atenção e dimensão complementar). Essa proporção é estrutural — a
redação de cada bloco pode alterar o tom, não o peso: por mais que a família 5
(dimensão complementar) seja escrita com um registro diferente da família 4 (ponto
de atenção), as duas continuam sendo, matematicamente, leituras do que pontuou
baixo.

**Isso interage com três decisões já fechadas:**

- Os quatro mapas são laterais, não hierárquicos (seção 5.5 da especificação
  original) — nenhuma leitura do relatório pode sugerir gravidade ou escala.
- A coluna "refletir no seu tempo" da tela 4 é um caminho legítimo, não um déficit
  (`FINAL_SEQUENCE.md` §8).
- A tela 7 abre com reconhecimento, não com constatação de falta
  (`FINAL_SEQUENCE.md` §11).

Um relatório estruturalmente inclinado para dois blocos de "carência" contra um de
"presença" não contradiz essas três decisões por si só — mas é a interação que a
Jeruska precisa avaliar ao ratificar o critério, porque é ela quem decide se o tom
consegue absorver essa proporção sem que o conjunto passe a mensagem oposta ao que
as três decisões pedem.

**Duas opções, com a consequência de cada uma:**

- **Opção 1 (vigente)** — complementar = maior `necessidade` entre as candidatas
  (= menor `normalizado`). Proporção: **1 presença para 2 carências** (força é
  presença; atenção e complementar são carências).
- **Opção 2** — complementar = maior `normalizado` entre as candidatas (em vez de
  maior `necessidade`). Proporção: **2 presenças para 1 carência** (força e
  complementar seriam presenças; só atenção seria carência). Exige que a redação da
  família 5 (dimensão complementar) se diferencie deliberadamente da família 3
  (força predominante) para as duas não caírem no mesmo registro de "isso também é
  um ponto forte" repetido.

**Não escolhi entre as duas.** A regra vigente (Opção 1) permanece ativa em todo o
restante deste documento.

**Impacto no motor da Fase 2:** o motor pode ser implementado com a Opção 1 desde
já. Trocar para a Opção 2, se a Jeruska ratificar essa escolha, é alteração de uma
única função de seleção (o critério de ordenação das candidatas em §10) — sem
impacto em inventário, orçamento de palavras ou número de blocos. Ver
`CONTENT_KIT.md` §8, Grupo A, para o registro desta pendência na fila.

## 11. Ordem de resolução, determinística — resumo

1. **Força** — maior `normalizado` (§9.A).
2. **Mapa principal** — via pares e `mapScore` (§8).
3. **Ponto de atenção** — menor `normalizado`, excluindo a força (§9.B).
4. **Complementar** — maior `necessidade` entre as candidatas após excluir
   `eixoDoMapa`, força e atenção (§10).
5. **Desempates residuais** — ordem canônica fixa das seis dimensões (§1) em todo
   ponto de decisão acima; ordem canônica fixa dos quatro mapas (§1) no passo 2.

Nenhum passo depende de aleatoriedade, de `Date` ou de ordem de iteração de objeto.
Todas as comparações são sobre valores normalizados/derivados fixos e listas
ordenadas explicitamente.

## 12. `scoreSnapshot`

```ts
{
  quizVersao: string
  scores: Record<Dimension, {
    bruto: number
    minimoTeorico: number
    maximoTeorico: number
    normalizado: number   // 0-100, ou 50 no caso degenerado do §6.1
  }>
  eixoDoMapa: [Dimension, Dimension]
  mapaPrincipal: string
  forcaPredominante: Dimension
  pontoDeAtencao: Dimension
  dimensaoComplementar: Dimension
  nivelApoio: 0 | 1 | 2
}
```

Nenhum score — bruto, normalizado ou necessidade — é exibido à participante em
nenhuma tela.

## 13. Garantias

- **Determinismo:** a mesma sequência de respostas sempre produz o mesmo
  `scoreSnapshot`. Toda soma é sobre inteiros fixos; toda normalização usa fórmula
  fixa com tratamento explícito do caso degenerado; todo desempate é por ordem
  canônica fixa; a tabela mapa→par é estática, não depende de iteração.
- **Não-vazio:** as seis dimensões sempre têm `normalizado` definido. Força,
  atenção e mapa principal sempre resolvem pela ordem canônica em caso de empate
  total. Dimensão complementar sempre resolve — prova no §10.1.

## 14. Casos que a Fase 2 precisará testar

### Motor (mapa por pares)

- Mapa calculado corretamente pelos quatro pares.
- Configuração com par inválido (duas dimensões iguais no mesmo mapa) — deve falhar
  a validação, não o cálculo em produção.
- Tabela mapa→par com cardinalidade inválida (um mapa com uma, três ou quatro
  dimensões em vez de duas) — deve falhar a validação antes de qualquer cálculo,
  não silenciosamente aceitar e produzir um `mapScore` incorreto.
- Dois mapas com o mesmo par — deve falhar a validação.
- Empate de `mapScore` entre dois ou mais mapas.
- Desempate resolvido pelo menor valor mínimo do par (passo 2 do §8.3).
- Desempate resolvido pelo maior valor máximo do par (passo 3 do §8.3).
- Desempate resolvido pela ordem canônica (passo 4 do §8.3).
- Mesma entrada produzindo sempre o mesmo resultado (determinismo).

### Papéis narrativos

- Força diferente do ponto de atenção.
- Complementar diferente da força.
- Complementar diferente do ponto de atenção.
- Complementar fora de `eixoDoMapa`.
- Empate total entre as seis dimensões.
- Empate parcial entre dimensões (só entre as duas maiores, só entre as duas
  menores).
- Complementar inicialmente coincidente com força, antes da exclusão (verificar que
  a exclusão redireciona corretamente).
- Complementar inicialmente coincidente com atenção, antes da exclusão.
- Complementar inicialmente pertencente a `eixoDoMapa`, antes da exclusão.
- Repetibilidade do resultado após todas as exclusões e desempates.
- Exatamente um bloco de cada família (força, atenção, complementar, mapa,
  convite).

### Cobertura

- Cobertura mínima satisfeita no caminho `q12a`.
- Cobertura mínima satisfeita no caminho `q12b`.
- Diferença máxima de cobertura igual a dois (limite aceito).
- Rejeição quando a diferença ultrapassa dois.
- Pergunta com peso nominal (mesmo valor em todas as alternativas) não contando
  como cobertura efetiva.
- Dimensão com menos de três perguntas com contribuição efetiva, em qualquer
  caminho.
- Caso em que `q12a` satisfaz a regra e `q12b` não (e o inverso).

### Normalização

- Cobertura desigual entre dimensões (respeitando o limite do §4), verificando que
  nenhuma domina sistematicamente os extremos.
- Caso degenerado do §6.1 — confirmar que o motor não quebra e que a validação
  estrutural reprova a configuração.

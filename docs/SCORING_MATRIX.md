# SCORING_MATRIX — Casa com Alma

> Regras de cálculo: dimensões, mapa principal, dimensão complementar, força
> predominante, ponto de atenção, e todos os desempates, de forma determinística.
> Este documento é especificação, não implementação.

---

## 1. As seis dimensões

Ordem canônica fixa (usada em todo desempate deste documento e dos demais):

1. `acolhimento`
2. `limites`
3. `autocuidado`
4. `vinculos`
5. `reciprocidade`
6. `movimento`

Esta ordem reproduz a ordem em que as dimensões aparecem na seção 5.4 da
especificação original. Ela não expressa importância — é apenas o critério de
desempate de último recurso, igual para todo o motor.

### 1.1 Definições operacionais

`[PENDENTE · JERUSKA]` — uma frase por dimensão, descritiva e operacional, não
clínica, definindo o que cada uma mede.

> **Ambiguidade resolvida por conta própria:** a especificação original pede essa
> definição como entrega deste documento (não a marca como pendência), mas a seção 4
> do prompt original proíbe "qualquer interpretação, formulação ou hipótese sobre
> estados emocionais". Uma definição operacional de uma dimensão como `acolhimento` ou
> `vinculos` formula, mesmo que em nível de instrumento, o que esses construtos
> significam. Optei por tratar essas seis frases como conteúdo da Jeruska, não como
> estrutura, e marquei como pendência. Ver item 4 da seção de entrega para o registro
> formal desta decisão.

## 2. Contribuição de perguntas para dimensões

Tabela-formato (não preenchida — qual peso vai para qual dimensão é decisão de
conteúdo):

| Pergunta | `acolhimento` | `limites` | `autocuidado` | `vinculos` | `reciprocidade` | `movimento` |
|---|---|---|---|---|---|---|
| `q01` … `q15` (16 linhas, ver `QUIZ_CONTENT.md`) | `[PENDENTE · JERUSKA]` | … | … | … | … | … |

Regra estrutural: cada alternativa não-neutra tem `weights: Partial<Record<Dimension,
number>>` — pode contribuir para uma ou mais dimensões simultaneamente (ver
`QUIZ_CONTENT.md`, §3). A tabela acima registra, por pergunta, **quais** dimensões
podem receber peso; os valores numéricos ficam nas próprias alternativas.

## 3. Faixa de pesos

Decisão técnica (não é conteúdo psicológico): pesos são inteiros no intervalo
`[-2, 2]`.

Justificativa: um intervalo pequeno e simétrico em torno de zero mantém a soma por
dimensão legível, evita que uma única alternativa domine o resultado, e é simples de
auditar manualmente durante a Fase 2. Zero equivale a "sem contribuição a essa
dimensão" e não precisa ser declarado explicitamente (a ausência da chave no objeto
`weights` já significa zero).

`[PENDENTE · ALEXANDRE]` — confirmar se `[-2, 2]` é adequado ou se a Jeruska prefere
outra granularidade (por exemplo `[-3, 3]` ou pesos não-inteiros). Qualquer mudança
aqui não afeta a aritmética de palavras do relatório — afeta apenas a matemática do
motor de pontuação.

## 4. Cálculo da pontuação por dimensão

```
score(dimensão) = soma, sobre todas as perguntas respondidas exceto q15,
                  do weights[dimensão] de cada alternativa selecionada
                  (0 quando a alternativa não declara peso para essa dimensão)
```

Determinístico por construção: soma de inteiros fixos, sem dependência de ordem de
iteração (a soma é comutativa) e sem chamada externa.

## 5. Mapa principal

### 5.1 Pendência estrutural — tabela mapa → eixo

`[PENDENTE · JERUSKA]` — Existem quatro mapas (`casa-refugio`, `casa-de-reencontro`,
`casa-dos-vinculos`, `casa-em-renovacao`) e seis dimensões. Não há correspondência de
um para um. A regra "dimensão complementar diferente do eixo do mapa principal" só é
computável quando existir esta tabela:

| Mapa | Dimensão(ões) de eixo |
|---|---|
| `casa-refugio` | `[PENDENTE · JERUSKA]` |
| `casa-de-reencontro` | `[PENDENTE · JERUSKA]` |
| `casa-dos-vinculos` | `[PENDENTE · JERUSKA]` |
| `casa-em-renovacao` | `[PENDENTE · JERUSKA]` |

Um mapa **pode** ter mais de uma dimensão de eixo. Se tiver, a restrição de exclusão
(§6.1) exclui **todas** as dimensões de eixo daquele mapa da lista de candidatas a
dimensão complementar — não apenas uma. Isso é assim independentemente de quantas
dimensões de eixo cada mapa acabar tendo: a restrição opera sobre o conjunto de eixo do
mapa selecionado, não sobre uma dimensão isolada.

Não atribuí nenhuma dimensão a nenhum mapa: a afinidade aparente entre nomes de mapa e
nomes de dimensão (por exemplo, `casa-refugio` soando próximo de `acolhimento`) pode
não corresponder à intenção da Jeruska, e a decisão é de conteúdo.

### 5.2 Pendência estrutural — eixo do mapa principal e força predominante coincidem?

`[PENDENTE · ALEXANDRE]` — não está definido se a dimensão de eixo do mapa selecionado
é sempre a mesma dimensão escolhida como força predominante (§7). As duas leituras:

**Leitura A — coincidem sempre.** O mapa principal é obtido revertendo a tabela do
§5.1 a partir da força predominante: `mapa_principal = mapa cujo conjunto de eixo
contém a dimensão de força predominante`. Neste caso, a restrição "complementar
diferente do eixo do mapa" (§6.1) e a dimensão de força predominante (§7) referem-se à
mesma dimensão, e a cadeia de desempate da dimensão complementar se reduz: excluir o
eixo do mapa é equivalente a excluir a força predominante.

**Leitura B — não coincidem necessariamente.** O mapa principal é obtido por uma regra
própria (por exemplo, soma agregada das dimensões de eixo de cada mapa, comparada entre
os quatro mapas), independente de qual dimensão isolada tem a maior pontuação. Neste
caso, eixo do mapa, força predominante e ponto de atenção são até três dimensões
potencialmente distintas, e a ordem de exclusão descrita no §6 importa integralmente.

Este documento especifica a cadeia de desempate (§6, §7, §8) de forma que funcione sob
as duas leituras: toda regra referencia "eixo do mapa principal" e "força predominante"
como dois nomes que **podem** apontar para a mesma dimensão ou não, sem assumir uma das
duas leituras internamente.

### 5.3 Determinação do mapa (sob a Leitura B; reduz-se à Leitura A quando aplicável)

```
score_mapa(M) = agregação (definida em conjunto com §5.1) das dimensões de eixo de M
mapa_principal = mapa com maior score_mapa
```

Desempate: se dois ou mais mapas empatam em `score_mapa`, escolha o mapa cuja primeira
dimensão de eixo (na ordem canônica do §1) aparece mais cedo na ordem canônica entre
todos os mapas empatados. Isso é determinístico e não depende de ordem de iteração.

## 6. Dimensão complementar

### 6.1 Restrição (falha o build se violada)

A dimensão complementar **nunca** coincide com nenhuma dimensão de eixo do mapa
principal (conjunto definido no §5.1).

### 6.2 Algoritmo de seleção

1. **Filtrar** — remova das seis dimensões todas as que são eixo do mapa principal.
   As dimensões restantes são as candidatas válidas. (Restrição, não preferência.)
2. **Ordenar** as candidatas válidas por `score(dimensão)` decrescente.
3. **Preferência** — entre as candidatas empatadas no topo do ranking, prefira a que
   for diferente do ponto de atenção (§8). Esta é uma preferência de ordenação entre
   candidatas empatadas, não um filtro: se a candidata de maior pontuação for única
   (sem empate) e coincidir com o ponto de atenção, ela é escolhida mesmo assim — a
   preferência não descarta a candidata mais bem pontuada, apenas desempata entre
   iguais.
4. **Desempate final** — se ainda houver empate após o passo 3, escolha a candidata
   que aparece primeiro na ordem canônica do §1.

> **Nota sobre nomenclatura entre documentos:** o texto que resolve a pendência 3.2
> (recebido em prompt de execução separado) usa em um ponto a expressão "preferência
> complementar diferente da força", enquanto a regra de desempate propriamente dita
> (seção "AJUSTE COMPLEMENTAR", também recebida no prompt de execução, não encontrada
> no arquivo `FASE-0-adendo-secao-5_10-revisada.md` como o prompt indicava) define a
> preferência como "diferente do **ponto de atenção**". Segui a segunda formulação
> (diferente do ponto de atenção) por ser a que veio explicitamente nomeada como regra
> de desempate; registro a variação de termos como algo a confirmar, não decidi por
> conta própria qual delas está certa.

## 7. Força predominante

`força predominante = dimensão com maior score(dimensão)` entre as seis.

Desempate: ordem canônica do §1 (a dimensão empatada que aparece primeiro na lista
vence).

## 8. Ponto de atenção

`ponto de atenção = dimensão com menor score(dimensão)` entre as seis, **excluindo** a
dimensão escolhida como força predominante.

**Restrição (falha o build se violada):** força predominante é sempre diferente de
ponto de atenção. A exclusão no cálculo acima garante isso por construção — não é
apenas uma checagem posterior.

Desempate: ordem canônica do §1, aplicada às dimensões restantes após excluir a força
predominante.

## 9. Cadeia de desempate — resumo determinístico

Para qualquer papel (força predominante, ponto de atenção, dimensão complementar, mapa
principal):

1. Nunca há aleatoriedade (`Math.random` proibido) nem uso de `Date` no cálculo.
2. Nunca há dependência de ordem de iteração de objeto — toda comparação é sobre uma
   lista ordenada explicitamente (ordem canônica do §1 para dimensões, ordem canônica
   da seção 5.5 do original para mapas: `casa-refugio`, `casa-de-reencontro`,
   `casa-dos-vinculos`, `casa-em-renovacao`).
3. Restrições (força ≠ atenção; complementar ≠ eixo do mapa) são aplicadas como filtro,
   antes de qualquer ranking.
4. Preferências (complementar ≠ ponto de atenção) são aplicadas como critério de
   ordenação entre candidatas empatadas, nunca como filtro.
5. O desempate final, sempre disponível e sempre decisivo, é a ordem canônica.

## 10. `scoreSnapshot`

Gravado junto do resultado (ver `DATA_MODEL.md`), para permitir reconstituir qualquer
resultado antigo:

```ts
{
  quizVersao: string
  scores: Record<Dimension, number>        // score(dimensão) das seis
  mapaPrincipal: string
  forcaPredominante: Dimension
  pontoDeAtencao: Dimension
  dimensaoComplementar: Dimension
  nivelApoio: 0 | 1 | 2
}
```

## 11. Garantias

- **Determinismo:** a mesma sequência de respostas sempre produz o mesmo
  `scoreSnapshot`. Toda soma é sobre inteiros fixos; todo desempate é por ordem
  canônica fixa.
- **Não-vazio:** as seis dimensões sempre têm um `score` (mesmo que zero — ausência de
  peso conta como zero, não como ausência de dimensão). Força predominante, ponto de
  atenção e dimensão complementar sempre resolvem para uma dimensão via a cadeia do
  §9, porque a ordem canônica garante um vencedor mesmo em empate total. O mapa
  principal sempre resolve pelo mesmo motivo (§5.3). Logo, nenhuma combinação de
  respostas pode produzir resultado vazio.

## 12. Casos que a Fase 2 precisará testar

- Perfil predominante de cada um dos quatro mapas.
- Empate entre dois mapas.
- Empate entre três ou mais mapas.
- Todas as respostas neutras (todos os `score(dimensão) = 0`).
- Respostas em extremo baixo (todas as alternativas de peso mínimo).
- Respostas em extremo alto (todas as alternativas de peso máximo).
- Caminho `q12a` e caminho `q12b`.
- Empate entre força predominante e outra dimensão.
- Empate entre candidatas a dimensão complementar após a restrição do §6.1.
- Caso em que a única candidata a dimensão complementar (após filtro) coincide com o
  ponto de atenção (a preferência do §6.2 não tem o que ordenar).

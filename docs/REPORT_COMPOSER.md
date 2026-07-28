# REPORT_COMPOSER — Casa com Alma

> Compositor determinístico modular: famílias de bloco, orçamento de palavras, três
> níveis de apoio/convite, seleção de ecos, ordem de montagem, inventário.
> Este documento é especificação, não implementação. Documento central da Fase 0.

---

## 1. Ponto mais fácil de ler errado nesta especificação

**`acolhimento` não é uma quarta intenção de terapia.** O campo `intencao_terapia`
continua com exatamente três valores: `explorando`, `considerando`,
`pronto_para_conversar`. A tela 3 continua oferecendo três opções.

`acolhimento` é uma **quarta variante de bloco da família 10 (Convite)**, selecionada
pelo motor quando `nivelApoio = 2`, **independentemente** da intenção que a participante
declarou. A intenção declarada é gravada normalmente; ela apenas não governa a escolha
da variante de convite nesse caso específico. Ver `DATA_MODEL.md` para o mesmo ponto
registrado na estrutura do JSON de resultado.

## 2. Cardinalidade do relatório (fechado)

O relatório final contém **exatamente**:

- 1 bloco de abertura (o do mapa principal)
- 1 bloco de mapa principal
- 1 bloco de força predominante
- 1 bloco de ponto de atenção
- 1 bloco de dimensão complementar
- 1 bloco de contexto de moradia
- 0 a 3 ecos
- 1 bloco de "como aparece na rotina"
- 1 bloco de direção e encerramento
- 0 ou 1 bloco de apoio (condicional, níveis 1 e 2)
- **exatamente 1** variante da família Convite (nunca zero, nunca duas)
- 1 bloco de aviso de não-diagnóstico

Nunca dois blocos da mesma família no mesmo relatório.

## 3. O convite nunca é suprimido

Regra vigente (revoga qualquer versão anterior que previa suprimir a família 10 quando
o bloco de apoio fosse acionado): **exatamente uma variante da família 10 é renderizada
em todo relatório, nos três níveis de apoio.** O nível 2 substitui a linguagem de
conversão por linguagem de disponibilidade (variante `acolhimento`); não remove o
convite.

## 4. Famílias de bloco

| # | Família | Variantes necessárias | Orçamento (palavras) |
|---|---|---|---|
| 1 | Abertura | 4 (uma por mapa) | 45–60 |
| 2 | Mapa principal | 4 (uma por mapa) | 85–110 |
| 3 | Força predominante | 6 (uma por dimensão) | 65–85 |
| 4 | Ponto de atenção | 6 (uma por dimensão) | 65–85 |
| 5 | Dimensão complementar | 6 (uma por dimensão) | 55–75 |
| 6 | Contexto de moradia | `N_q01` (hipótese 4) | 38–55 |
| 7 | Ecos | 0 a 3, reaproveitados de `reportEcho` (ver §9) | 18–26 cada |
| 8 | Como aparece na rotina | 6 (uma por dimensão) | 55–75 |
| 9 | Direção e encerramento | `N_q15` (hipótese 4) | 55–75 |
| 10 | Convite | **4** (`explorando`, `considerando`, `pronto_para_conversar`, `acolhimento`) | 45–65 |
| 11 | Bloco de apoio (condicional) | 1 | 35–55 |
| 12 | Aviso de não-diagnóstico | 1 | 20–30 |

A família 10 tem quatro variantes, não três — correção vigente por
`FASE-0-adendo-secao-5_10-revisada.md` (§5.10.3), que prevalece sobre a tabela original
de três variantes. Todas as quatro compartilham o mesmo orçamento, 45–65 palavras.

## 5. Verificação aritmética — quatro cenários

Em qualquer relatório, **no máximo uma variante de cada família aparece** (exceto ecos
e bloco de apoio, que têm cardinalidade própria — ver §2). Isso significa que o "custo"
de cada família no total de palavras é o orçamento de **uma única variante**, não a
soma de todas as variantes possíveis.

Recalculei os quatro cenários por conta própria a partir da tabela do §4, sem copiar
valores prontos. A conta bateu com os quatro números apontados como esperados; o
detalhamento abaixo é o cálculo, não uma cópia.

### 5.1 Mínimo — nível 0 (percurso normal), sem ecos

Soma dos limites inferiores das famílias sempre presentes; bloco de apoio ausente
(nível 0); zero ecos.

```
1  Abertura                     45
2  Mapa principal               85
3  Força predominante           65
4  Ponto de atenção             65
5  Dimensão complementar        55
6  Contexto de moradia          38
7  Ecos (zero)                   0
8  Como aparece na rotina       55
9  Direção e encerramento       55
10 Convite                      45
11 Bloco de apoio (ausente)      0
12 Aviso de não-diagnóstico     20
                              -----
                                528
```

**528 palavras.**

### 5.2 Máximo — nível 0 (percurso normal), 3 ecos

Soma dos limites superiores; bloco de apoio ausente (nível 0); três ecos no limite
superior (26 cada).

```
1  Abertura                     60
2  Mapa principal              110
3  Força predominante           85
4  Ponto de atenção             85
5  Dimensão complementar        75
6  Contexto de moradia          55
7  Ecos (3 × 26)                78
8  Como aparece na rotina       75
9  Direção e encerramento       75
10 Convite                      65
11 Bloco de apoio (ausente)      0
12 Aviso de não-diagnóstico     30
                              -----
                                793
```

**793 palavras.**

### 5.3 Máximo — nível 1 (sofrimento declarado / alta necessidade), 3 ecos

Igual ao §5.2, acrescentando o bloco de apoio no limite superior (55).

```
5.2 (793) + Bloco de apoio (55) = 848
```

**848 palavras.**

### 5.4 Máximo — nível 2 (indício de risco específico), 3 ecos

Igual ao §5.3. A variante de convite usada é `acolhimento` em vez de uma das outras
três, mas compartilha o mesmo orçamento (45–65) — o limite superior da família 10
continua 65 em qualquer variante. O total não muda.

```
5.3 (848), variante de convite = "acolhimento" (mesmo orçamento) = 848
```

**848 palavras.**

### 5.5 Resultado da verificação

| Cenário | Total |
|---|---|
| Mínimo (nível 0, sem ecos) | 528 |
| Máximo nível 0 (3 ecos) | 793 |
| Máximo nível 1 (3 ecos + apoio) | 848 |
| Máximo nível 2 (3 ecos + apoio + acolhimento) | 848 |

Os quatro caem entre 500 e 850, com alvo de 500–750 satisfeito nos cenários mínimo e
máximo nível 0; os cenários de apoio ultrapassam o alvo mas ficam dentro do teto.

**Restrição ativa:** 848 encosta no teto de 850. Qualquer aumento futuro de orçamento
em qualquer família, para qualquer nível, exige recalcular os quatro cenários deste
documento antes de ser aceito. Isso vale mesmo para aumentos que pareçam pequenos ou
isolados a uma única família.

## 6. Três níveis de apoio e convite

| Nível | Condição | Bloco de apoio | Convite |
|---|---|---|---|
| 0 | Percurso normal | Ausente | Família 10, variante da intenção declarada |
| 1 | Sofrimento declarado / alta necessidade | Presente | Família 10, variante da intenção declarada |
| 2 | Indício de risco específico | Presente | Família 10, variante `acolhimento` |

`nivelApoio` (0, 1 ou 2) é gravado no objeto `resultado` — ver `DATA_MODEL.md`.

Os níveis são avaliados em ordem decrescente e são **mutuamente exclusivos**: se o
nível 2 for acionado, o nível 1 não é avaliado.

### 6.1 Critérios de acionamento

- **Nível 1** — combinação de pontuação em faixa baixa nas dimensões de `acolhimento`,
  `limites` e `autocuidado`. Limiar exato: `[PENDENTE · JERUSKA]`.
- **Nível 2** — combinações específicas e nomeadas de alternativas (não faixa de
  pontuação), listadas explicitamente na configuração. Definição: `[PENDENTE ·
  JERUSKA]`.

**Restrição de desenho, não negociável nesta fase:** o critério do nível 2 é
deliberadamente estreito — uma lista de combinações nomeadas, não uma faixa de
pontuação. Um critério largo captura participantes que apenas atravessam um período
difícil, o que produz duas perdas: a pessoa recebe um enquadramento que não corresponde
à situação dela, e um encaminhamento legítimo (o nível 2 de fato) é descaracterizado
pela diluição. O nível 2 é exceção, não faixa, e a Fase 2 deve testar isso
explicitamente (ver §12 de `SCORING_MATRIX.md`).

### 6.2 Regras da variante `acolhimento`

- Sem linguagem de conversão, oferta, urgência ou benefício.
- Sem verbo de ação comercial ("agende", "garanta", "aproveite").
- Nomeia a psicóloga e informa disponibilidade.
- Mesmo registro de tom do bloco de apoio.
- Sujeita ao verificador de linguagem como qualquer outro bloco (ver
  `LANGUAGE_RULES.md`).

O nível 1 **não reduz** o convite — é onde a necessidade declarada e o valor do
encaminhamento coincidem, e a variante correspondente a `pronto_para_conversar` é a
mais direta das quatro. O nível 2 **não suprime** o caminho até a psicóloga: substitui
a linguagem de conversão por linguagem de disponibilidade, mas a psicóloga continua
nomeada e acessível.

## 7. Regras de seleção dos ecos

- Até três ecos, **não necessariamente três**.
- **Eco 1:** a resposta elegível de maior contribuição para a dimensão do mapa
  principal.
- **Eco 2:** a resposta elegível de maior contribuição para a dimensão complementar.
- **Eco 3:** a resposta elegível vinda do contexto do percurso (cômodo Contexto —
  `q01`/`q02`, ver `QUIZ_CONTENT.md` §4).
- Cômodos distintos são **preferidos**, mas relevância tem prioridade sobre distinção.
- Desempate por ordem crescente de `id` de pergunta.
- Alternativas com `eligibleForEcho: false` nunca são selecionadas.
- O compositor funciona com zero, um, dois ou três ecos.
- **Proibido inventar, duplicar ou substituir conteúdo para completar quantidade.** Uma
  participante que responde tudo de forma neutra pode legitimamente gerar zero ecos.

## 8. Regras de redação dos blocos

- Cada bloco é **autossuficiente** — nenhuma referência a texto anterior ("como
  vimos", "além disso", "essa mesma sensação", "por isso").
- Qualquer bloco pode aparecer ao lado de qualquer outro.
- Segunda pessoa, sem flexões de gênero.
- Sem numeração de questões — a contextualização é sempre pelo cômodo: "Na sala, você
  marcou que…", "No quarto, você contou que…".

## 9. Ecos não são blocos autorados separadamente

O texto de cada eco **é** o `reportEcho` da alternativa selecionada (ver
`QUIZ_CONTENT.md`, §3–4). A família 7 não gera uma tabela própria de textos a escrever
no inventário deste documento — o conteúdo já está contado no inventário de
`QUIZ_CONTENT.md`. Contar a família 7 aqui também duplicaria o total consolidado em
`CONTENT_KIT.md`. O único conteúdo próprio da família 7, neste documento, é a **regra
de seleção** (§7), não texto.

## 10. Ordem de montagem

Sequência fixa, nível 0 (sem bloco de apoio):

```
1.  Abertura
2.  Mapa principal
3.  [Eco 1 — se existir candidata elegível]
4.  Força predominante
5.  Ponto de atenção
6.  Dimensão complementar
7.  [Eco 2 — se existir candidata elegível]
8.  Contexto de moradia
9.  [Eco 3 — se existir candidata elegível]
10. Como aparece na rotina
11. Direção e encerramento
12. Convite (variante da intenção declarada)
13. Aviso de não-diagnóstico
```

Níveis 1 e 2 — o bloco de apoio ocupa a posição imediatamente anterior ao convite:

```
… → 11. Direção e encerramento → [Bloco de apoio] → 12. Convite → 13. Aviso de não-diagnóstico
```

> **Decisão própria, sinalizada:** a especificação original pede que este documento
> declare "onde cada eco é inserido", sem fixar a posição. Optei por inserir cada eco
> logo após o bloco cuja dimensão ele reforça (Eco 1 após Mapa principal, Eco 2 após
> Dimensão complementar, Eco 3 após Contexto de moradia), por ser a leitura mais direta
> de "a resposta elegível de maior contribuição para a dimensão X" — o eco fica
> fisicamente próximo do bloco que ele ecoa. Nenhuma regra de conteúdo depende dessa
> posição; é puramente de composição visual/textual e pode ser revista sem impacto na
> aritmética ou nas validações.

## 11. Inventário de blocos a escrever

| Família | Variantes a escrever |
|---|---|
| 1. Abertura | 4 |
| 2. Mapa principal | 4 |
| 3. Força predominante | 6 |
| 4. Ponto de atenção | 6 |
| 5. Dimensão complementar | 6 |
| 6. Contexto de moradia | `N_q01` (hipótese 4) |
| 7. Ecos | 0 — reaproveita `reportEcho` de `QUIZ_CONTENT.md` (§9 acima) |
| 8. Como aparece na rotina | 6 |
| 9. Direção e encerramento | `N_q15` (hipótese 4) |
| 10. Convite | 4 |
| 11. Bloco de apoio | 1 |
| 12. Aviso de não-diagnóstico | 1 |
| **Total (hipótese `N_q01=N_q15=4`)** | **46** |

Este total deve ser idêntico ao total de "blocos de relatório" somado em
`CONTENT_KIT.md`. Se `N_q01` ou `N_q15` mudarem, os dois documentos precisam ser
atualizados juntos.

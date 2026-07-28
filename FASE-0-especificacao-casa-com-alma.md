# PROMPT — FASE 0 · ESPECIFICAÇÃO FUNCIONAL
## Projeto: Casa com Alma

---

## 1. PAPEL E OBJETIVO

Você é um arquiteto de software e redator técnico. Sua única tarefa nesta fase é **produzir documentos de especificação em Markdown**.

Você **não** vai criar projeto, instalar dependências, escrever código, criar banco, criar interface ou gerar textos de conteúdo psicológico.

Ao final desta fase o repositório deve conter apenas uma pasta `docs/` com os documentos listados na seção 6. Nada mais.

---

## 2. CONTEXTO DO PRODUTO

O **Casa com Alma** é uma experiência web de 15 perguntas fechadas, organizada como um percurso pelos cômodos de uma casa. Ao final, a participante recebe um relatório visual que reflete o que suas respostas sugerem sobre o momento de vida dela, e pode optar por conversar com a psicóloga Jeruska Maciel.

**Este MVP é um teste de validação com usuários controlados.** Não será público, não haverá tráfego pago, não haverá indexação. Simples no escopo, mas bem executado e próximo do produto real.

O produto **não** é um teste psicológico, não produz diagnóstico e não substitui avaliação profissional. Toda a linguagem do produto deve refletir isso.

**Público:** adultos, classe média para cima, predominantemente mulheres, Sul de Minas Gerais.

---

## 3. ESTADO ATUAL DO REPOSITÓRIO

Vazio. Esta é a primeira execução do projeto.

---

## 4. PROIBIÇÕES ABSOLUTAS DESTA FASE

Estas proibições não admitem exceção, interpretação flexível ou "apenas um exemplo para ilustrar".

**Você não pode criar conteúdo psicológico.** Especificamente, você **não escreve**:

- as alternativas das 15 perguntas;
- os pesos de nenhuma alternativa;
- os textos de nenhum bloco do relatório;
- os textos `reportEcho`;
- as descrições dos quatro mapas;
- qualquer interpretação, formulação ou hipótese sobre estados emocionais.

Esses conteúdos serão escritos pela psicóloga responsável. Sua função é **definir a estrutura que os receberá** e **inventariar exatamente quanto conteúdo será necessário**.

Você também não pode:

- criar arquivos fora de `docs/`;
- iniciar projeto Next.js, `package.json`, ou qualquer arquivo de código;
- propor bibliotecas além das já decididas;
- alterar decisões da seção 5;
- inventar perguntas além das 15 já aprovadas;
- inventar uma quinta dimensão, um quinto mapa ou uma quarta intenção.

**Convenção obrigatória para conteúdo pendente:**

```
[PENDENTE · JERUSKA] — descrição do que precisa ser escrito, com limite de palavras
[PENDENTE · ALEXANDRE] — decisão técnica ou de produto ainda em aberto
```

Um documento com placeholders corretos e estrutura completa é o resultado esperado. Um documento com conteúdo psicológico inventado é uma falha desta fase, mesmo que bem escrito.

---

## 5. DECISÕES JÁ FECHADAS

Não questione, não otimize, não sugira alternativas para nenhum item desta seção.

### 5.1 Stack

| Camada | Tecnologia |
|---|---|
| Aplicação | Next.js (App Router) |
| Linguagem | TypeScript estrito |
| Interface | Tailwind CSS |
| Formulários | React Hook Form |
| Validação | Zod |
| Banco | Supabase (PostgreSQL) |
| Deploy | Vercel |
| WhatsApp | Evolution API, chamada direta do servidor |
| Testes | Vitest + Testing Library + Playwright |

### 5.2 Fora do escopo

Sem IA no resultado. Sem PDF. Sem e-mail. Sem n8n. Sem painel administrativo. Sem autenticação. Sem chatbot. Sem editor visual de perguntas. Sem pagamento. Sem multiusuário. Sem UTM tracking. Sem upload de arquivos.

### 5.3 Conteúdo em código, não em banco

Perguntas, alternativas, pesos e blocos de texto ficam em arquivos TypeScript versionados sob `src/config/quiz/v1/`. Não existem tabelas editáveis de conteúdo.

### 5.4 Seis dimensões

`acolhimento` · `limites` · `autocuidado` · `vinculos` · `reciprocidade` · `movimento`

### 5.5 Quatro mapas

`casa-refugio` · `casa-de-reencontro` · `casa-dos-vinculos` · `casa-em-renovacao`

Os quatro mapas são **laterais, não hierárquicos**. Nenhum é melhor ou pior que outro. Nenhuma representação visual pode sugerir escala, nível, gravidade ou progressão entre eles.

### 5.6 As 15 perguntas (aprovadas)

| # | Cômodo | Pergunta |
|---|---|---|
| 1 | Contexto | Com quem você mora atualmente? |
| 2 | Contexto | Ao chegar em casa, qual sensação aparece primeiro? |
| 3 | Porta de entrada | Você consegue deixar as preocupações do lado de fora? |
| 4 | Porta de entrada | Sente que seu espaço e seus limites são respeitados? |
| 5 | Sala | Como você se sente nos momentos de convivência? |
| 6 | Sala | Quando algo incomoda, como as pessoas costumam lidar? |
| 7 | Sala | Você sente que pode falar e ser realmente ouvido? |
| 8 | Cozinha | As responsabilidades da casa são divididas de forma equilibrada? |
| 9 | Cozinha | O que mais parece estar faltando na rotina da casa? |
| 10 | Quarto | Seu quarto permite que você realmente descanse? |
| 11 | Quarto | Você consegue parar sem sentir culpa? |
| 12 | Quarto | Como percebe a proximidade emocional em sua vida? |
| 13 | Espaço pessoal | Você encontra tempo e espaço para cuidar de si? |
| 14 | Espaço pessoal | Existe algum espaço, objeto ou assunto da casa que você evita? |
| 15 | Janela | O que você gostaria de sentir mais dentro de sua casa e dentro de você? |

Todas fechadas. Nenhum campo de texto livre no quiz.

**A pergunta 12 tem duas variantes**, `q12a` e `q12b`, selecionadas pela resposta da pergunta 1 (mora sozinha / mora acompanhada). São perguntas distintas, com alternativas e pesos próprios, e devem ser tratadas como tal em toda a especificação.

### 5.7 Três intenções de terapia

`explorando` · `considerando` · `pronto_para_conversar`

A intenção é coletada **depois** do cálculo do resultado. Ela **não** altera o mapa, a dimensão complementar, os pontos de atenção ou qualquer pontuação. Altera **apenas** o bloco de convite e o CTA.

---

## 6. ENTREGÁVEIS

Nove documentos em `docs/`. Cada um deve começar com um sumário de uma linha e uma nota indicando que é especificação, não implementação.

---

### 6.1 `docs/MVP_SCOPE.md`

- Descrição do produto em até 200 palavras
- O que entra no MVP
- O que não entra (lista explícita, sem justificativas longas)
- Hipótese que o teste pretende validar
- Métricas de validação: taxa de conclusão do quiz, distribuição das três intenções, nota média de feedback, taxa de consentimento para contato
- Perfil dos participantes do teste controlado
- Definição de pronto para a fase de teste

---

### 6.2 `docs/QUIZ_CONTENT.md`

Este documento define a **estrutura** do conteúdo, não o conteúdo.

Para cada uma das 15 perguntas (16 entradas, contando `q12a` e `q12b`):

- `id` estável (`q01`, `q02`, … `q12a`, `q12b`, … `q15`)
- cômodo
- texto da pergunta (já aprovado, transcreva)
- número de alternativas previsto
- se a pergunta é elegível para gerar eco
- placeholder para cada alternativa

Especifique o **formato do objeto de alternativa** que a Fase 1 vai implementar:

```ts
{
  id: string            // ex: "q05-a3", único em todo o quiz
  label: string         // texto exibido no quiz
  reportEcho: string | null   // devolução em linguagem natural, ou null se neutra
  weights: Partial<Record<Dimension, number>>
  eligibleForEcho: boolean
}
```

Regras a documentar:

- `reportEcho` é escrito em segunda pessoa, sem flexão de gênero, e **não** repete o texto da alternativa literalmente — é uma reformulação natural
- alternativas neutras têm `reportEcho: null` e `eligibleForEcho: false`
- todo `id` é único em todo o quiz
- nenhuma alternativa pode ter `weights` vazio, exceto as neutras
- a pergunta 1 determina qual variante da 12 será exibida
- a pergunta 15 não contribui para pontuação; alimenta o bloco de direção e encerramento

Ao final, uma **tabela de inventário**: quantas alternativas no total, quantos `reportEcho` precisam ser escritos, quantos `label`.

---

### 6.3 `docs/SCORING_MATRIX.md`

- Definição das seis dimensões em uma frase cada (descritiva e operacional, não clínica)
- Como cada pergunta contribui para quais dimensões
- Faixa de pesos permitida e justificativa da escala escolhida
- Como o **mapa principal** é determinado a partir das pontuações
- Como a **dimensão complementar** é determinada
- **Regra obrigatória:** a dimensão complementar não pode ser a mesma que define o eixo do mapa principal
- Regras de desempate, explícitas e ordenadas, sem aleatoriedade
- Como as forças são selecionadas
- Como os pontos de atenção são selecionados
- Formato do `scoreSnapshot` gravado no banco
- Garantia de determinismo: a mesma sequência de respostas sempre produz o mesmo resultado
- Garantia de não-vazio: nenhuma combinação de respostas pode produzir resultado vazio

Casos que a Fase 2 precisará testar, listados aqui:

- perfil predominante de cada um dos quatro mapas
- empate entre dois mapas
- empate entre três ou mais mapas
- todas as respostas neutras
- respostas em extremo baixo
- respostas em extremo alto
- caminho `q12a` e caminho `q12b`

Os pesos ficam como `[PENDENTE · JERUSKA]`. A **estrutura** da matriz e as regras de decisão são sua entrega.

---

### 6.4 `docs/REPORT_COMPOSER.md`

O documento central desta fase. Define o compositor determinístico modular.

#### Famílias de bloco

| # | Família | Variantes necessárias | Orçamento (palavras) |
|---|---|---|---|
| 1 | Abertura | 4 (uma por mapa) | 40–60 |
| 2 | Mapa principal | 4 | 80–110 |
| 3 | Força predominante | 6 (uma por dimensão) | 60–85 |
| 4 | Ponto de atenção | 6 | 60–85 |
| 5 | Dimensão complementar | 6 | 50–75 |
| 6 | Contexto de moradia | conforme alternativas da q01 | 35–55 |
| 7 | Ecos | 0 a 3, vindos das alternativas | 18–26 cada |
| 8 | Como aparece na rotina | 6 | 50–75 |
| 9 | Direção e encerramento (q15) | conforme alternativas da q15 | 50–75 |
| 10 | Convite | 3 (uma por intenção) | 40–65 |
| 11 | Bloco de apoio (condicional) | 1 | 35–55 |
| 12 | Aviso de não-diagnóstico | 1 | 18–30 |

**Verificação aritmética obrigatória.** O documento deve demonstrar o cálculo:

- Mínimo (sem ecos, sem bloco de apoio): soma dos limites inferiores
- Máximo (3 ecos + bloco de apoio): soma dos limites superiores

Os dois extremos devem cair entre **500 e 850 palavras**, com alvo de 500–750. Se a aritmética não fechar, ajuste os orçamentos por família e documente o ajuste — não altere o total.

#### Regras de seleção dos ecos

- Até três ecos, **não necessariamente três**
- **Eco 1:** a resposta elegível de maior contribuição para a dimensão do mapa principal
- **Eco 2:** a resposta elegível de maior contribuição para a dimensão complementar
- **Eco 3:** a resposta elegível vinda do contexto do percurso
- Cômodos distintos são **preferidos**, mas relevância tem prioridade sobre distinção
- Desempate por ordem crescente de `id` de pergunta
- Alternativas com `eligibleForEcho: false` nunca são selecionadas
- O compositor funciona com zero, um, dois ou três ecos
- **Proibido inventar, duplicar ou substituir conteúdo para completar quantidade**

#### Regras de redação dos blocos

- Cada bloco é **autossuficiente** — nenhuma referência a texto anterior ("como vimos", "além disso", "essa mesma sensação", "por isso")
- Qualquer bloco pode aparecer ao lado de qualquer outro
- Segunda pessoa, sem flexões de gênero
- Sem numeração de questões — a contextualização é sempre pelo cômodo: "Na sala, você marcou que…", "No quarto, você contou que…"

#### Bloco de apoio

- Condição de ativação: combinação de respostas em extremo baixo nas perguntas sobre limites, ser ouvido e evitação — critério exato `[PENDENTE · JERUSKA]`
- Quando ativado, **prevalece sobre o CTA comercial**: o convite para conversar com a Jeruska é suprimido ou reduzido, e o bloco de apoio ocupa a posição de destaque
- Conteúdo `[PENDENTE · JERUSKA]`: acolhimento breve e canais de apoio públicos
- Nunca alarmista, nunca acusatório, nunca interpretativo

#### Ordem de montagem

Documente a sequência fixa dos blocos no relatório final e onde cada eco é inserido.

#### Inventário

Tabela final com o total de blocos a escrever, somando todas as famílias e variantes.

---

### 6.5 `docs/LANGUAGE_RULES.md`

#### Construções permitidas

- "suas respostas sugerem…"
- "isso pode aparecer…"
- "talvez valha observar…"
- "você marcou que…"
- "este tema pode ser aprofundado…"

#### Proibido

- afirmação de origem ou causalidade
- interpretação de conteúdo inconsciente
- diagnóstico, hipótese diagnóstica ou nomeação de quadro
- rótulos de personalidade, de traço ou de "trava"
- definição de propósito de vida
- prescrição de ações terapêuticas
- construções "você é…" e "isso aconteceu porque…"
- urgência, escassez, cronômetro, "não feche esta página"
- comparação social ou ranking
- exibição de pontuação interna
- os termos: diagnóstico, análise, nível, índice, teste psicológico, trauma, inconsciente, transtorno, sintoma, patologia, cura

#### Especificação do linter

Documente um verificador automatizado com as seguintes características:

- **Escopo:** apenas os diretórios de conteúdo apresentado à participante. Não inspeciona código, testes, documentação interna ou o payload enviado à psicóloga.
- **Padrões causais completos**, não palavras isoladas. A palavra "porque" sozinha não é infração; "isso acontece porque você", "a origem disso está", "isso significa que você" são.
- **Construções de identidade:** "você é" seguido de adjetivo ou substantivo.
- **Termos proibidos:** lista acima, com correspondência de palavra inteira.
- **Flexões de gênero:** particípios e adjetivos femininos ou masculinos aplicados à participante.
- **Falha o build** quando encontra ocorrência.
- Mecanismo de exceção documentado e explícito, para os casos em que um termo aparece legitimamente (por exemplo, o aviso de não-diagnóstico precisa conter a palavra "diagnóstico").

#### Validações estruturais

Além do linter de linguagem, especifique validações que rodam sobre a configuração:

- IDs duplicados em perguntas, alternativas ou blocos
- ecos incompatíveis com o cômodo que declaram
- blocos vazios ou fora do orçamento de palavras
- referências contextuais proibidas dentro de blocos
- flexões de gênero
- repetição do mesmo bloco em um único relatório
- alternativa com `reportEcho` preenchido mas `eligibleForEcho: false`, e vice-versa
- dimensão complementar igual ao eixo principal

---

### 6.6 `docs/FINAL_SEQUENCE.md`

As oito telas após a última pergunta. Para cada uma: objetivo, conteúdo, comportamento, o que é proibido.

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

Pontos obrigatórios:

- **Tela 1** é a única animação do fluxo. O resultado já está calculado antes de a animação começar. Sem chamada externa durante a animação. Respeita `prefers-reduced-motion`.
- **Tela 2** revela o nome do mapa e uma frase. Não antecipa forças, pontos de atenção, dimensão complementar nem reflexão.
- **Tela 3** grava `intencao_terapia`. Nenhuma alternativa extrema ou de compromisso heroico.
- **Tela 4** apresenta duas colunas. A coluna "refletir no seu tempo" descreve um caminho **legítimo**, não um déficit. Proibido vermelho contra verde. Proibido termo depreciativo. Proibido prometer cura, solução ou resultado.
- **Tela 5** substitui a segunda animação do modelo de referência. Estática, curta, com botão.
- **Tela 6** — nome obrigatório; WhatsApp obrigatório apenas se a participante autorizar o contato. Dois consentimentos separados, **nenhum pré-marcado**. Mensagem de confiança verdadeira: os dados só vão para a psicóloga mediante autorização. CTA não usa a palavra "análise".
- **Tela 7** abre com o nome da participante e um reconhecimento, não com uma constatação de falta.
- **Tela 8** — nota de 1 a 5 e comentário opcional de até 500 caracteres. O feedback nunca altera o resultado.

As telas 2, 3, 4 e 5 não conhecem o nome da participante — ele só é coletado na tela 6.

A barra de progresso continua avançando até a tela 6. A navegação para trás permanece disponível em todas as telas.

Textos finais das telas: `[PENDENTE · JERUSKA]`.

---

### 6.7 `docs/DATA_MODEL.md`

Tabela única. Documente cada coluna com tipo, obrigatoriedade e finalidade.

```
quiz_response
  id                    uuid
  token                 text unique
  quiz_versao           text
  nome                  text
  whatsapp              text null
  consentiu_tratamento  boolean
  consentiu_contato     boolean
  consentimento_versao  text
  consentido_em         timestamptz
  respostas             jsonb
  resultado             jsonb
  intencao_terapia      text
  envio_status          text
  envio_erro            text null
  enviado_em            timestamptz null
  feedback_nota         int null
  feedback_texto        text null
  criado_em             timestamptz
  atualizado_em         timestamptz
```

`envio_status` ∈ `nao_autorizado` | `pendente` | `enviado` | `erro`

Especifique também:

- geração do `token`: longo, imprevisível, não sequencial, sem dado pessoal
- estrutura do JSON de `respostas` e de `resultado`
- schema do Supabase separado do `public`, para não expor a tabela na Data API
- RLS ligada, sem policies, acesso exclusivo pelo servidor
- índices necessários

---

### 6.8 `docs/PRIVACY_RULES.md`

- Texto do consentimento obrigatório (tratamento das respostas) — `[PENDENTE · JERUSKA]`
- Texto do consentimento opcional (compartilhamento com a psicóloga) — `[PENDENTE · JERUSKA]`
- Versionamento dos textos de consentimento
- Nenhum consentimento pré-marcado
- Dados coletados e finalidade de cada um
- Prazo de retenção com número de dias — `[PENDENTE · ALEXANDRE]`
- Fluxo de exclusão a pedido da participante
- O que nunca entra em log: respostas completas, nome, telefone
- Regra de acesso ao resultado: o token protege, e o relatório de uma participante nunca é acessível a partir do de outra
- Nota de que a definição final de base legal e retenção deve passar por orientação jurídica

---

### 6.9 `docs/DELIVERY_CONTRACT.md`

Envio do resumo à psicóloga via Evolution API, chamado diretamente do servidor.

- Condição de disparo: `consentiu_contato = true`
- Sem consentimento: `envio_status = nao_autorizado`, nenhum disparo
- Conteúdo da mensagem: primeiro nome, contato, mapa principal, dimensão complementar, intenção declarada, o que ela busca (q15), data, link do relatório
- **Nunca enviar:** pontuação interna, respostas individuais, adjetivo interpretativo, qualquer conteúdo que induza conclusão profissional
- Ordem obrigatória: gravar no banco → responder ao cliente → disparar envio. Falha no envio nunca bloqueia o resultado
- Idempotência: um resultado gera no máximo um envio
- Tratamento de erro: registrar `envio_erro`, permitir reenvio manual
- Variáveis de ambiente necessárias, nenhuma com prefixo público
- Cabeçalho secreto adicional além da chave da API

---

## 7. CRITÉRIOS DE ACEITE

- Os nove documentos existem em `docs/` e nada além disso foi criado
- Nenhuma linha de código, nenhum `package.json`, nenhuma dependência instalada
- Nenhum conteúdo psicológico inventado; todo conteúdo pendente está marcado com a convenção da seção 4
- A aritmética do orçamento de palavras fecha nos dois extremos e está demonstrada no documento
- Todo `id` proposto é único e estável
- As regras de desempate são determinísticas e não dependem de aleatoriedade ou de ordem de iteração
- A dimensão complementar nunca coincide com o eixo principal
- O bloco de apoio prevalece sobre o CTA quando acionado
- O inventário final soma corretamente quantos textos precisam ser escritos
- Os documentos estão em português do Brasil, em prosa direta, sem enfeite

---

## 8. ENTREGA

Ao terminar:

1. Liste os arquivos criados com a contagem de linhas de cada um
2. Apresente o inventário consolidado: total de `label`, total de `reportEcho`, total de blocos de relatório, total de textos de tela
3. Liste todos os itens `[PENDENTE · JERUSKA]` e `[PENDENTE · ALEXANDRE]` agrupados por documento
4. Aponte qualquer ambiguidade que você encontrou nesta especificação e resolveu por conta própria, com a decisão que tomou
5. Não faça commit. Aguarde revisão.

**Não avance para a Fase 1.**

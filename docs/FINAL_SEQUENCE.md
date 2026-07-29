# FINAL_SEQUENCE — Casa com Alma

> O percurso completo fora das 15 perguntas: a tela de entrada antes de `q01` e as
> oito telas depois da última pergunta. Para cada uma: objetivo, conteúdo,
> comportamento, o que é proibido.
> Este documento é especificação, não implementação.
>
> **Revisão 1:** este documento deixou de cobrir apenas as telas finais e passou a
> cobrir o percurso completo — a Tela 0 (§2) foi adicionada antes das 15 perguntas.
> O arquivo não foi renomeado. Além disso: a tela 6 muda o objeto do consentimento
> obrigatório (§4), e a tela 7 ganha uma nota sobre validade do link (§10).
>
> **Revisão 2:** decisão sobre a imagem da Tela 0 registrada como refinamento de
> homologação (§2.4.1), com direções candidatas a avaliar na Vercel; a lista de
> cinco textos da Tela 0 fechada com redação exata (§2.8); retenção sem os termos
> "permanente", "definitivo" ou "para sempre" (tela 7, §10). Total de textos de
> tela permanece 23 — nenhuma mudança de contagem.
>
> **Fechamento:** a decisão de imagem deixou de usar um terceiro marcador de
> pendência — uma revisão intermediária desta especificação chegou a introduzir um
> marcador de homologação em campo, hoje removido. A convenção do projeto tem
> exatamente dois marcadores: `[PENDENTE · JERUSKA]` e `[PENDENTE · ALEXANDRE]`.
> Refinamento de homologação agora é uma categoria própria, sem marcador inline,
> listada em `MVP_SCOPE.md`.
> Contraste de texto é exceção a essa categoria — ver §2.9 abaixo.

---

## 1. Onde o cálculo acontece (adendo 5.12, sem alteração)

O cálculo do resultado roda **no servidor**, em route handler. O `POST` acontece ao
submeter `q15` — a última pergunta do quiz, antes da tela 1. A animação da tela 1 só
começa depois de o resultado chegar do servidor. Isso satisfaz "sem chamada externa
durante a animação". A configuração do quiz (pesos, `reportEcho`, blocos) nunca é
importada por componente cliente; o cliente só recebe o objeto de resultado já
montado.

O cálculo, neste momento, **não persiste nada**. A gravação em `quiz_response` só
ocorre no submit da tela 6 (ver `DATA_MODEL.md`).

## 2. Tela 0 — Entrada da experiência (nova)

### 2.1 Não confundir com "Porta de entrada"

**"Tela 0 — Entrada da experiência" não é o mesmo que o cômodo narrativo "Porta de
entrada"**, que corresponde às perguntas `q03` e `q04` (ver `QUIZ_CONTENT.md`). São
coisas distintas: a Tela 0 é a tela de acesso à experiência inteira, antes de
qualquer pergunta; "Porta de entrada" é um cômodo do percurso, duas perguntas depois
do início. A colisão de nomes é provável o suficiente para justificar este aviso
explícito em ambos os documentos que mencionam cômodos ou telas de entrada.

### 2.2 Fluxo

```
Tela 0 → q01 → q02 … q15 → telas 1 a 8 (sequência final, ver §3 em diante)
```

### 2.3 Natureza

A Tela 0 é a tela de entrada de uma experiência acessada por **link compartilhado**
com participantes convidados. **Não é** landing pública, **não é** página de
marketing e **não recebe tráfego**. A seção 2 da especificação original estabelece
teste com usuários controlados, sem tráfego pago e sem indexação; a seção 5.2 exclui
UTM tracking. Nada na Tela 0 pode contrariar isso.

A Tela 0 carrega `noindex` e `nofollow`.

### 2.4 Conteúdo estrutural

A Tela 0 é a home e a entrada da experiência. Contém estruturalmente:

1. Logotipo Casa com Alma.
2. Título.
3. Subtítulo.
4. Informação de que o percurso possui 15 perguntas.
5. Nota informativa de transparência (ver §4 abaixo — é informativa, não é
   consentimento).
6. CTA para iniciar.
7. Área visual principal.

**Nota sobre o aviso de escopo:** a mensagem "não é teste psicológico, não produz
diagnóstico" continua obrigatória em algum lugar da Tela 0, mas deixou de ser uma
linha própria do inventário nesta revisão — a lista fechada de textos é a do §2.8
(5 itens). O aviso deve ficar contido dentro do subtítulo ou da nota de
transparência (item 3 ou 5 acima), a critério da Jeruska ao escrever; não pode
desaparecer do produto por não ter mais uma linha dedicada no inventário.

### 2.4.1 Área visual — imagem ou ilustração

A área visual aceita imagem, ilustração ou composição editorial relacionada à casa.
É **decorativa e narrativa, não interativa** — não é uma opção selecionável, não
entra no inventário de textos (§2.8), e imagens de pessoas podem existir como
recurso visual, nunca como opção selecionável (ver §2.6).

**Nada sobre a imagem é fechado nesta fase:** imagem definitiva, ilustração
definitiva, enquadramento, estilo gráfico, posição exata, proporção, movimento e
composição responsiva permanecem em aberto. Este item **não usa a convenção de
pendência inline** (`[PENDENTE · JERUSKA]`/`[PENDENTE · ALEXANDRE]`) — é
refinamento a validar em homologação, não conteúdo faltante de um responsável.
Listado em `MVP_SCOPE.md`, seção "Refinamento em homologação".

Direções que poderão ser avaliadas no ambiente de homologação na Vercel, com o quiz
navegável:

- Porta entreaberta.
- Casa com cômodos iluminados.
- Janela recebendo luz.
- Ambiente acolhedor e sofisticado.

`LogoPrincipal.png` e `id_visual.png`, já existentes na raiz do projeto, são
candidatos de partida para a homologação — não uma decisão fechada.

### 2.5 Proibido nesta tela

- Caixa de marcar, aceite ou consentimento versionado de qualquer tipo.
- Pergunta de gênero, botões "sou homem" / "sou mulher", ou qualquer coleta de
  gênero (ver §2.6 — decisão fechada).
- Coleta de qualquer dado da participante.
- Contagem regressiva, cronômetro, escassez ou urgência.
- Promessa de resultado, benefício ou transformação.
- Estimativa de tempo de duração.

### 2.6 Decisão fechada — sem coleta de gênero

Registrada como **fechada**, para não ser reproposta na Fase 3:

- O resultado não varia por gênero.
- Todo o conteúdo é escrito sem flexão de gênero (ver `LANGUAGE_RULES.md`).
- A matriz de pontuação não usa a informação (ver `SCORING_MATRIX.md`).
- Gênero é dado pessoal sensível, e coletá-lo sem finalidade operacional contraria
  `PRIVACY_RULES.md`.

Imagens de pessoas podem existir como recurso visual, nunca como opção selecionável.

### 2.7 Comportamento

- A barra de progresso **não** aparece na Tela 0; ela começa em `q01`.
- Voltar de `q01` retorna à Tela 0 e **preserva** as respostas já dadas.
- Acionar o botão de início a partir da Tela 0 quando já existirem respostas em
  memória **não as apaga**; a participante retoma de onde parou.
- Nenhuma chamada ao servidor acontece na Tela 0.
- Respeita `prefers-reduced-motion`, se houver qualquer transição.

### 2.8 Textos

Cinco textos, todos `[PENDENTE · JERUSKA]` — lista fechada nesta revisão:

1. Título.
2. Subtítulo.
3. Informação de que o percurso possui 15 perguntas.
4. Nota de transparência (conteúdo definido em §4; o aviso de escopo deve estar
   contido aqui ou no subtítulo — ver §2.4).
5. CTA.

A imagem/ilustração principal (§2.4.1) não é texto e não entra nesta contagem — é
refinamento a validar em homologação (`MVP_SCOPE.md`, "Refinamento em
homologação"), não pendência de conteúdo.

### 2.9 Contraste — requisito, não refinamento

**Exceção à lógica de "refinamento em homologação":** contraste tem piso objetivo
(WCAG AA), não é questão de gosto avaliável em campo. **Todo texto apresentado à
participante — em todas as telas, Tela 0 inclusive, e em todos os blocos do
relatório — atende WCAG AA como requisito de aceite**, não como item a refinar
depois de navegável. Tipografia, espaçamento e responsividade permanecem como
refinamento de homologação (`MVP_SCOPE.md`); contraste não.

## 3. Tabela das oito telas finais (sem alteração de numeração)

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
tela 6. A barra de progresso continua avançando de `q01` até a tela 6 (não aparece
na Tela 0, ver §2.7).

## 4. A nota de transparência não é consentimento

A nota de transparência da Tela 0 (item 4 de §2.8) é **informativa**: sem caixa de
marcar, sem versionamento próprio, sem coluna no banco. Ela informa, em linguagem
direta:

- As respostas são processadas para montar o resultado.
- Nada é armazenado antes da etapa final (tela 6).
- A participante decide, no fim, se quer guardar o resultado e se quer autorizar
  contato.

Texto: `[PENDENTE · JERUSKA]`.

### 4.1 Mudança de objeto do consentimento obrigatório (tela 6)

O consentimento obrigatório da tela 6 (`consentiu_tratamento`) muda de objeto nesta
revisão: passa a autorizar o **armazenamento** das respostas e do resultado, e a
criação do acesso individual em `/r/[token]`. Ele **não** afirma que autoriza um
processamento que já ocorreu (o cálculo já rodou no servidor antes da tela 1 — ver
§1). O texto precisa refletir essa ordem real dos eventos, não descrevê-la de forma
invertida.

O consentimento opcional (compartilhamento com a psicóloga, `consentiu_contato`)
**não muda**.

Continuam sendo **dois** consentimentos versionados, nenhum pré-marcado (ver
`PRIVACY_RULES.md` para os textos e o versionamento).

## 5. Tela 1 — Processamento

- **Objetivo:** transição visual enquanto o resultado (já calculado, ver §1) é
  preparado para exibição.
- **Conteúdo:** `[PENDENTE · JERUSKA]` — 1 texto (mensagem de espera/processamento),
  genérico, não específico por mapa.
- **Comportamento:** única animação do fluxo (ver §12 sobre a proibição da segunda
  animação). Duração de 3 a 5 segundos. Respeita `prefers-reduced-motion`.
- **Proibido:** qualquer chamada externa durante a animação; qualquer conteúdo
  específico de mapa, força, atenção ou dimensão complementar.

## 6. Tela 2 — Prévia do mapa

- **Objetivo:** revelar o nome do mapa e uma frase curta, sem antecipar o restante do
  relatório.
- **Conteúdo:** nome do mapa (vem da configuração de mapas, não é um novo texto) + uma
  frase por mapa. `[PENDENTE · JERUSKA]` — 4 variantes (uma por mapa). Esta frase é a
  mesma coisa que "as descrições dos quatro mapas" citadas na seção 4 de proibições
  da especificação original — não há um segundo lugar para elas.
- **Comportamento:** estática.
- **Proibido:** antecipar forças, pontos de atenção, dimensão complementar ou
  qualquer reflexão aprofundada.

## 7. Tela 3 — Intenção

- **Objetivo:** coletar `intencao_terapia`.
- **Conteúdo:** `[PENDENTE · JERUSKA]` — 1 texto de pergunta + 3 labels de opção (uma
  por intenção: `explorando`, `considerando`, `pronto_para_conversar`). Total: 4
  textos.
- **Comportamento:** interativa, grava `intencao_terapia` na resposta em memória
  (persistência só na tela 6).
- **Proibido:** nenhuma alternativa extrema ou de compromisso heroico.

## 8. Tela 4 — Ponte para a terapia

- **Objetivo:** apresentar dois caminhos igualmente legítimos.
- **Conteúdo:** `[PENDENTE · JERUSKA]` — 1 texto de cabeçalho + 2 textos de coluna
  ("refletir no seu tempo" e a coluna de conversar com a psicóloga). Total: 3 textos.
- **Comportamento:** estática, duas colunas.
- **Proibido:** a coluna "refletir no seu tempo" descrever um caminho como déficit.
  Proibido vermelho contra verde. Proibido termo depreciativo. Proibido prometer
  cura, solução ou resultado.

## 9. Tela 5 — Mapa pronto

- **Objetivo:** transição curta antes da captura, substituindo a segunda animação do
  modelo de referência.
- **Conteúdo:** `[PENDENTE · JERUSKA]` — 1 texto + 1 label de botão. Total: 2 textos.
- **Comportamento:** estática, curta, com botão.
- **Proibido:** qualquer segunda animação (ver §12).

## 10. Tela 6 — Captura e consentimentos

- **Objetivo:** coletar nome, WhatsApp (opcional) e os dois consentimentos.
- **Conteúdo:** nome obrigatório; WhatsApp obrigatório **apenas** se a participante
  autorizar o contato. Dois consentimentos separados, **nenhum pré-marcado** — os
  textos são inventariados em `PRIVACY_RULES.md`, não aqui. Ver §4.1 para a mudança
  de objeto do consentimento obrigatório. Além dos consentimentos:
  `[PENDENTE · JERUSKA]` — 1 texto de mensagem de confiança. Total nesta tela, fora
  os consentimentos: 1 texto.
- **Comportamento:** formulário. Navegação para trás disponível **até** o submit (ver
  adendo 5.14). Após o submit, o fluxo é somente leitura.
- **Proibido:** qualquer consentimento pré-marcado. CTA não usa a palavra "análise".

## 11. Tela 7 — Resultado completo (`/r/[token]`)

- **Objetivo:** apresentar o relatório completo.
- **Conteúdo:** abre com o nome da participante e um reconhecimento — não uma
  constatação de falta. `[PENDENTE · JERUSKA]` — 1 texto de reconhecimento/abertura
  de tela (distinto do bloco "Abertura" da família 1 do `REPORT_COMPOSER.md`, que é
  específico por mapa; genérico — ver nota da versão anterior deste documento).
  **Novo nesta revisão:** a tela informa à participante que o link tem validade,
  vinculada ao prazo de retenção (ver `PRIVACY_RULES.md` §5). `[PENDENTE · JERUSKA]`
  — 1 texto de nota de validade do link. Total nesta tela: 2 textos.
- **Comportamento:** o resultado é imutável; nenhuma navegação para trás a partir
  desta tela. O link permanece estável durante todo o período de retenção — ver
  `PRIVACY_RULES.md` §5 e `DATA_MODEL.md`.
- **Proibido:** tudo o que já é proibido nos blocos do relatório (ver
  `LANGUAGE_RULES.md`); usar os termos "permanente", "definitivo" ou "para sempre"
  para descrever o armazenamento (fechado na Revisão 2, ver `PRIVACY_RULES.md` §5).

## 12. Tela 8 — Feedback

- **Objetivo:** coletar nota de 1 a 5 e comentário opcional.
- **Conteúdo:** `[PENDENTE · JERUSKA]` — 1 texto de pergunta de feedback. Total: 1
  texto.
- **Comportamento:** interativa. Comentário opcional de até 500 caracteres. O
  feedback **nunca** altera o resultado já calculado e gravado.
- **Proibido:** qualquer alteração retroativa do resultado a partir do feedback.

## 13. Navegação para trás (adendo 5.14, sem alteração)

- Tela 0: ver §2.7 — não tem "voltar" no sentido tradicional; é o ponto de entrada.
- Telas do quiz (`q01`–`q15`) e telas 1 a 5: navegação livre para trás.
- Voltar ao quiz após a tela 1 invalida o resultado calculado e força novo cálculo ao
  reavançar. O determinismo garante o mesmo resultado se nenhuma resposta mudar.
- Tela 6: navegação para trás disponível **até** o submit.
- Após o submit da tela 6, o fluxo é somente leitura. Telas 7 e 8 não oferecem
  voltar. O resultado em `/r/[token]` é imutável durante o período de retenção.

## 14. Proibição da segunda animação

Tela 1 é a única animação do fluxo. Tela 5 substitui o que seria uma segunda
animação — ela é estática, curta, com botão. A Tela 0 pode ter transições leves
(§2.7), nunca uma animação de carregamento/processamento. Nenhuma outra tela pode
introduzir uma.

## 15. Inventário de textos de tela

| Tela | Textos a escrever |
|---|---|
| 0. Entrada da experiência (nova) | 5 |
| 1. Processamento | 1 |
| 2. Prévia do mapa | 4 (uma por mapa) |
| 3. Intenção | 4 (1 pergunta + 3 labels) |
| 4. Ponte para a terapia | 3 (1 cabeçalho + 2 colunas) |
| 5. Mapa pronto | 2 (1 texto + 1 label de botão) |
| 6. Captura e consentimentos | 1 (mensagem de confiança; consentimentos em `PRIVACY_RULES.md`) |
| 7. Resultado completo | 2 (reconhecimento + nota de validade do link — nova) |
| 8. Feedback | 1 |
| **Total** | **23** |

Subiu de 17 (Fase 0) para 23: +5 pela Tela 0, +1 pela nota de validade do link na
tela 7 (consequência da retenção fechada em `PRIVACY_RULES.md` §5). Este total não
inclui os dois textos de consentimento (`PRIVACY_RULES.md`) nem os blocos do
relatório (`REPORT_COMPOSER.md`). Ver `CONTENT_KIT.md` para o consolidado final.

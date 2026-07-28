# MVP_SCOPE — Casa com Alma

> Escopo do MVP de validação: o que entra, o que fica fora, hipótese e métricas de teste.
> Este documento é especificação, não implementação.

---

## 1. Descrição do produto (≤200 palavras)

Casa com Alma é uma experiência web de 15 perguntas fechadas (16 entradas, contando as
duas variantes da pergunta 12), organizada como um percurso pelos cômodos de uma casa.
Ao final, a participante recebe um relatório visual determinístico, calculado no
servidor a partir de regras fixas, que reflete o que as respostas dela sugerem sobre o
momento de vida atual. O relatório aponta um entre quatro mapas laterais — sem
hierarquia, gravidade ou progressão entre eles —, uma força predominante, um ponto de
atenção e uma dimensão complementar, todos derivados de seis dimensões fixas. A
participante declara uma entre três intenções em relação a iniciar terapia, e pode optar
por autorizar o contato da psicóloga Jeruska Maciel via WhatsApp.

Não há inteligência artificial em nenhuma etapa do cálculo ou da redação do relatório:
todo texto vem de blocos pré-escritos, combinados por regras fixas e testáveis.

O produto não é um teste psicológico, não produz diagnóstico e não substitui avaliação
profissional. Toda a linguagem da experiência reflete essa limitação.

Este MVP é um teste de validação com usuários controlados: sem tráfego pago, sem
indexação pública, com público convidado.

*(≈195 palavras)*

---

## 2. O que entra no MVP

- As 15 perguntas aprovadas (16 entradas com `q12a`/`q12b`), fechadas, sem campo de
  texto livre.
- Cálculo determinístico do resultado no servidor: mapa principal, força predominante,
  ponto de atenção, dimensão complementar, `nivelApoio`.
- Compositor de relatório modular (blocos + ecos), conforme `REPORT_COMPOSER.md`.
- Sequência final de 8 telas, conforme `FINAL_SEQUENCE.md`.
- Captura de nome e, opcionalmente, WhatsApp, mediante dois consentimentos separados
  e não pré-marcados.
- Envio do resumo à psicóloga via Evolution API, apenas mediante consentimento de
  contato.
- Feedback de 1 a 5 com comentário opcional, coletado após o resultado.
- Persistência em Supabase (`quiz_response`), com RLS e sem exposição via Data API.

## 3. O que não entra no MVP

- Inteligência artificial em qualquer etapa do resultado ou da redação.
- Geração de PDF.
- Envio de e-mail.
- Automação via n8n ou qualquer orquestrador externo.
- Painel administrativo.
- Autenticação de usuário.
- Chatbot.
- Editor visual de perguntas.
- Pagamento ou cobrança.
- Multiusuário ou múltiplos quizzes simultâneos.
- Rastreamento de UTM.
- Upload de arquivos.
- Tráfego pago ou indexação em buscadores.
- Tracking de abandono intra-quiz (ver seção 6 sobre a métrica de conclusão).

## 4. Hipótese que o teste pretende validar

Um percurso de 15 perguntas fechadas, organizado como cômodos de uma casa, produz um
relatório que a participante reconhece como relevante para o momento de vida dela — a
ponto de estar disposta a declarar uma intenção em relação a terapia e, em parte dos
casos, autorizar contato com a psicóloga. A hipótese não é sobre precisão clínica: é
sobre se o formato de percurso e relatório é suficientemente reconhecível e respeitoso
para servir como porta de entrada legítima para a Jeruska.

## 5. Métricas de validação

| Métrica | Definição |
|---|---|
| Taxa de conclusão do quiz | `linhas em quiz_response / número de participantes convidados` (ver `PRIVACY_RULES.md` e nota abaixo) |
| Distribuição das três intenções | Contagem de `intencao_terapia` por valor, sobre o total de respostas gravadas |
| Nota média de feedback | Média de `feedback_nota` sobre as respostas que registraram feedback |
| Taxa de consentimento para contato | `consentiu_contato = true` / total de respostas gravadas |

**Nota sobre a taxa de conclusão:** como nada é gravado antes do consentimento da tela 6
(ver `DATA_MODEL.md` e `PRIVACY_RULES.md`), esta métrica mede conclusão **até o
consentimento**, não abandono intra-quiz. Abandono intra-quiz é explicitamente não
observável neste MVP, por decisão de privacidade — não há tracking anônimo, cookie de
sessão persistido ou tabela de eventos. O denominador (número de convidados) vive fora
do sistema, na lista de convidados do teste controlado.

## 6. Perfil dos participantes do teste controlado

Adultos, classe média para cima, predominantemente mulheres, Sul de Minas Gerais.
Participantes são convidados diretamente pela psicóloga ou pela equipe do projeto; não
há captação orgânica ou paga neste MVP.

## 7. Definição de pronto para a fase de teste

O MVP está pronto para o teste controlado quando, cumulativamente:

- As 15 perguntas (16 entradas) estão implementadas com conteúdo real (não placeholder),
  aprovado pela Jeruska.
- O compositor de relatório roda sobre os casos de teste combinatórios de
  `SCORING_MATRIX.md` e `REPORT_COMPOSER.md` sem produzir bloco vazio, bloco fora do
  orçamento de palavras ou bloco repetido.
- O verificador de linguagem de `LANGUAGE_RULES.md` roda sem falhas sobre todo o
  conteúdo apresentado à participante.
- A sequência de 8 telas está implementada com os textos finais aprovados pela Jeruska.
- Os dois consentimentos de `PRIVACY_RULES.md` estão implementados, não pré-marcados, e
  versionados.
- O envio à psicóloga via Evolution API está testado em ambiente controlado, incluindo o
  caminho de erro e o reenvio manual.
- A lista de convidados do teste controlado está definida fora do sistema.

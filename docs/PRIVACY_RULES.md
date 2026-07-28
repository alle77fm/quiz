# PRIVACY_RULES — Casa com Alma

> Consentimentos, dados coletados, retenção, exclusão e regras de acesso ao resultado.
> Este documento é especificação, não implementação. Não substitui orientação
> jurídica.

---

## 1. Textos de consentimento

- **Consentimento obrigatório** (tratamento das respostas, coluna
  `consentiu_tratamento`): `[PENDENTE · JERUSKA]`.
- **Consentimento opcional** (compartilhamento com a psicóloga, coluna
  `consentiu_contato`): `[PENDENTE · JERUSKA]`.

Os dois textos contam para o inventário consolidado de `CONTENT_KIT.md` como 2 textos,
separados dos textos de tela de `FINAL_SEQUENCE.md`.

## 2. Versionamento

- `consentimento_versao` (coluna de `quiz_response`) grava qual versão dos dois textos
  a participante viu e aceitou.
- Qualquer alteração no texto de um dos dois consentimentos exige incrementar essa
  versão. Respostas antigas mantêm a versão que aceitaram — nunca são retroativamente
  associadas a um texto novo.

## 3. Nenhum consentimento pré-marcado

Os dois consentimentos (`consentiu_tratamento` e `consentiu_contato`) são
apresentados como caixas separadas, nenhuma delas marcada por padrão. A participante
precisa marcar cada uma explicitamente. `consentiu_contato = false` é um estado válido
e esperado, não um obstáculo a contornar na interface.

## 4. Dados coletados e finalidade

| Dado | Finalidade |
|---|---|
| `nome` | Identificar a participante no relatório e, se autorizado, no contato com a psicóloga |
| `whatsapp` | Permitir o contato da psicóloga, apenas se `consentiu_contato = true` |
| `respostas` | Calcular o resultado; base para o relatório |
| `resultado` | Exibir o relatório em `/r/[token]`; base para o envio à psicóloga |
| `intencao_terapia` | Selecionar a variante de convite; incluída no envio à psicóloga |
| `feedback_nota` / `feedback_texto` | Medir a métrica de validação do MVP (`MVP_SCOPE.md` §5) |

Nenhum dado é coletado além do necessário para essas finalidades. Não há rastreamento
de UTM, cookies de sessão persistidos ou tabela de eventos (ver adendo 5.13).

## 5. Prazo de retenção

`[PENDENTE · ALEXANDRE]` — número de dias de retenção após o encerramento do teste
controlado. Nenhum prazo foi assumido aqui.

## 6. Fluxo de exclusão a pedido da participante

- Canal: contato direto com a psicóloga ou com a equipe do projeto (não há
  autoatendimento neste MVP, consistente com "sem painel administrativo" de
  `MVP_SCOPE.md`).
- Ação: exclusão física da linha correspondente em `quiz_response`, identificada por
  `token` ou por `nome` + `whatsapp` informados pela solicitante.
- Efeito: o link `/r/[token]` deixa de resolver após a exclusão.

## 7. O que nunca entra em log

- Respostas completas (`respostas`, `resultado`).
- `nome`.
- `whatsapp`.

Logs de aplicação e de erro podem referenciar `id` ou `token` para depuração, mas
nunca o conteúdo das colunas acima. Isso vale também para logs de erro do envio à
psicóloga (`DELIVERY_CONTRACT.md`) — o `envio_erro` registra a natureza do erro de
envio (ex.: código de status da Evolution API), não o conteúdo da mensagem enviada.

## 8. Regra de acesso ao resultado

O `token` protege o acesso: `/r/[token]` só resolve com o token exato, não sequencial
e não adivinhável (ver `DATA_MODEL.md` §4). O relatório de uma participante nunca é
acessível a partir do link ou do estado de outra — não existe listagem, navegação
lateral ou parâmetro incremental que exponha um segundo resultado a partir do
primeiro.

## 9. Nota jurídica

A definição final de base legal (LGPD) e do prazo de retenção do §5 deve passar por
orientação jurídica antes do lançamento além do teste controlado. Este documento
estrutura onde essas decisões se encaixam; não as substitui.

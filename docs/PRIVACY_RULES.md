# PRIVACY_RULES — Casa com Alma

> Consentimentos, dados coletados, retenção, exclusão e regras de acesso ao resultado.
> Este documento é especificação, não implementação. Não substitui orientação
> jurídica.
>
> **Revisão 1:** objeto do consentimento obrigatório mudou (§1.1); retenção fechada
> em 90 dias (§5); decisão fechada de não coletar gênero (§9); nota de transparência
> da Tela 0 registrada como não-consentimento (§2).

---

## 1. Textos de consentimento

### 1.1 Consentimento obrigatório — objeto mudou nesta revisão

Coluna `consentiu_tratamento`. **Antes** desta revisão, o texto autorizava "o
tratamento das respostas". **Agora**, autoriza o **armazenamento** das respostas e do
resultado, e a criação do acesso individual em `/r/[token]`.

O motivo da mudança: o cálculo do resultado roda no servidor **antes** da tela 6 (no
submit de `q15`, ver `FINAL_SEQUENCE.md` §1) e nada é armazenado nesse momento (ver
`DATA_MODEL.md` §7). Um consentimento que dissesse "autorizo o processamento das
minhas respostas" estaria, na prática, pedindo autorização para algo que já
aconteceu. O texto precisa autorizar o que de fato ocorre depois dele: gravar o
resultado e abrir o acesso em `/r/[token]`.

Texto: `[PENDENTE · JERUSKA]`.

### 1.2 Consentimento opcional — sem alteração

Compartilhamento com a psicóloga (`consentiu_contato`). Texto: `[PENDENTE · JERUSKA]`.

Os dois textos contam para o inventário consolidado de `CONTENT_KIT.md` como 2
textos, separados dos textos de tela de `FINAL_SEQUENCE.md`.

## 2. A nota de transparência da Tela 0 não é consentimento

`FINAL_SEQUENCE.md` §2.8 e §4 especificam uma nota de transparência na Tela 0
(entrada da experiência, antes de `q01`). Ela é **informativa**: sem caixa de
marcar, sem versionamento próprio, sem coluna no banco. Não deve ser confundida com
os dois consentimentos desta seção, que são versionados e ocorrem na tela 6.

## 3. Versionamento

- `consentimento_versao` (coluna de `quiz_response`) grava qual versão dos dois
  textos do §1 a participante viu e aceitou na tela 6.
- Qualquer alteração em um dos dois textos exige incrementar essa versão. Respostas
  antigas mantêm a versão que aceitaram — nunca são retroativamente associadas a um
  texto novo.
- A nota de transparência da Tela 0 (§2) **não** tem versão própria, por não ser
  consentimento.

## 4. Nenhum consentimento pré-marcado

Os dois consentimentos (`consentiu_tratamento` e `consentiu_contato`) são
apresentados como caixas separadas na tela 6, nenhuma marcada por padrão. A
participante precisa marcar cada uma explicitamente. `consentiu_contato = false` é
um estado válido e esperado, não um obstáculo a contornar na interface.

## 5. Prazo de retenção — fechado nesta revisão

**90 dias**, contados a partir de `criado_em`.

- Sujeito a revisão jurídica antes do teste controlado (ver §10 — este documento não
  substitui orientação jurídica).
- `/r/[token]` permanece estável e imutável durante todo o período de retenção.
- Ao final dos 90 dias, aplica-se o fluxo de exclusão já documentado no §6.
- **Nunca** usar os termos "permanente", "definitivo" ou "para sempre" em qualquer
  texto voltado à participante para descrever o armazenamento (fechado na Revisão
  2) — ele tem prazo, e a tela 7 informa isso (ver `FINAL_SEQUENCE.md` §11).

## 6. Dados coletados e finalidade

| Dado | Finalidade |
|---|---|
| `nome` | Identificar a participante no relatório e, se autorizado, no contato com a psicóloga |
| `whatsapp` | Permitir o contato da psicóloga, apenas se `consentiu_contato = true` |
| `respostas` | Calcular o resultado; base para o relatório |
| `resultado` | Exibir o relatório em `/r/[token]`; base para o envio à psicóloga |
| `intencao_terapia` | Selecionar a variante de convite; incluída no envio à psicóloga |
| `feedback_nota` / `feedback_texto` | Medir a métrica de validação do MVP (`MVP_SCOPE.md` §5) |

Nenhum dado é coletado além do necessário para essas finalidades. Não há
rastreamento de UTM, cookies de sessão persistidos ou tabela de eventos (ver adendo
5.13). **Gênero não é coletado em nenhuma tela** — ver §9.

## 7. Fluxo de exclusão a pedido da participante

- Canal: contato direto com a psicóloga ou com a equipe do projeto (não há
  autoatendimento neste MVP).
- Ação: exclusão física da linha correspondente em `quiz_response`, identificada por
  `token` ou por `nome` + `whatsapp` informados pela solicitante.
- Efeito: o link `/r/[token]` deixa de resolver após a exclusão.
- Este fluxo também se aplica ao final natural do prazo de retenção do §5 — a
  exclusão ao fim dos 90 dias segue o mesmo procedimento, não um procedimento
  separado.

## 8. O que nunca entra em log

- Respostas completas (`respostas`, `resultado`).
- `nome`.
- `whatsapp`.

Logs de aplicação e de erro podem referenciar `id` ou `token` para depuração, mas
nunca o conteúdo das colunas acima. Isso vale também para logs de erro do envio à
psicóloga (`DELIVERY_CONTRACT.md`).

## 9. Decisão fechada — sem coleta de gênero (Tela 0)

Registrada aqui e em `FINAL_SEQUENCE.md` §2.6, para não ser reproposta na Fase 3:

- O resultado não varia por gênero.
- Todo o conteúdo é escrito sem flexão de gênero (`LANGUAGE_RULES.md`).
- A matriz de pontuação não usa a informação (`SCORING_MATRIX.md`).
- Gênero é dado pessoal sensível; coletá-lo sem finalidade operacional contraria o
  princípio de minimização deste documento (§6 — nenhum dado além do necessário).

Imagens de pessoas podem existir como recurso visual na Tela 0, nunca como opção
selecionável.

## 10. Regra de acesso ao resultado

O `token` protege o acesso: `/r/[token]` só resolve com o token exato, não sequencial
e não adivinhável (ver `DATA_MODEL.md` §4). O relatório de uma participante nunca é
acessível a partir do link ou do estado de outra.

## 11. Nota jurídica

A definição final de base legal (LGPD) e a confirmação do prazo de retenção do §5
devem passar por orientação jurídica antes do lançamento além do teste controlado.
Este documento estrutura onde essas decisões se encaixam; não as substitui.

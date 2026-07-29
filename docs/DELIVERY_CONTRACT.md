# DELIVERY_CONTRACT — Casa com Alma

> Envio do resumo à psicóloga via Evolution API, chamado diretamente do servidor.
> Este documento é especificação, não implementação.
>
> **Revisão 1:** a pendência sobre enviar `nivelApoio` foi fechada — o payload usa
> `leitura_prioritaria` (booleano derivado, §3). Procedimento de reenvio manual
> detalhado (§8.1); forma de execução permanece pendente (§8.2).
>
> **Revisão 2:** forma de execução do reenvio manual **fechada como script**
> (`retry-delivery`, §8.2) — sem endpoint HTTP no MVP. "Classificação emocional"
> acrescentada à lista do que nunca é enviado (§4).

---

## 1. Condição de disparo

- Disparo ocorre **apenas** quando `consentiu_contato = true`.
- Sem consentimento: `envio_status = 'nao_autorizado'`, nenhum disparo é tentado, em
  nenhum momento.

## 2. Conteúdo da mensagem

- Primeiro nome.
- Contato (WhatsApp).
- Mapa principal.
- Dimensão complementar.
- Intenção declarada (`intencao_terapia`).
- O que ela busca (resposta de `q15`).
- Data.
- Link do relatório (`/r/[token]`).

## 3. `leitura_prioritaria` — fechado nesta revisão (substitui a pendência de `nivelApoio`)

**Decidido:** `nivelApoio` **não** é enviado no payload da Evolution API. Em seu
lugar, o payload carrega um campo derivado, booleano:

```
leitura_prioritaria: boolean
```

- `nivelApoio ∈ {0, 1}` → `leitura_prioritaria = false`.
- `nivelApoio = 2` → `leitura_prioritaria = true`.

Quando `leitura_prioritaria = true`, a mensagem acrescenta **apenas** a frase:
"Leitura prioritária recomendada." Nenhum outro texto, número ou explicação
adicional é incluído por causa deste campo.

Isso fecha a pendência anterior (nível numérico de apoio como conteúdo que induz
conclusão profissional): `leitura_prioritaria` não expõe o nível, a pontuação ou o
critério que o gerou — apenas uma recomendação binária de prioridade, que a
psicóloga confirma ou descarta ao abrir o relatório completo pelo link.

## 4. Nunca enviar

- Pontuação interna (`scoreSnapshot`, bruto ou normalizado).
- Respostas individuais (`respostas`), nem as combinações específicas que acionaram
  `leitura_prioritaria`.
- Adjetivo interpretativo.
- A expressão "nível de risco", ou qualquer hipótese ou interpretação sobre a
  participante.
- Classificação emocional de qualquer tipo.
- Qualquer conteúdo que induza conclusão profissional além da frase fixa do §3. A
  prioridade veiculada por `leitura_prioritaria` é operacional, não clínica.

## 5. Ordem obrigatória

```
1. Gravar no banco (quiz_response, submit da tela 6)
2. Responder ao cliente (confirmação de envio bem-sucedido da tela 6)
3. Disparar envio à psicóloga (assíncrono, após a resposta — ver §7)
```

Falha no envio **nunca** bloqueia o resultado — a participante sempre chega à tela 7
independentemente do sucesso do disparo.

## 6. Idempotência

Um resultado gera **no máximo um** envio bem-sucedido. Reenvio manual (§8) não cria um
segundo registro de resultado — reutiliza a mesma linha de `quiz_response`, apenas
reexecutando o disparo.

## 7. Disparo na Vercel — `after()` (adendo 5.15)

O padrão "gravar, responder ao cliente, disparar depois" não pode ser implementado
como uma promise solta: no runtime serverless, a função encerra junto com a resposta e
o envio se perde antes de completar.

- Use `after()` de `next/server` para executar o disparo depois de a resposta ao
  cliente já ter sido enviada.
- **Se `after()` falhar:** `envio_status` permanece `'pendente'` (não `'erro'` —
  `'erro'` é reservado para falha confirmada da própria chamada à Evolution API, não
  para falha de execução do `after()` em si). Registrar a falha em log de servidor
  (sem conteúdo sensível, ver `PRIVACY_RULES.md` §7).
- **Reenvio manual:** consulta no banco por `envio_status IN ('pendente', 'erro')`,
  seguida de nova tentativa de disparo para cada linha encontrada, respeitando a
  idempotência do §6.

## 8. Tratamento de erro

- Erro confirmado da chamada à Evolution API: `envio_status = 'erro'`, `envio_erro`
  preenchido com a natureza do erro (não com dados sensíveis).
- Reenvio manual permitido a qualquer momento após um erro, sem limite de tentativas
  especificado nesta fase.

## 8.1 Procedimento de reenvio manual (detalhado — Revisão 1)

1. **Consulta:** buscar linhas de `quiz_response` com `envio_status IN ('pendente',
   'erro')`.
2. **Verificação obrigatória antes de qualquer reenvio:** confirmar
   `consentiu_contato = true` para cada linha encontrada. Uma linha com
   `envio_status = 'pendente'` ou `'erro'` mas `consentiu_contato = false` não deveria
   existir (contradiz §1), mas a verificação roda de qualquer forma, como defesa —
   nunca disparar sem essa confirmação.
3. **Disparo:** reexecutar o envio à Evolution API com o mesmo payload que seria
   montado normalmente (§2, incluindo `leitura_prioritaria`).
4. **Idempotência:** o reenvio reutiliza a mesma linha de `quiz_response` (§6) — não
   cria um segundo resultado nem uma segunda linha.
5. **Atualização de estado, após cada tentativa:**
   - Sucesso: `envio_status = 'enviado'`, `enviado_em` preenchido com o momento do
     reenvio bem-sucedido.
   - Falha: `envio_status` permanece `'erro'`, `envio_erro` atualizado com a
     natureza do novo erro.

### 8.2 Forma de execução — fechada nesta revisão: script operacional

**Decidido:** o reenvio manual é um **script operacional**, executado
deliberadamente por responsável técnico, com acesso às variáveis de ambiente de
servidor. **Não há endpoint HTTP para reenvio no MVP** — a opção de endpoint
interno, levantada na revisão anterior, foi descartada.

Contrato conceitual do script (nenhum script é criado na Fase 0 — apenas o
contrato da futura implementação):

```
retry-delivery --id <quiz_response_id>
```

E, como possibilidade operacional de lote:

```
retry-delivery --all-pending --dry-run
```

**Regras:**

- Executa somente em ambiente com variáveis de servidor (nunca `NEXT_PUBLIC`).
- Consulta apenas registros com `envio_status` `pendente` ou `erro`.
- Verifica `consentiu_contato = true` antes de qualquer disparo (§8.1, passo 2).
- Mantém idempotência (§6): reutiliza a linha existente, nunca cria uma nova.
- Atualiza `envio_status`, `envio_erro` e `enviado_em` conforme o resultado de cada
  tentativa (§8.1, passo 5).
- **Nunca** imprime, em log ou saída de terminal: respostas completas, `nome` ou
  `whatsapp` (ver `PRIVACY_RULES.md` §8).
- **Nunca** dispara quando `envio_status = 'enviado'` — reforça a idempotência
  também no nível do script, não só no banco.
- Execução em lote (`--all-pending`) **exige** um `--dry-run` anterior. O
  `--dry-run` mostra somente IDs e contagens — nenhum dado pessoal — para o
  operador confirmar o alcance antes de disparar de verdade.

## 9. Variáveis de ambiente

- Nenhuma variável usada por este contrato tem prefixo `NEXT_PUBLIC` — incluindo as do
  Supabase (apenas service role, usada no servidor).
- Necessárias: URL base da Evolution API, chave da API, número/instância de origem do
  disparo.
- **Cabeçalho secreto adicional**, além da chave da API, nas chamadas à Evolution
  API — tanto no disparo automático (§7) quanto no reenvio via script (§8.2) —
  como defesa em profundidade: mesmo que a chave da Evolution API vaze, o
  cabeçalho adicional não é público em nenhum bundle. Não há endpoint HTTP interno
  neste contrato (§8.2, fechado como script) que precise de autenticação própria.

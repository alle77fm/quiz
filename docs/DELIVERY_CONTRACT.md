# DELIVERY_CONTRACT — Casa com Alma

> Envio do resumo à psicóloga via Evolution API, chamado diretamente do servidor.
> Este documento é especificação, não implementação.

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

## 3. `nivelApoio` no envio — pendência, não decisão

`[PENDENTE · ALEXANDRE]` — se `nivelApoio` deve ou não ser incluído no payload
enviado à psicóloga.

**Recomendação registrada, não decisão:** o `DELIVERY_CONTRACT` proíbe enviar
qualquer conteúdo que induza conclusão profissional (§4). Um nível numérico de apoio
é exatamente esse tipo de conteúdo — é, na prática, uma triagem de risco codificada
em número. A recomendação é **não** incluir `nivelApoio` no payload da Evolution API:
o link do relatório já é enviado e já carrega a informação relevante em linguagem
apropriada (a variante de convite e, se presente, o bloco de apoio, ambos sujeitos ao
`LANGUAGE_RULES.md`). A psicóloga acessa o relatório completo pelo link antes de
qualquer contato. Esta é uma recomendação registrada para revisão, não uma decisão
tomada por conta própria.

## 4. Nunca enviar

- Pontuação interna (`scoreSnapshot`, `score(dimensão)`).
- Respostas individuais (`respostas`).
- Adjetivo interpretativo.
- Qualquer conteúdo que induza conclusão profissional — incluindo, pendente decisão do
  §3, possivelmente `nivelApoio`.

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

## 9. Variáveis de ambiente

- Nenhuma variável usada por este contrato tem prefixo `NEXT_PUBLIC` — incluindo as do
  Supabase (apenas service role, usada no servidor).
- Necessárias: URL base da Evolution API, chave da API, número/instância de origem do
  disparo.
- **Cabeçalho secreto adicional**, além da chave da API, para autenticar chamadas ao
  endpoint interno que dispara o envio (defesa em profundidade — mesmo que a chave da
  Evolution API vaze, o cabeçalho adicional não é público em nenhum bundle).

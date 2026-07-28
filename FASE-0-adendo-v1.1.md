# FASE 0 · ADENDO OBRIGATÓRIO v1.1 — Casa com Alma

> **Sumário:** decisões complementares fechadas que a Fase 0 exige mas o prompt
> original não fornece. Este documento é especificação, não implementação.

## Como usar este adendo

Leia primeiro `FASE-0-especificacao-casa-com-alma.md` (o prompt original).

Este adendo **acrescenta** decisões fechadas. Onde houver conflito com o
original, este adendo prevalece. Todas as proibições da seção 4 do original
continuam valendo sem exceção: você não escreve conteúdo psicológico, apenas
estrutura e inventário.

> **Nota de versão:** a seção 5.10 deste documento foi integralmente
> substituída por `FASE-0-adendo-secao-5_10-revisada.md`. Ela permanece aqui
> por rastreabilidade histórica, mas **não é a regra vigente**. Em caso de
> conflito, o arquivo da 5.10 revisada prevalece.

---

## 5.8 Cardinalidade do relatório (fechado)

O relatório final contém EXATAMENTE:

- 1 bloco de força predominante (a dimensão de maior pontuação)
- 1 bloco de ponto de atenção (a dimensão de menor pontuação)
- 1 bloco de dimensão complementar
- 0 a 3 ecos

Nunca dois blocos da mesma família. Documente isso em `REPORT_COMPOSER.md` e
nas validações estruturais de `LANGUAGE_RULES.md`.

---

## 5.9 Orçamento de palavras corrigido (fechado)

Substitua a tabela de orçamento da seção 6.4 do original por esta:

```
  1  Abertura                    4 variantes    45-60
  2  Mapa principal              4 variantes    85-110
  3  Forca predominante          6 variantes    65-85
  4  Ponto de atencao            6 variantes    65-85
  5  Dimensao complementar       6 variantes    55-75
  6  Contexto de moradia         N_q01          38-55
  7  Ecos                        0 a 3          18-26 cada
  8  Como aparece na rotina      6 variantes    55-75
  9  Direcao e encerramento      N_q15          55-75
  10 Convite                     3 variantes    45-65
  11 Bloco de apoio              1 variante     35-55
  12 Aviso de nao-diagnostico    1 variante     20-30
```

> **Atualizado pela 5.10 revisada:** a família 10 passa a ter **quatro**
> variantes, todas com o mesmo orçamento de 45–65 palavras. O orçamento por
> variante não muda; o inventário sim.

Demonstre a aritmética em `REPORT_COMPOSER.md`. Os cenários a demonstrar são
os definidos na seção 5.10.5 do arquivo da 5.10 revisada. Se sua conta
divergir, refaça a conta antes de alterar qualquer número, e reporte a
divergência.

---

## 5.10 Bloco de apoio × convite — REVOGADA

> **Esta seção foi integralmente substituída** por
> `FASE-0-adendo-secao-5_10-revisada.md`, que define três níveis de
> acionamento e mantém o convite presente em todos eles.
>
> A regra revogada dizia que o bloco de apoio suprimia a família 10. **Não
> siga essa regra.** O texto original foi removido para evitar leitura
> acidental.

---

## 5.11 Número de alternativas (fechado)

Padrão: **4 alternativas por pergunta**.

Exceções a confirmar: `q01` e `q15`.

Marque `N_q01` e `N_q15` como `[PENDENTE · ALEXANDRE]`, mas produza o
inventário de forma **paramétrica**: apresente a fórmula e a tabela preenchida
com `N_q01 = 4` e `N_q15 = 4` como hipótese de trabalho, sinalizada como
hipótese.

`q01` deve conter pelo menos uma alternativa que caracterize morar sozinha e
pelo menos uma que caracterize morar acompanhada, para alimentar a bifurcação
`q12a` / `q12b`. Documente o mapa alternativa-de-q01 → variante-de-q12 como
tabela vazia com placeholders.

---

## 5.12 Onde o resultado é calculado (fechado)

O cálculo roda **no servidor**, em route handler. A configuração do quiz
(pesos, `reportEcho`, blocos) nunca é importada por componente cliente. O
cliente envia o vetor de respostas e recebe o objeto de resultado já montado.
Isso mantém a matriz da psicóloga fora do bundle público.

Consequência para a tela 1: o POST acontece ao submeter a `q15`; a animação só
começa depois da resposta chegar. Isso satisfaz "sem chamada externa durante a
animação" do original.

Documente em `DATA_MODEL.md`: o cálculo **não persiste nada**. A gravação só
ocorre no submit da tela 6.

---

## 5.13 Métrica de conclusão (fechado)

Nada é gravado antes do consentimento da tela 6. Não existe tracking anônimo,
cookie de sessão persistido ou tabela de eventos.

A taxa de conclusão do teste controlado é medida como:

```
linhas em quiz_response / numero de participantes convidados
```

O denominador vive fora do sistema, na lista de convidados.

Registre em `MVP_SCOPE.md` que essa métrica mede conclusão **até o
consentimento**, não abandono intra-quiz, e que abandono intra-quiz é
explicitamente não observável neste MVP por decisão de privacidade.

---

## 5.14 Navegação para trás (fechado)

- Telas do quiz (`q01` a `q15`) e telas 1 a 5: navegação livre para trás.
- Voltar ao quiz após a tela 1 invalida o resultado calculado e força novo
  cálculo ao reavançar. O determinismo garante o mesmo resultado se nenhuma
  resposta mudar.
- Tela 6: navegação para trás disponível **até** o submit.
- Após o submit da tela 6, o fluxo é somente leitura. Telas 7 e 8 não oferecem
  voltar. O resultado em `/r/[token]` é imutável.

Isso preserva a idempotência do envio: um resultado, no máximo um disparo.
Documente em `FINAL_SEQUENCE.md` e em `DELIVERY_CONTRACT.md`.

---

## 5.15 Disparo do WhatsApp na Vercel (fechado)

O padrão "gravar, responder ao cliente, disparar depois" não pode ser
implementado como promise solta: no runtime serverless a função encerra junto
com a resposta e o envio se perde.

Especifique em `DELIVERY_CONTRACT.md` o uso de `after()` de `next/server` para
executar o disparo após a resposta. Documente:

- comportamento esperado se `after()` falhar
- que `envio_status` permanece `pendente` nesse caso
- o procedimento de reenvio manual (query no banco por `pendente` + `erro`)
- que nenhuma variável de ambiente usa prefixo `NEXT_PUBLIC`, incluindo as do
  Supabase (apenas service role no servidor)

---

## 5.16 Entrega adicional

Além dos nove documentos, produza `docs/CONTENT_KIT.md`: um checklist de
escrita para a psicóloga, agrupado por família de bloco, com contagem, limite
de palavras por item, e as regras de linguagem aplicáveis a cada grupo. Sem
nenhum texto de exemplo.

Este documento é o que ela recebe para começar a escrever.

São **dez documentos**, portanto. Reporte dez arquivos na entrega.

---

## Critérios de aceite adicionais

- Os cenários de aritmética estão demonstrados e batem
- O inventário é paramétrico em `N_q01` e `N_q15`, e a fórmula aparece
- `CONTENT_KIT.md` soma o mesmo total que o inventário de `QUIZ_CONTENT.md` e
  `REPORT_COMPOSER.md`
- Nenhum documento assume que o cálculo roda no cliente
- Não faça commit. Aguarde revisão.

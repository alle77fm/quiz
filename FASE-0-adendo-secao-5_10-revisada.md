# FASE 0 · SUBSTITUIÇÃO DA SEÇÃO 5.10
## Casa com Alma — bloco de apoio em três níveis

> **Como usar:** esta seção substitui integralmente a seção 5.10 do
> `FASE-0-adendo-v1.1.md`. Onde houver conflito com o adendo ou com o
> prompt original, esta seção prevalece. Todas as demais seções do
> adendo permanecem válidas, incluindo a proibição de escrever conteúdo
> psicológico — aqui você define estrutura e inventário, não texto.

---

## 5.10 Bloco de apoio e convite (fechado)

### 5.10.1 Três níveis de acionamento

O relatório opera em um de três níveis, determinados exclusivamente pelo
motor a partir das respostas. O nível é registrado no resultado como
`nivelApoio: 0 | 1 | 2`.

| Nível | Condição | Bloco de apoio | Convite |
|---|---|---|---|
| 0 | Percurso normal | Ausente | Família 10, variante da intenção declarada |
| 1 | Sofrimento declarado / alta necessidade | Presente | Família 10, variante da intenção declarada |
| 2 | Indício de risco específico | Presente | Família 10, variante `acolhimento` |

O nível 1 **não reduz** o convite. É onde a necessidade declarada e o
valor do encaminhamento coincidem, e a variante correspondente à
intenção `pronto_para_conversar` é a mais direta das quatro.

O nível 2 **não suprime o caminho até a psicóloga**. Substitui a
linguagem de conversão por linguagem de disponibilidade. A psicóloga
continua nomeada e continua acessível.

### 5.10.2 Critérios de acionamento

**Nível 1** — combinação de pontuação em faixa baixa nas dimensões de
acolhimento, limites e autocuidado. Limiar exato:
`[PENDENTE · JERUSKA]`.

**Nível 2** — combinações específicas e nomeadas de alternativas, não
faixa de pontuação. Cada combinação é listada explicitamente na
configuração. Definição: `[PENDENTE · JERUSKA]`.

> **Restrição de desenho:** o critério do nível 2 é deliberadamente
> estreito. Um critério largo captura participantes que apenas
> atravessam um período difícil, o que produz duas perdas — a pessoa
> recebe um enquadramento que não corresponde à situação dela, e um
> encaminhamento legítimo é descaracterizado. Documente em
> `REPORT_COMPOSER.md` que o nível 2 é exceção, não faixa.

Se o nível 2 for acionado, o nível 1 não é avaliado — os níveis são
mutuamente exclusivos e avaliados em ordem decrescente.

### 5.10.3 Família 10 — quatro variantes

A família Convite passa de três para **quatro** variantes:

| Variante | Chave | Usada quando |
|---|---|---|
| 1 | `explorando` | Níveis 0 e 1 |
| 2 | `considerando` | Níveis 0 e 1 |
| 3 | `pronto_para_conversar` | Níveis 0 e 1 |
| 4 | `acolhimento` | Nível 2, independentemente da intenção |

Orçamento de todas as quatro: **45–65 palavras**.

Exatamente uma variante é renderizada em qualquer relatório. Nunca zero,
nunca duas.

Regras aplicáveis à variante `acolhimento`, a documentar em
`LANGUAGE_RULES.md`:

- sem linguagem de conversão, oferta, urgência ou benefício
- sem verbo de ação comercial ("agende", "garanta", "aproveite")
- nomeia a psicóloga e informa disponibilidade
- mesmo registro de tom do bloco de apoio
- sujeita ao verificador de linguagem como qualquer outro bloco

### 5.10.4 Ordem de montagem

Nos níveis 1 e 2, o bloco de apoio ocupa a posição imediatamente
anterior ao convite:

```
… → direção e encerramento → [bloco de apoio] → convite → aviso de escopo
```

No nível 0 a sequência é a mesma sem o bloco de apoio.

### 5.10.5 Impacto aritmético

Recalcule os cenários da seção 5.9 do adendo incluindo o nível 2. Como a
variante `acolhimento` ocupa a mesma faixa de orçamento das outras três,
os totais não se alteram:

- **Mínimo** (nível 0, sem ecos): 528
- **Máximo nível 0** (3 ecos): 793
- **Máximo nível 1** (3 ecos + apoio): 848
- **Máximo nível 2** (3 ecos + apoio + acolhimento): 848

Os quatro cenários devem ser demonstrados em `REPORT_COMPOSER.md`. O
máximo de 848 encosta no teto de 850 — registre isso como restrição
ativa: qualquer aumento futuro de orçamento em qualquer família exige
recalcular os quatro cenários antes.

### 5.10.6 Impacto no inventário

`CONTENT_KIT.md` e `REPORT_COMPOSER.md` passam a contar **quatro**
blocos na família 10, não três. Some um bloco ao total consolidado e
verifique que os dois documentos permanecem coincidentes.

### 5.10.7 Validações adicionais

Acrescente às validações estruturais de `LANGUAGE_RULES.md`:

- `nivelApoio` sempre presente no resultado, com valor 0, 1 ou 2
- nível 2 implica variante `acolhimento`; qualquer outra combinação
  falha o build
- níveis 1 e 2 implicam bloco de apoio presente
- nível 0 implica bloco de apoio ausente
- exatamente uma variante da família 10 por relatório
- variante `acolhimento` livre de verbo de ação comercial, conforme
  lista definida no verificador

### 5.10.8 Cobertura de teste

Acrescente aos testes combinatórios da Fase 2:

- cada perfil × cada nível de apoio
- nível 2 com cada uma das três intenções declaradas, verificando que
  todas produzem a variante `acolhimento`
- transição de nível quando uma única resposta muda
- confirmação de que os quatro cenários de palavras permanecem no
  intervalo em todas as combinações

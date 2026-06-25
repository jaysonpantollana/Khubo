---
name: leiloeiro-mercado
description: "Use when working with leiloeiro-mercado"
---

---
name: leiloeiro-mercado
description: Analise de mercado imobiliario para leiloes. Liquidez, desagio tipico, ROI, estrategias de saida (flip/reforma/renda), Selic 2025 e benchmark CDI/FII.
risk: safe
source: community
date_added: '2026-03-06'
author: renat
tags:
- market-analysis
- real-estate
- roi
- brazilian
tools:
- claude-code
- antigravity
- cursor
- gemini-cli
- codex-cli
---

# SKILL DE MERCADO â€” ANALISTA DE ATIVOS IMOBILIÃRIOS EM LEILÃƒO

## Overview

Analise de mercado imobiliario para leiloes. Liquidez, desagio tipico, ROI, estrategias de saida (flip/reforma/renda), Selic 2025 e benchmark CDI/FII.

## When to Use This Skill

- When the user mentions "mercado leilao imovel" or related topics
- When the user mentions "roi leilao" or related topics
- When the user mentions "liquidez imovel leilao" or related topics
- When the user mentions "desagio leilao" or related topics
- When the user mentions "flip imovel leilao" or related topics
- When the user mentions "reforma leilao" or related topics

## Do Not Use This Skill When

- The task is unrelated to leiloeiro mercado
- A simpler, more specific tool can handle the request
- The user needs general-purpose assistance without domain expertise

## How It Works

VocÃª Ã© um **Analista Profissional de Mercado ImobiliÃ¡rio** especializado em
ativos estressados (distressed assets) e leilÃµes, com visÃ£o estratÃ©gica de
investimento, liquidez, retorno e timing de mercado.

---

## Mapa De Liquidez (Tempo MÃ©dio De Revenda PÃ³s-ArremataÃ§Ã£o)

| Segmento | Capital SP/RJ | Capitais Grandes | Interior | Interior Pequeno |
|----------|--------------|-----------------|----------|-----------------|
| Apart. 1-2 quartos | 30-60 dias | 60-90 dias | 90-180 dias | 180-360 dias |
| Apart. 3 quartos | 60-90 dias | 90-150 dias | 120-240 dias | 240+ dias |
| Casa condomÃ­nio | 60-120 dias | 90-180 dias | 120-240 dias | 240+ dias |
| Sala comercial | 120-240 dias | 180-360 dias | 360+ dias | 360+ dias |
| Terreno urbano | 90-180 dias | 180-360 dias | 180-360 dias | 360+ dias |
| GalpÃ£o logÃ­stico | 90-180 dias | 90-180 dias | 180-360 dias | 360+ dias |
| ImÃ³vel rural | 180-360 dias | 360+ dias | 360+ dias | 360+ dias |

**Fatores que aceleram a venda:**
- PreÃ§o abaixo do mercado (10-15% de desconto)
- ImÃ³vel reformado e apresentÃ¡vel
- DocumentaÃ§Ã£o regularizada
- Boa foto e anÃºncio em portais (ZAP, Viva Real)
- Corretor CRECI com carteira de clientes

**Fatores que travam a venda:**
- PendÃªncias documentais (ITBI nÃ£o pago, matrÃ­cula nÃ£o atualizada)
- ImÃ³vel em mau estado / obras inacabadas
- DÃ©bitos nÃ£o quitados que aparecem na matrÃ­cula
- LitÃ­gio pendente no imÃ³vel (aÃ§Ã£o real)

---

## Por Modalidade

**LeilÃµes Judiciais (CPC):**
```
1Âº LeilÃ£o (mÃ­nimo = avaliaÃ§Ã£o):
  - FrequÃªncia de arremataÃ§Ã£o no 1Âº: 20-30%
  - DesÃ¡gio mÃ©dio nas arremataÃ§Ãµes do 1Âº: 0-15% (compram pela avaliaÃ§Ã£o)

2Âº LeilÃ£o (sem mÃ­nimo / veda vil preÃ§o):
  - FrequÃªncia de arremataÃ§Ã£o no 2Âº: 50-70%
  - DesÃ¡gio mÃ©dio nas arremataÃ§Ãµes do 2Âº: 30-50%
  - DesÃ¡gio mÃ¡ximo observado: atÃ© 65-70% (imÃ³veis problemÃ¡ticos)
```

**LeilÃµes Extrajudiciais (Lei 9.514/97 â€” Bancos):**
```
1Âº LeilÃ£o (mÃ­nimo = valor do imÃ³vel, dado em contrato):
  - FrequÃªncia de arremataÃ§Ã£o: 30-50%
  - DesÃ¡gio mÃ©dio: 20-35%
  - CEF: desÃ¡gio mÃ©dio histÃ³rico ~28%

2Âº LeilÃ£o (mÃ­nimo = saldo devedor):
  - FrequÃªncia de arremataÃ§Ã£o: 60-80%
  - DesÃ¡gio mÃ©dio: 35-55%
  - Oportunidade: saldo devedor pode ser muito menor que valor de mercado
```

**Venda Direta BancÃ¡ria:**
```
NegociaÃ§Ã£o direta (sem concorrÃªncia):
  - DesÃ¡gio mÃ©dio: 15-30%
  - Menos competiÃ§Ã£o que leilÃ£o
  - Possibilidade de financiamento pelo prÃ³prio banco
  - CEF financia atÃ© 80% do valor de avaliaÃ§Ã£o nas vendas diretas
```

## Mapa De DesÃ¡gio Por SituaÃ§Ã£o Do ImÃ³vel

| SituaÃ§Ã£o | Faixa de DesÃ¡gio |
|----------|-----------------|
| Desocupado, sem dÃ©bitos, documentaÃ§Ã£o ok | 15-25% |
| Desocupado, dÃ©bitos quantificados | 25-35% |
| Ocupado (devedor cooperativo) | 30-40% |
| Ocupado (litigioso) + dÃ©bitos | 40-55% |
| Irregular documentalmente | 35-50% |
| ImÃ³vel em mau estado | 35-55% |
| CombinaÃ§Ã£o de problemas | 50-70% |

---

## EstratÃ©gia A â€” Flip RÃ¡pido (Curto Prazo)

**Perfil:** Investidor com capital e rede de compradores finais.

```
Comprar com desÃ¡gio de 35%+
â†“
Regularizar documentaÃ§Ã£o (1-3 meses)
â†“
Reforma leve se necessÃ¡rio (opcional)
â†“
Vender com 15-20% de desconto sobre VMP (mais rÃ¡pido que mercado)
â†“
Lucro bruto: 15-20% sobre o investido em 3-9 meses
```

**AnÃ¡lise:**
- Retorno bruto esperado: 15-25%
- Prazo: 3-12 meses
- Risco: mÃ©dio (se imÃ³vel bem selecionado)
- Capital necessÃ¡rio: 100% do lance + custos

## EstratÃ©gia B â€” Reforma E ValorizaÃ§Ã£o (MÃ©dio Prazo)

**Perfil:** Investidor com capital e conhecimento em obras.

```
Comprar com desÃ¡gio de 40%+
â†“
Reforma completa (3-6 meses)
â†“
Vender pelo valor de mercado de imÃ³vel reformado (premium de 20-30%)
â†“
Lucro bruto: 30-50% sobre o investido
```

**AnÃ¡lise:**
- Retorno bruto esperado: 30-50%
- Prazo: 6-18 meses
- Risco: mÃ©dio-alto (risco de obra e mercado)
- Capital necessÃ¡rio: 100% lance + 20-30% do lance em reforma

## EstratÃ©gia C â€” Renda (Longo Prazo)

**Perfil:** Investidor que busca fluxo de caixa passivo.

```
Comprar com desÃ¡gio de 25%+
â†“
Regularizar e alugar (1-3 meses)
â†“
Receber aluguel abaixo do preÃ§o de mercado (para locar rÃ¡pido)
â†“
Yield superior ao mercado pela base de custo menor
```

**Yield tÃ­pico no Brasil:**
- Yield mercado normal: 4-6% a.a. (grandes capitais)
- Yield em imÃ³vel arrematado com 30% de desÃ¡gio: 6-9% a.a.
- Yield em imÃ³vel arrematado com 40% de desÃ¡gio: 7-12% a.a.

## EstratÃ©gia D â€” RegularizaÃ§Ã£o E Revenda (Especialista)

**Perfil:** Advogado/especialista com capacidade de resolver situaÃ§Ãµes complexas.

```
Comprar imÃ³vel com problemas jurÃ­dicos/documentais com desÃ¡gio de 50%+
â†“
Resolver pendÃªncias: irregular, sem habite-se, Ã¡rea divergente
â†“
Vender regularizado pelo valor de mercado
â†“
Lucro bruto: 40-70% sobre o investido
```

---

## SimulaÃ§Ã£o RÃ¡pida De Roi

```
DADOS DO LOTE:
Valor de AvaliaÃ§Ã£o (VAN):           R$ _____________
Valor de Mercado Estimado (VMP):    R$ _____________
Lance Pretendido:                   R$ _____________
DesÃ¡gio sobre VMP:                  ____%

CUSTOS DE AQUISIÃ‡ÃƒO:
ComissÃ£o Leiloeiro (5%):            R$ _____________
ITBI (3% sobre VMP):                R$ _____________
Registro + Escritura:               R$ _____________
Advogado (se necessÃ¡rio):           R$ _____________
DÃ©bitos (IPTU + Cond.):             R$ _____________
Obras/Reforma:                      R$ _____________
Custo Total:                        R$ _____________

CUSTO TOTAL INVESTIDO:              R$ _____________

CENÃRIO DE SAÃDA:
Valor de Venda Esperado:            R$ _____________
ComissÃ£o corretagem (5-6%):         R$ _____________
IRPF Ganho de Capital (15%):        R$ _____________

RESULTADO:
Lucro Bruto:                        R$ _____________
Lucro LÃ­quido:                      R$ _____________
ROI Bruto:                          ____%
ROI LÃ­quido:                        ____%
Prazo Estimado:                     ___ meses
Retorno Anualizado (a.a.):          ____%
```

**Benchmarks de comparaÃ§Ã£o:**
- CDI 2024: ~10.5% a.a.
- IPCA 2024: ~4.5% a.a.
- LCI/LCA isentas: ~9-10% a.a.
- FIIs (yield mÃ©dio): ~9-11% a.a.
- **Para valer a pena vs. CDI:** ROI anualizado mÃ­nimo de 15-20%

---

## Melhor Momento Para Comprar Em LeilÃ£o

**Ciclo ImobiliÃ¡rio e Oportunidades:**
```
ALTA DE JUROS (SELIC alta):
  â†’ CrÃ©dito mais caro â†’ mais inadimplÃªncia â†’ mais leilÃµes
  â†’ Menor concorrÃªncia por imÃ³veis â†’ MELHOR MOMENTO PARA COMPRAR
  â†’ Selic acima de 12%: mercado de leilÃµes aquece (oferta sobe)

BAIXA DE JUROS (SELIC baixa):
  â†’ CrÃ©dito barato â†’ menos inadimplÃªncia â†’ menos leilÃµes
  â†’ Maior competiÃ§Ã£o pelos lotes â†’ preÃ§os sobem
  â†’ Selic abaixo de 9%: mercado de leilÃµes se contrai
```

**Sazonalidade:**
- **Dezembro/Janeiro:** LeilÃµes com menos concorrÃªncia (fÃ©rias, festas)
- **MarÃ§o-Abril:** InÃ­cio de ano fiscal â€” leilÃµes da Caixa com novos lotes
- **Julho:** PerÃ­odo de fÃ©rias â€” competiÃ§Ã£o reduzida
- **Outubro/Novembro:** Alta temporada de leilÃµes judiciais (fim do ano processual)

## AnÃ¡lise Por Banco

**Caixa EconÃ´mica Federal:**
- Maior estoque de imÃ³veis retomados do Brasil (>20.000 imÃ³veis em 2024)
- Programas prÃ³prios: Venda Online, LicitaÃ§Ã£o Aberta, Proposta Online
- Forte em imÃ³veis do PMCMV/MCMV â€” popular/econÃ´mico
- Financia arremataÃ§Ã£o: atÃ© 80% do valor de avaliaÃ§Ã£o
- Diferencial: possibilidade de usar FGTS para completar o pagamento

**Santander:**
- Estoque mÃ©dio, foco em imÃ³veis de mÃ©dio-alto padrÃ£o
- Plataforma santanderx.com.br
- LeilÃµes mensais regulares

**ItaÃº/Bradesco/BB:**
- Estoques menores, imÃ³veis de todos os padrÃµes
- LeilÃµes extrajudiciais mais frequentes que judiciais
- Tendem a limpar o estoque em dezembro

---

## 6. AnÃ¡lise Do Perfil De Comprador Final

Identificar o perfil correto do comprador final aumenta a velocidade de venda:

| Perfil | ImÃ³vel Ideal | Canal de Venda |
|--------|-------------|----------------|
| FamÃ­lia classe mÃ©dia | Apt 3Q, casa condomÃ­nio | ZAP, Viva Real, corretor |
| Jovem casal | Studio, 1-2Q, localizaÃ§Ã£o central | Instagram, Quinto Andar |
| EmpresÃ¡rio/Investidor | Comercial, galpÃ£o, terreno | IndicaÃ§Ã£o, CRECI |
| Locador | Apt bem localizado, studio | ImobiliÃ¡rias especializadas |
| Incorporador | Terreno em ZEU/ZC | Construtoras, brokers |
| FII/REIT | GalpÃ£o, laje corporativa, varejo | B3, gestores de FII |

---

## Riscos Que Afetam A EstratÃ©gia De SaÃ­da

| Risco | Probabilidade | Impacto | MitigaÃ§Ã£o |
|-------|--------------|---------|-----------|
| Mercado local sofre queda | MÃ©dio | Alto | Diversificar geograficamente |
| ImÃ³vel nÃ£o aluga/vende no prazo | MÃ©dio | MÃ©dio | Aceitar desconto maior na saÃ­da |
| Reforma acima do orÃ§amento | Alto | MÃ©dio | Margem de 30% para obras |
| Novo empreendimento concorrente | Baixo | MÃ©dio | Verificar alvarÃ¡s no entorno |
| AprovaÃ§Ã£o de zoneamento negativo | Baixo | Alto | Verificar plano diretor municipal |
| DesaceleraÃ§Ã£o econÃ´mica | MÃ©dio | Alto | Priorizar imÃ³veis de necessidade bÃ¡sica |
| Alta sÃºbita da Selic | Baixo | MÃ©dio | SaÃ­da rÃ¡pida (flip) vs. renda |

---

## Rotina De Monitoramento Semanal

```
1. ALERTAS ATIVOS:
   - ZAP ImÃ³veis: configurar alertas por bairro, tipo e preÃ§o
   - Viva Real: idem
   - CEF ImÃ³veis: acompanhar novos lotes (atualiza ~semanal)
   - LeilÃ£o Judicial (TJ): configurar alertas por comarca

2. ANÃLISE DE NOVO LOTE (30 min):
   a) Abrir edital â†’ verificar Bloco 1-8 (SKILL de Edital)
   b) Pesquisar comparÃ¡veis no ZAP/Viva Real no bairro
   c) Verificar Google Street View da localizaÃ§Ã£o
   d) Calcular ROI na planilha (Bloco 4 desta skill)
   e) Solicitar certidÃ£o de Ã´nus no cartÃ³rio (se interessante)

3. DILIGÃŠNCIA PRESENCIAL (se ROI > 20%):
   - Visitar o imÃ³vel (ou vizinhanÃ§a)
   - Conversar com sÃ­ndico/vizinhos
   - Verificar estado de conservaÃ§Ã£o real
   - Confirmar informaÃ§Ãµes do edital

4. DECISÃƒO FINAL:
   - Score de Risco do Edital (SKILL de Risco)
   - ROI lÃ­quido vs. CDI
   - Capital disponÃ­vel e prazo
   - Lance mÃ¡ximo definido â†’ ENTRAR NO LEILÃƒO
```

---

## Indicadores Chave (Atualizar Periodicamente)

```
SELIC Meta (fev/2025):           13,25% a.a.
CDI:                             ~13,15% a.a.
IPCA (12 meses):                 ~5,0% a.a.
IGP-M (12 meses):                ~4,5% a.a.
DÃ³lar (USD/BRL):                 ~5,80-6,00
PoupanÃ§a (a.a.):                 ~7,7% (quando Selic > 8,5%)
LCI/LCA (isenta IR):             ~10-12% a.a.
FIIs - dividend yield mÃ©dio:     ~10-12% a.a. (IFIX)
```

**Impacto no Mercado de LeilÃµes (Selic 13,25%):**
- CrÃ©dito imobiliÃ¡rio mais caro â†’ mais inadimplÃªncia â†’ MAIS LEILÃ•ES
- Taxa de financiamento habitacional: ~11-13% a.a. (TR+10 a TR+12)
- Demanda por imÃ³veis desacelera â†’ mais tempo para vender
- Bancos querem limpar estoques â†’ desÃ¡gios maiores em venda direta
- **MOMENTO FAVORÃVEL para comprar em leilÃ£o (mais oferta, menos concorrÃªncia)**

## AnÃ¡lise De Financiamento PÃ³s-ArremataÃ§Ã£o

**Custo do financiamento em cenÃ¡rio atual:**
```
Valor financiado: R$ 300.000
Prazo: 360 meses
Taxa: 11,5% a.a. (mÃ©dia CEF 2025)
Parcela inicial: ~R$ 3.450
Total pago em 30 anos: ~R$ 700.000

Para valer a pena financiar imÃ³vel de leilÃ£o:
â†’ O desÃ¡gio precisa ser MAIOR que o custo financeiro adicional
â†’ Regra prÃ¡tica: sÃ³ financia se desÃ¡gio for > 30% E taxa < 12% a.a.
â†’ Pagamento Ã  vista SEMPRE Ã© mais vantajoso se tiver capital
```

## Benchmark: Quanto O LeilÃ£o Precisa Render Para Superar O Cdi?

```
Capital: R$ 500.000
CDI lÃ­quido (15% IR sobre 13,15%): ~11,2% a.a. = R$ 56.000/ano

Para superar CDI em 12 meses:
â†’ Precisa lucrar > R$ 56.000 lÃ­quido na arremataÃ§Ã£o
â†’ Sobre capital de R$ 500k, precisa de ROI > 11,2% a.a.
â†’ Considerando custos (ITBI, comissÃ£o, registro = ~10%):
â†’ DESÃGIO MÃNIMO para superar CDI: ~25% sobre VMP
```

---

## Quadro Comparativo De Investimento

| Investimento | Retorno Esperado | Risco | Liquidez | Capital MÃ­n. |
|-------------|-----------------|-------|----------|-------------|
| CDI/Tesouro Selic | 11-13% a.a. | Muito baixo | D+0 a D+1 | R$ 30 |
| FIIs (IFIX) | 10-12% a.a. | MÃ©dio | D+2 | R$ 100 |
| LCI/LCA | 10-12% a.a. | Baixo | CarÃªncia 90d | R$ 1.000 |
| ImÃ³vel compra direta | 4-8% a.a. (renda) | MÃ©dio | 3-12 meses | R$ 200k+ |
| **LeilÃ£o â€” Flip** | **20-50% no perÃ­odo** | **MÃ©dio-Alto** | **3-12 meses** | **R$ 50k+** |
| **LeilÃ£o â€” Renda** | **8-15% a.a.** | **MÃ©dio** | **12+ meses** | **R$ 100k+** |
| **LeilÃ£o â€” Reforma** | **30-60% no perÃ­odo** | **Alto** | **6-18 meses** | **R$ 150k+** |

**ConclusÃ£o:** LeilÃ£o sÃ³ supera CDI de forma consistente com:
1. DesÃ¡gio mÃ­nimo de 25-30%
2. Due diligence completa (reduzir surpresas)
3. EstratÃ©gia de saÃ­da definida antes do lance
4. Reserva de 15-20% do capital para imprevistos

---

## InstalaÃ§Ã£o

Skill baseada em conhecimento (knowledge-only). NÃ£o requer instalaÃ§Ã£o de dependÃªncias.

```bash

## Verificar Se A Skill EstÃ¡ Registrada:

python C:\Users\renat\skills\agent-orchestrator\scripts\scan_registry.py
```

---

## Comandos E Uso

Como usar esta skill:

```bash

## Uso Via Orchestrator (AutomÃ¡tico):

python agent-orchestrator/scripts/match_skills.py "mercado imobiliario leilao"

## "Compare LeilÃ£o Vs Cdi"

```

---

## GovernanÃ§a

Esta skill implementa as seguintes polÃ­ticas de governanÃ§a:

- **action_log**: AnÃ¡lises de mercado sÃ£o registradas pelo log_action para rastreabilidade
- **rate_limit**: Controle via check_rate integrado ao ecossistema
- **requires_confirmation**: ProjeÃ§Ãµes de ROI negativo geram confirmation_request ao usuÃ¡rio
- **warning_threshold**: ROI abaixo do CDI dispara warning_threshold com alerta automÃ¡tico

PolÃ­ticas adicionais:
- **ResponsÃ¡vel:** Ecossistema Leiloeiro IA
- **Escopo:** AnÃ¡lise de mercado imobiliÃ¡rio e estratÃ©gias de investimento em leilÃ£o
- **LimitaÃ§Ãµes:** ProjeÃ§Ãµes e estimativas. NÃ£o constitui recomendaÃ§Ã£o de investimento.
- **Auditoria:** Validada por skill-sentinel
- **Dados sensÃ­veis:** NÃ£o armazena dados financeiros do usuÃ¡rio

---

## ReferÃªncias

Fontes e referÃªncias de mercado:
- ZAP ImÃ³veis (zapimoveis.com.br) â€” dados de mercado
- Viva Real (vivareal.com.br) â€” comparativos de preÃ§o
- FIPEZAP â€” Ã­ndice de preÃ§os imobiliÃ¡rios
- IFIX (B3) â€” Ã­ndice de fundos imobiliÃ¡rios
- SINDUSCON-SP â€” CUB e custos de construÃ§Ã£o
- Banco Central â€” Selic, CDI, sÃ©ries histÃ³ricas
- CEF â€” portal de imÃ³veis retomados

## Best Practices

- Provide clear, specific context about your project and requirements
- Review all suggestions before applying them to production code
- Combine with other complementary skills for comprehensive analysis

## Common Pitfalls

- Using this skill for tasks outside its domain expertise
- Applying recommendations without understanding your specific context
- Not providing enough project context for accurate analysis

## Related Skills

- `junta-leiloeiros` - Complementary skill for enhanced analysis
- `leiloeiro-avaliacao` - Complementary skill for enhanced analysis
- `leiloeiro-edital` - Complementary skill for enhanced analysis
- `leiloeiro-ia` - Complementary skill for enhanced analysis
- `leiloeiro-juridico` - Complementary skill for enhanced analysis

## Limitations
- Use this skill only when the task clearly matches the scope described above.
- Do not treat the output as a substitute for environment-specific validation, testing, or expert review.
- Stop and ask for clarification if required inputs, permissions, safety boundaries, or success criteria are missing.


---
name: leiloeiro-avaliacao
description: "Use when working with leiloeiro-avaliacao"
---

---
name: leiloeiro-avaliacao
description: Avaliacao pericial de imoveis em leilao. Valor de mercado, liquidacao forcada, ABNT NBR 14653, metodos comparativo/renda/custo, CUB e margem de seguranca.
risk: safe
source: community
date_added: '2026-03-06'
author: renat
tags:
- real-estate
- valuation
- appraisal
- brazilian
tools:
- claude-code
- antigravity
- cursor
- gemini-cli
- codex-cli
---

# SKILL DE AVALIAÃ‡ÃƒO DE IMÃ“VEL â€” PERITO AVALIADOR

## Overview

Avaliacao pericial de imoveis em leilao. Valor de mercado, liquidacao forcada, ABNT NBR 14653, metodos comparativo/renda/custo, CUB e margem de seguranca.

## When to Use This Skill

- When the user mentions "avaliar imovel leilao" or related topics
- When the user mentions "valor de mercado leilao" or related topics
- When the user mentions "laudo avaliacao leilao" or related topics
- When the user mentions "abnt nbr 14653" or related topics
- When the user mentions "valor venal imovel" or related topics
- When the user mentions "preco imovel leilao" or related topics

## Do Not Use This Skill When

- The task is unrelated to leiloeiro avaliacao
- A simpler, more specific tool can handle the request
- The user needs general-purpose assistance without domain expertise

## How It Works

VocÃª Ã© um **Engenheiro/Arquiteto Avaliador SÃªnior** credenciado, com domÃ­nio na ABNT NBR 14653
e experiÃªncia em laudos periciais judiciais e extrajudiciais para leilÃµes.

---

## Tipos De Valor (Abnt Nbr 14653-1)

| Conceito | DefiniÃ§Ã£o | Uso em LeilÃ£o |
|----------|-----------|--------------|
| **Valor de Mercado** | Quantia mais provÃ¡vel de transaÃ§Ã£o livre, entre partes conscientes e sem coerÃ§Ã£o | Base do edital (avaliaÃ§Ã£o judicial) |
| **Valor de LiquidaÃ§Ã£o ForÃ§ada** | Quantia em venda compulsÃ³ria em prazo curto | Estima o preÃ§o real de arremataÃ§Ã£o |
| **Valor de Uso** | Valor para um uso ou usuÃ¡rio especÃ­fico | AnÃ¡lise do comprador final |
| **Custo de ReediÃ§Ã£o** | Custo de reproduzir o bem em condiÃ§Ãµes similares | AvaliaÃ§Ã£o de imÃ³veis especiais/industriais |

**RelaÃ§Ã£o prÃ¡tica:**
```
Valor de Mercado (VMP)
    Ã— (1 - fator de liquidaÃ§Ã£o)
= Valor de LiquidaÃ§Ã£o ForÃ§ada (VLF)

Fator de liquidaÃ§Ã£o tÃ­pico: 0,20 a 0,40 (20% a 40% de desÃ¡gio)
```

---

## MÃ©todo 1 â€” Comparativo Direto (Principal)

Usado para: imÃ³veis residenciais e comerciais com amostras de mercado disponÃ­veis.

## Passo A Passo

**1. Pesquisa de Amostras**

Coletar mÃ­nimo 5 imÃ³veis comparÃ¡veis (para Grau II/III ABNT):
- Mesmo bairro ou regiÃ£o comparÃ¡vel
- Mesmo tipo (apartamento, casa, sala comercial)
- Mesma faixa de Ã¡rea (Â±30%)
- TransaÃ§Ãµes recentes (Ãºltimos 12 meses â€” idealmente 6)

**Fontes de dados:**
- ZAP ImÃ³veis (zap.com.br) â€” anÃºncios ativos
- Viva Real (vivareal.com.br)
- OLX ImÃ³veis
- Quinto Andar (quintoandar.com)
- CartÃ³rio de ImÃ³veis â€” escrituras (mais confiÃ¡vel, mas acesso restrito)
- AvaliaÃ§Ãµes de corretores locais (CRECI)

**2. HomogeneizaÃ§Ã£o das Amostras**

Ajustar cada amostra para tornÃ¡-la comparÃ¡vel ao imÃ³vel avaliando:

**Fatores de HomogeneizaÃ§Ã£o (multiplicadores):**

```
Fator Ãrea:
- ImÃ³veis menores tendem a ter valor unitÃ¡rio maior (R$/mÂ²)
- FÃ³rmula: Fa = (Ãrea PadrÃ£o / Ãrea Amostra)^0,25

Fator PadrÃ£o Construtivo (NBR 12721):
Luxo/Alto:    1,30
Normal/MÃ©dio: 1,00
Simples:      0,80
MÃ­nimo:       0,65

Fator Estado de ConservaÃ§Ã£o:
Novo/Reformado:  1,00
Bom:             0,90
Regular:         0,80
Mau:             0,65
Ruim:            0,50

Fator LocalizaÃ§Ã£o (relativo Ã  amostra):
Superior:    > 1,00
Similar:     1,00
Inferior:    < 1,00
(Calibrar pela infraestrutura local, comÃ©rcio, transporte)

Fator Andar (apartamentos):
Andar baixo (1-3):   0,95
Andar mÃ©dio (4-9):   1,00
Andar alto (10+):    1,05 a 1,15
Cobertura:           1,20 a 1,50

Fator Vaga de Garagem:
Sem vaga:  0,90 a 0,95
1 vaga:    1,00
2 vagas:   1,05 a 1,10
```

**3. Tratamento EstatÃ­stico**

ApÃ³s homogeneizaÃ§Ã£o, calcular:
- MÃ©dia dos valores unitÃ¡rios homogeneizados (R$/mÂ²)
- Campo de arbÃ­trio: Â±15% (Grau I) / Â±10% (Grau II)
- Eliminar outliers (amostras > 2 desvios padrÃ£o)

**4. Calcular o Valor Final**

```
Valor de Mercado = Valor UnitÃ¡rio Homogeneizado (R$/mÂ²) Ã— Ãrea do ImÃ³vel (mÂ²)
```

---

## MÃ©todo 2 â€” Renda (ImÃ³veis Com GeraÃ§Ã£o De Renda)

Usado para: shoppings, hotÃ©is, lajes corporativas, postos de combustÃ­vel, imÃ³veis locados.

## FÃ³rmula BÃ¡sica

```
Renda LÃ­quida Anual = Renda Bruta - Despesas Operacionais
Taxa de CapitalizaÃ§Ã£o (Cap Rate) = Renda LÃ­quida / Valor de Mercado
Valor de Mercado = Renda LÃ­quida / Cap Rate
```

**Cap Rates TÃ­picos no Brasil (2024):**

| Segmento | Cap Rate |
|----------|---------|
| Residencial alto padrÃ£o SP/RJ | 4% - 6% |
| Residencial padrÃ£o mÃ©dio | 5% - 8% |
| Salas comerciais | 7% - 10% |
| GalpÃµes logÃ­sticos | 8% - 12% |
| Retail / Varejo | 8% - 12% |
| HotÃ©is | 10% - 15% |

**Exemplo:**
- ImÃ³vel comercial locado por R$ 10.000/mÃªs
- Despesas: IPTU R$ 500/mÃªs + condomÃ­nio R$ 800/mÃªs + vacÃ¢ncia 5%
- Renda lÃ­quida: R$ (10.000 - 500 - 800) Ã— (1 - 0,05) = R$ 8.265/mÃªs â†’ R$ 99.180/ano
- Cap Rate local: 8%
- Valor estimado: R$ 99.180 / 0,08 = **R$ 1.239.750**

---

## MÃ©todo 3 â€” Evolutivo / Custo (ImÃ³veis Especiais)

Usado para: imÃ³veis industriais, galpÃµes, hospitais, colÃ©gios, imÃ³veis sem comparativos.

## FÃ³rmula

```
Valor Total = Valor do Terreno + Valor das Benfeitorias (depreciadas)

Valor das Benfeitorias = Custo de ReproduÃ§Ã£o Ã— (1 - DepreciaÃ§Ã£o)
```

**Custo de ReproduÃ§Ã£o (CUB â€” SINDUSCON, atualizado mensalmente por estado):**

| PadrÃ£o | CUB aproximado (R$/mÂ²) â€” ReferÃªncia SP 2024 |
|--------|----------------------------------------------|
| Residencial Baixo (R1-B) | R$ 1.800 - 2.200 |
| Residencial Normal (R1-N) | R$ 2.200 - 2.800 |
| Residencial Alto (R1-A) | R$ 2.800 - 3.800 |
| Comercial (CSL-8) | R$ 2.500 - 3.500 |
| GalpÃ£o (GI) | R$ 1.200 - 1.800 |

*Verificar CUB atualizado em: www.sindusconsp.com.br*

**DepreciaÃ§Ã£o (Ross-Heidecke):**

| Idade / Estado | Novo | Bom | Regular | Mau |
|---------------|------|-----|---------|-----|
| 0-10 anos | 100% | 85% | 70% | 55% |
| 11-20 anos | 85% | 72% | 59% | 46% |
| 21-30 anos | 70% | 59% | 49% | 38% |
| 31-40 anos | 55% | 47% | 38% | 30% |
| > 40 anos | 45% | 38% | 31% | 24% |

---

## AnÃ¡lise Do Laudo Pericial Judicial

Quando receber um laudo de avaliaÃ§Ã£o para anÃ¡lise, verificar:

## Checklist Do Laudo

**Formalidades:**
- [ ] Avaliador identificado com CREA/CAU
- [ ] Data da vistoria (nÃ£o da emissÃ£o)
- [ ] DescriÃ§Ã£o fÃ­sica do imÃ³vel
- [ ] MÃ©todo utilizado declarado
- [ ] FundamentaÃ§Ã£o e PrecisÃ£o (Grau I, II ou III â€” ABNT)

**ConteÃºdo tÃ©cnico:**
- [ ] Amostras utilizadas (mÃ­nimo 3 para Grau I; 5 para Grau II)
- [ ] Fontes das amostras indicadas
- [ ] HomogeneizaÃ§Ã£o demonstrada (ou justificativa)
- [ ] Campo de arbÃ­trio aplicado
- [ ] Valor unitÃ¡rio R$/mÂ² resultante
- [ ] CÃ¡lculo final claro

**Sinais de laudo fraco/suspeito:**
- âš ï¸ Menos de 3 amostras (Grau I insuficiente para leilÃ£o relevante)
- âš ï¸ Amostras de bairros muito distantes ou diferentes
- âš ï¸ Sem data de vistoria (quando foi o imÃ³vel visitado?)
- âš ï¸ Valor muito distante do mercado sem justificativa
- âš ï¸ Laudo copiado de processo anterior sem atualizaÃ§Ã£o
- âš ï¸ Avaliador sem CREA/CAU vÃ¡lido no estado do imÃ³vel

---

## AnÃ¡lise De LocalizaÃ§Ã£o (Score De LocalizaÃ§Ã£o)

Atribuir pontuaÃ§Ã£o de 0 a 5 para cada fator:

```
INFRAESTRUTURA:
[ ] Transporte pÃºblico (metro, BRT, Ã´nibus): 0-5
[ ] ComÃ©rcio e serviÃ§os no entorno: 0-5
[ ] Escolas e hospitais prÃ³ximos: 0-5
[ ] Parques e Ã¡reas de lazer: 0-5

URBANISMO:
[ ] Zoneamento favorÃ¡vel (residencial, ZEU, ZEIS...): 0-5
[ ] Potencial construtivo (coeficiente aproveitamento): 0-5
[ ] RestriÃ§Ãµes (APP, faixa de marinha, tombamento): 0-5

MERCADO:
[ ] ValorizaÃ§Ã£o histÃ³rica da regiÃ£o: 0-5
[ ] PresenÃ§a de empreendimentos novos: 0-5
[ ] Liquidez estimada (facilidade de revenda): 0-5

TOTAL: ___ / 50
```

**InterpretaÃ§Ã£o:**
- 40-50: LocalizaÃ§Ã£o excelente â€” premium
- 30-39: LocalizaÃ§Ã£o boa â€” acima da mÃ©dia
- 20-29: LocalizaÃ§Ã£o mÃ©dia â€” mercado normal
- 10-19: LocalizaÃ§Ã£o abaixo da mÃ©dia â€” liquidez reduzida
- 0-9: LocalizaÃ§Ã£o ruim â€” alto risco de iliquidez

---

## CÃ¡lculo De Margem De SeguranÃ§a

```
Valor de Mercado Estimado (VMP):        R$ _______________
(-) Custos de aquisiÃ§Ã£o (ITBI + Cart.): R$ _______________  (aprox. 4-5% do valor)
(-) ComissÃ£o leiloeiro (5%):            R$ _______________
(-) DÃ©bitos IPTU + CondomÃ­nio:          R$ _______________
(-) Custo de desocupaÃ§Ã£o (se necessÃ¡rio): R$ _____________
(-) Obras/regularizaÃ§Ã£o estimada:       R$ _______________
(-) Margem de seguranÃ§a (10-20%):       R$ _______________
= LANCE MÃXIMO RECOMENDADO:             R$ _______________

DESÃGIO MÃNIMO ACEITÃVEL: ____% do VMP
```

---

## AnÃ¡lise Por Tipo

**Apartamento Residencial:**
- Verificar: vagas, andar, face (sol manhÃ£/tarde), churrasqueira, depÃ³sito
- Liquidez: muito alta (SP, RJ, BH, Curitiba) â€” fÃ¡cil revenda

**Casa em CondomÃ­nio:**
- Verificar: Ã¡rea de lazer, seguranÃ§a, taxa condominial, restriÃ§Ãµes construtivas
- Liquidez: alta â€” demanda constante por famÃ­lias

**Terreno Urbano:**
- Verificar: zoneamento (coeficiente de aproveitamento, taxa de ocupaÃ§Ã£o)
- Verificar: possibilidade de incorporaÃ§Ã£o (VGV potencial)
- Liquidez: mÃ©dia â€” depende muito da localizaÃ§Ã£o

**Sala Comercial:**
- Verificar: padrÃ£o, rua, fluxo pedestres, vaga, autuaÃ§Ãµes
- Liquidez: baixa a mÃ©dia â€” mercado mais restrito

**GalpÃ£o LogÃ­stico/Industrial:**
- Verificar: pÃ©-direito (mÃ­nimo 8m para logÃ­stica), docas, acesso caminhÃ£o, AVCB
- Liquidez: mÃ©dia-alta em eixos logÃ­sticos (Rodovias Dutra, Castelo Branco, BR-381)

**ImÃ³vel Rural:**
- Verificar: ITR, CAR, reserva legal, acesso, Ã¡gua, energia
- Liquidez: baixa â€” mercado especializado

---

## Pesquisa De Mercado Online â€” Passo A Passo

Quando precisar estimar o VMP de um imÃ³vel sem laudo disponÃ­vel:

## Roteiro De Pesquisa RÃ¡pida (15 Min)

```
1. ABRIR ZAP IMÃ“VEIS (zapimoveis.com.br):
   - Buscar pelo bairro e tipo do imÃ³vel
   - Filtrar por Ã¡rea similar (Â±20%)
   - Filtrar por nÂº de quartos similar
   - Anotar: 5 imÃ³veis com preÃ§o de VENDA (nÃ£o aluguel)
   - Anotar: R$/mÂ² de cada amostra

2. ABRIR VIVA REAL (vivareal.com.br):
   - Repetir a mesma busca
   - Cruzar com dados do ZAP (evitar duplicatas)
   - Anotar: 3-5 amostras adicionais

3. APLICAR FATOR DE ELASTICIDADE:
   - AnÃºncios tÃªm margem de negociaÃ§Ã£o mÃ©dia de 10-15%
   - Valor real de venda â‰ˆ preÃ§o anunciado Ã— 0,85 a 0,90
   - Em mercado fraco: Ã— 0,80
   - Em mercado aquecido: Ã— 0,92

4. CALCULAR VMP ESTIMADO:
   - MÃ©dia dos R$/mÂ² das amostras ajustadas
   - Multiplicar pela Ã¡rea do imÃ³vel do leilÃ£o
   - RESULTADO = VMP estimado (Â±15% de margem)

5. VALIDAÃ‡ÃƒO COM GOOGLE STREET VIEW:
   - Abrir o endereÃ§o no Google Maps
   - Verificar: entorno, comÃ©rcio, transporte
   - Estado aparente das fachadas vizinhas
   - Confirmar se bairro corresponde ao padrÃ£o das amostras
```

## Cub ReferÃªncia 2025 (Sinduscon/Sp â€” Atualizar Mensalmente)

| PadrÃ£o | CUB R$/mÂ² (ref. Jan/2025) |
|--------|--------------------------|
| R1-B (Residencial Baixo) | R$ 2.000 - 2.400 |
| R1-N (Residencial Normal) | R$ 2.400 - 3.100 |
| R1-A (Residencial Alto) | R$ 3.100 - 4.200 |
| R8-N (PrÃ©dio Normal) | R$ 2.100 - 2.700 |
| R8-A (PrÃ©dio Alto) | R$ 2.800 - 3.600 |
| R16-N (PrÃ©dio 16 Pavtos) | R$ 2.200 - 2.900 |
| CSL-8 (Comercial) | R$ 2.700 - 3.800 |
| GI (GalpÃ£o Industrial) | R$ 1.400 - 2.000 |

*Fonte: SINDUSCON-SP. Consultar atualizaÃ§Ã£o mensal em www.sindusconsp.com.br/indices-e-custos/cub/*

---

## ImÃ³veis Populares (AtÃ© R$ 300K)

- Margem de erro aceitÃ¡vel na avaliaÃ§Ã£o: Â±15%
- Liquidez: ALTA â€” muitos compradores nessa faixa
- Fator de liquidaÃ§Ã£o: 0,20 (VLF = 80% VMP)
- DesÃ¡gio ideal em leilÃ£o: â‰¥30%

## ImÃ³veis MÃ©dios (R$ 300K - R$ 800K)

- Margem de erro aceitÃ¡vel: Â±10%
- Liquidez: MÃ‰DIA-ALTA
- Fator de liquidaÃ§Ã£o: 0,25
- DesÃ¡gio ideal em leilÃ£o: â‰¥35%

## ImÃ³veis De Alto PadrÃ£o (R$ 800K - R$ 2M)

- Margem de erro aceitÃ¡vel: Â±10%
- Liquidez: MÃ‰DIA â€” prazo maior de venda
- Fator de liquidaÃ§Ã£o: 0,30
- DesÃ¡gio ideal em leilÃ£o: â‰¥40%

## ImÃ³veis De Luxo (> R$ 2M)

- Margem de erro aceitÃ¡vel: Â±15% (menos amostras)
- Liquidez: BAIXA â€” mercado restrito
- Fator de liquidaÃ§Ã£o: 0,35 a 0,45
- DesÃ¡gio ideal em leilÃ£o: â‰¥45%
- Investidor precisa ter capital para segurar por 12-24 meses

---

## Quando Ã‰ PossÃ­vel Financiar ImÃ³vel De LeilÃ£o?

| Modalidade | Financiamento PossÃ­vel? | Obs |
|-----------|------------------------|-----|
| Venda Direta CEF | SIM â€” pelo prÃ³prio banco | AtÃ© 80% VMAV, FGTS permitido |
| Venda Direta BB/Santander | SIM â€” pelo prÃ³prio banco | CondiÃ§Ãµes variam |
| LeilÃ£o Extrajudicial (banco) | DEPENDE â€” consultar edital | Alguns aceitam financiamento |
| LeilÃ£o Judicial | Geralmente NÃƒO | Pagamento no ato ou parcelamento curto (Art. 895) |

## Parcelamento No LeilÃ£o Judicial (Art. 895 Cpc)

- Sinal de 25% no ato
- Restante em atÃ© 30 parcelas (mÃ¡ximo)
- CorreÃ§Ã£o: juros simples de 1% ao mÃªs (geralmente)
- Garantia: hipoteca sobre o prÃ³prio bem arrematado
- **Risco:** se nÃ£o pagar, perde o imÃ³vel E o sinal

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

python agent-orchestrator/scripts/match_skills.py "avaliar imovel leilao"

## "Qual O Valor De Mercado Desse Apartamento?"

```

---

## GovernanÃ§a

Esta skill implementa as seguintes polÃ­ticas de governanÃ§a:

- **action_log**: AvaliaÃ§Ãµes realizadas sÃ£o registradas pelo log_action do ecossistema
- **rate_limit**: Controle via check_rate integrado â€” sem chamadas API externas diretas
- **requires_confirmation**: AvaliaÃ§Ãµes com margem negativa geram confirmation_request obrigatÃ³rio
- **warning_threshold**: DesÃ¡gio <15% ou avaliaÃ§Ã£o defasada disparam warning_threshold automÃ¡tico

PolÃ­ticas adicionais:
- **ResponsÃ¡vel:** Ecossistema Leiloeiro IA
- **Escopo:** AvaliaÃ§Ã£o pericial de imÃ³veis para leilÃ£o
- **LimitaÃ§Ãµes:** Estimativas indicativas. NÃ£o substitui laudo pericial de engenheiro/arquiteto.
- **Auditoria:** Validada por skill-sentinel
- **Dados sensÃ­veis:** NÃ£o armazena dados de avaliaÃ§Ãµes

---

## ReferÃªncias

Fontes normativas e referÃªncias:
- **ABNT NBR 14653-1:2019** â€” Procedimentos gerais
- **ABNT NBR 14653-2:2011** â€” ImÃ³veis urbanos
- **ABNT NBR 14653-3:2004** â€” ImÃ³veis rurais
- **ABNT NBR 12721** â€” AvaliaÃ§Ã£o de custos de construÃ§Ã£o
- **CUB** â€” Custo UnitÃ¡rio BÃ¡sico (SINDUSCON por estado, atualizaÃ§Ã£o mensal)
- **COFECI** â€” Conselho Federal de Corretores (pareceres de avaliaÃ§Ã£o)
- **IBAPE** â€” Instituto Brasileiro de AvaliaÃ§Ãµes e PerÃ­cias de Engenharia
- **FIPEZAP** â€” Ãndice de preÃ§os de imÃ³veis (fipe.org.br/indices/fipezap)

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
- `leiloeiro-edital` - Complementary skill for enhanced analysis
- `leiloeiro-ia` - Complementary skill for enhanced analysis
- `leiloeiro-juridico` - Complementary skill for enhanced analysis
- `leiloeiro-mercado` - Complementary skill for enhanced analysis

## Limitations
- Use this skill only when the task clearly matches the scope described above.
- Do not treat the output as a substitute for environment-specific validation, testing, or expert review.
- Stop and ask for clarification if required inputs, permissions, safety boundaries, or success criteria are missing.


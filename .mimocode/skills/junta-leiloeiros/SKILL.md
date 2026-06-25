---
name: junta-leiloeiros
description: "Use when working with junta-leiloeiros"
---

---
name: junta-leiloeiros
description: Coleta e consulta dados de leiloeiros oficiais de todas as 27 Juntas Comerciais do Brasil. Scraper multi-UF, banco SQLite, API FastAPI e exportacao CSV/JSON.
risk: safe
source: community
date_added: '2026-03-06'
author: renat
tags:
- scraping
- brazilian-data
- auctioneers
- api
tools:
- claude-code
- antigravity
- cursor
- gemini-cli
- codex-cli
---

# Skill: Leiloeiros das Juntas Comerciais do Brasil

## Overview

Coleta e consulta dados de leiloeiros oficiais de todas as 27 Juntas Comerciais do Brasil. Scraper multi-UF, banco SQLite, API FastAPI e exportacao CSV/JSON.

## When to Use This Skill

- When the user mentions "leiloeiro junta" or related topics
- When the user mentions "junta comercial leiloeiro" or related topics
- When the user mentions "scraper junta" or related topics
- When the user mentions "jucesp leiloeiro" or related topics
- When the user mentions "jucerja" or related topics
- When the user mentions "jucemg leiloeiro" or related topics

## Do Not Use This Skill When

- The task is unrelated to junta leiloeiros
- A simpler, more specific tool can handle the request
- The user needs general-purpose assistance without domain expertise

## How It Works

Coleta dados pÃºblicos de leiloeiros oficiais de todas as 27 Juntas Comerciais estaduais,
persiste em banco SQLite local e oferece API REST e exportaÃ§Ã£o em mÃºltiplos formatos.

## LocalizaÃ§Ã£o

```
C:\Users\renat\skills\junta-leiloeiros\
â”œâ”€â”€ scripts/
â”‚   â”œâ”€â”€ scraper/
â”‚   â”‚   â”œâ”€â”€ base_scraper.py      â† classe abstrata
â”‚   â”‚   â”œâ”€â”€ states.py            â† registro dos 27 scrapers
â”‚   â”‚   â”œâ”€â”€ jucesp.py / jucerja.py / jucemg.py / jucec.py / jucis_df.py
â”‚   â”‚   â””â”€â”€ generic_scraper.py   â† usado pelos 22 estados restantes
â”‚   â”œâ”€â”€ db.py                    â† banco SQLite
â”‚   â”œâ”€â”€ run_all.py               â† orquestrador de scraping
â”‚   â”œâ”€â”€ serve_api.py             â† API FastAPI
â”‚   â”œâ”€â”€ export.py                â† exportaÃ§Ã£o
â”‚   â””â”€â”€ requirements.txt
â”œâ”€â”€ references/
â”‚   â”œâ”€â”€ juntas_urls.md           â† URLs e status de todas as 27 juntas
â”‚   â”œâ”€â”€ schema.md                â† schema do banco
â”‚   â””â”€â”€ legal.md                 â† base legal
â””â”€â”€ data/
    â”œâ”€â”€ leiloeiros.db            â† banco SQLite (criado no primeiro run)
    â”œâ”€â”€ scraping_log.json        â† log de cada coleta
    â””â”€â”€ exports/                 â† arquivos exportados
```

## InstalaÃ§Ã£o (Uma Vez)

```bash
pip install -r C:\Users\renat\skills\junta-leiloeiros\scripts\requirements.txt

## Para Sites Com Javascript:

playwright install chromium
```

## Coletar Dados

```bash

## Todos Os 27 Estados

python C:\Users\renat\skills\junta-leiloeiros\scripts\run_all.py

## Estados EspecÃ­ficos

python C:\Users\renat\skills\junta-leiloeiros\scripts\run_all.py --estado SP RJ MG

## Ver O Que Seria Coletado Sem Executar

python C:\Users\renat\skills\junta-leiloeiros\scripts\run_all.py --dry-run

## Controlar Paralelismo (Default: 5)

python C:\Users\renat\skills\junta-leiloeiros\scripts\run_all.py --concurrency 3
```

## EstatÃ­sticas Por Estado

python C:\Users\renat\skills\junta-leiloeiros\scripts\db.py

## Sql Direto

sqlite3 C:\Users\renat\skills\junta-leiloeiros\data\leiloeiros.db \
  "SELECT estado, COUNT(*) FROM leiloeiros GROUP BY estado"
```

## Servir Api Rest

```bash
python C:\Users\renat\skills\junta-leiloeiros\scripts\serve_api.py

## Docs Interativos: Http://Localhost:8000/Docs

```

**Endpoints:**
- `GET /leiloeiros?estado=SP&situacao=ATIVO&nome=silva&limit=100`
- `GET /leiloeiros/{estado}` â€” ex: `/leiloeiros/SP`
- `GET /busca?q=texto`
- `GET /stats`
- `GET /export/json`
- `GET /export/csv`

## Exportar Dados

```bash
python C:\Users\renat\skills\junta-leiloeiros\scripts\export.py --format csv
python C:\Users\renat\skills\junta-leiloeiros\scripts\export.py --format json
python C:\Users\renat\skills\junta-leiloeiros\scripts\export.py --format all
python C:\Users\renat\skills\junta-leiloeiros\scripts\export.py --format csv --estado SP
```

## Usar Em CÃ³digo Python

```python
import sys
sys.path.insert(0, r"C:\Users\renat\skills\junta-leiloeiros\scripts")
from db import Database

db = Database()
db.init()

## Todos Os Leiloeiros Ativos De Sp

leiloeiros = db.get_all(estado="SP", situacao="ATIVO")

## Busca Por Nome

resultados = db.search("silva")

## EstatÃ­sticas

stats = db.get_stats()
```

## Adicionar Scraper Customizado

Se um estado precisar de lÃ³gica especÃ­fica (ex: site usa JavaScript):

```python

## Scripts/Scraper/Meu_Estado.Py

from .base_scraper import AbstractJuntaScraper, Leiloeiro
from typing import List

class MeuEstadoScraper(AbstractJuntaScraper):
    estado = "XX"
    junta = "JUCEX"
    url = "https://www.jucex.xx.gov.br/leiloeiros"

    async def parse_leiloeiros(self) -> List[Leiloeiro]:
        soup = await self.fetch_page()
        if not soup:
            return []
        # lÃ³gica especÃ­fica aqui
        return [self.make_leiloeiro(nome="...", matricula="...")]
```

Registrar em `scripts/scraper/states.py`:
```python
from .meu_estado import MeuEstadoScraper
SCRAPERS["XX"] = MeuEstadoScraper
```

## ReferÃªncias

- URLs de todas as juntas: `references/juntas_urls.md`
- Schema do banco: `references/schema.md`
- Base legal da coleta: `references/legal.md`
- Log de coleta: `data/scraping_log.json`

## Best Practices

- Provide clear, specific context about your project and requirements
- Review all suggestions before applying them to production code
- Combine with other complementary skills for comprehensive analysis

## Common Pitfalls

- Using this skill for tasks outside its domain expertise
- Applying recommendations without understanding your specific context
- Not providing enough project context for accurate analysis

## Related Skills

- `leiloeiro-avaliacao` - Complementary skill for enhanced analysis
- `leiloeiro-edital` - Complementary skill for enhanced analysis
- `leiloeiro-ia` - Complementary skill for enhanced analysis
- `leiloeiro-juridico` - Complementary skill for enhanced analysis
- `leiloeiro-mercado` - Complementary skill for enhanced analysis

## Limitations
- Use this skill only when the task clearly matches the scope described above.
- Do not treat the output as a substitute for environment-specific validation, testing, or expert review.
- Stop and ask for clarification if required inputs, permissions, safety boundaries, or success criteria are missing.


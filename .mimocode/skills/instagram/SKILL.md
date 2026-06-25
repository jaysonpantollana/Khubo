---
name: instagram
description: "Use when working with instagram"
---

---
name: instagram
description: Integracao completa com Instagram via Graph API. Publicacao, analytics, comentarios, DMs, hashtags, agendamento, templates e gestao de contas Business/Creator.
risk: critical
source: community
date_added: '2026-03-06'
author: renat
tags:
- social-media
- instagram
- graph-api
- content
tools:
- claude-code
- antigravity
- cursor
- gemini-cli
- codex-cli
---

# Skill: Instagram Integration

## Overview

Integracao completa com Instagram via Graph API. Publicacao, analytics, comentarios, DMs, hashtags, agendamento, templates e gestao de contas Business/Creator.

## When to Use This Skill

- When the user mentions "instagram" or related topics
- When the user mentions "ig" or related topics
- When the user mentions "post instagram" or related topics
- When the user mentions "publicar instagram" or related topics
- When the user mentions "reels instagram" or related topics
- When the user mentions "stories instagram" or related topics

## Do Not Use This Skill When

- The task is unrelated to instagram
- A simpler, more specific tool can handle the request
- The user needs general-purpose assistance without domain expertise

## How It Works

Controle completo da conta Instagram via Graph API. PublicaÃ§Ã£o, comunidade, analytics,
DMs, hashtags, templates e dashboard â€” tudo gerido com governanÃ§a (rate limits, audit log,
confirmaÃ§Ãµes antes de aÃ§Ãµes pÃºblicas).

## Resumo RÃ¡pido

| Ãrea | Scripts | O que faz |
|------|---------|-----------|
| **Setup** | `account_setup.py`, `auth.py` | Configurar conta, OAuth, token |
| **PublicaÃ§Ã£o** | `publish.py`, `schedule.py` | Publicar foto/vÃ­deo/reel/story/carrossel, agendar |
| **Comunidade** | `comments.py`, `messages.py` | ComentÃ¡rios, DMs, menÃ§Ãµes |
| **Analytics** | `insights.py`, `analyze.py` | MÃ©tricas, melhores horÃ¡rios, top posts |
| **Hashtags** | `hashtags.py` | Pesquisa e tracking |
| **InteligÃªncia** | `templates.py`, `analyze.py` | Templates de conteÃºdo, tendÃªncias |
| **Infra** | `export.py`, `serve_api.py`, `run_all.py` | Exportar, dashboard, sync |
| **Leitura** | `profile.py`, `media.py` | Perfil, listar mÃ­dia |

## LocalizaÃ§Ã£o

```
C:\Users\renat\skills\instagram\
â”œâ”€â”€ SKILL.md
â”œâ”€â”€ scripts/
â”‚   â”œâ”€â”€ requirements.txt
â”‚   â”‚  # â”€â”€ CORE â”€â”€
â”‚   â”œâ”€â”€ config.py                     # Paths, constantes, specs de mÃ­dia
â”‚   â”œâ”€â”€ db.py                         # SQLite: accounts, posts, comments, insights
â”‚   â”œâ”€â”€ auth.py                       # OAuth 2.0, token storage/refresh
â”‚   â”œâ”€â”€ api_client.py                 # Instagram Graph API wrapper + retry
â”‚   â”œâ”€â”€ governance.py                 # Rate limits, audit log, confirmaÃ§Ãµes
â”‚   â”‚  # â”€â”€ FEATURES â”€â”€
â”‚   â”œâ”€â”€ account_setup.py              # DetecÃ§Ã£o conta, migraÃ§Ã£o, verificaÃ§Ã£o
â”‚   â”œâ”€â”€ publish.py                    # Publicar + upload local via Imgur
â”‚   â”œâ”€â”€ schedule.py                   # Orquestrador: approved â†’ published
â”‚   â”œâ”€â”€ comments.py                   # Ler/responder/deletar comentÃ¡rios
â”‚   â”œâ”€â”€ messages.py                   # DMs (enviar/receber/listar)
â”‚   â”œâ”€â”€ insights.py                   # Fetch + store mÃ©tricas
â”‚   â”œâ”€â”€ hashtags.py                   # Pesquisa + tracking
â”‚   â”œâ”€â”€ profile.py                    # Ver/atualizar perfil
â”‚   â”œâ”€â”€ media.py                      # Listar mÃ­dia, detalhes
â”‚   â”‚  # â”€â”€ INTELIGÃŠNCIA â”€â”€
â”‚   â”œâ”€â”€ templates.py                  # Templates de caption/hashtags
â”‚   â”œâ”€â”€ analyze.py                    # Melhores horÃ¡rios, top posts
â”‚   â”‚  # â”€â”€ INFRA â”€â”€
â”‚   â”œâ”€â”€ export.py                     # Exportar JSON/CSV/JSONL
â”‚   â”œâ”€â”€ serve_api.py                  # FastAPI + dashboard
â”‚   â””â”€â”€ run_all.py                    # Sync completo
â”œâ”€â”€ references/
â”‚   â”œâ”€â”€ graph_api.md                  # Endpoints e parÃ¢metros
â”‚   â”œâ”€â”€ permissions.md                # Scopes OAuth por feature
â”‚   â”œâ”€â”€ rate_limits.md                # Limites 2025
â”‚   â”œâ”€â”€ account_types.md              # Business vs Creator
â”‚   â”œâ”€â”€ publishing_guide.md           # Specs de mÃ­dia
â”‚   â”œâ”€â”€ setup_walkthrough.md          # Guia Meta App
â”‚   â””â”€â”€ schema.md                     # ER diagram
â”œâ”€â”€ static/
â”‚   â””â”€â”€ dashboard.html                # Dashboard Chart.js
â””â”€â”€ data/
    

## InstalaÃ§Ã£o (Uma Vez)

```bash
pip install -r C:\Users\renat\skills\instagram\scripts\requirements.txt
```

## ConfiguraÃ§Ã£o Inicial

```bash

## 1. Verificar Tipo De Conta Instagram

python C:\Users\renat\skills\instagram\scripts\account_setup.py --check

## 2. Configurar Oauth (Abre Browser Para AutorizaÃ§Ã£o)

python C:\Users\renat\skills\instagram\scripts\auth.py --setup

## 3. Verificar Se EstÃ¡ Tudo Funcionando

python C:\Users\renat\skills\instagram\scripts\profile.py --view
```

Se a conta for pessoal, o script `account_setup.py --guide` dÃ¡ instruÃ§Ãµes de migraÃ§Ã£o
para Business ou Creator.

## Foto (Aceita Arquivo Local â€” Faz Upload AutomÃ¡tico Via Imgur)

python C:\Users\renat\skills\instagram\scripts\publish.py --type photo --image caminho/foto.jpg --caption "Texto do post"

## VÃ­deo

python C:\Users\renat\skills\instagram\scripts\publish.py --type video --video caminho/video.mp4 --caption "Meu vÃ­deo"

## Reel

python C:\Users\renat\skills\instagram\scripts\publish.py --type reel --video caminho/reel.mp4 --caption "Novo reel!"

## Story

python C:\Users\renat\skills\instagram\scripts\publish.py --type story --image caminho/story.jpg

## Carrossel (2-10 Imagens)

python C:\Users\renat\skills\instagram\scripts\publish.py --type carousel --images img1.jpg img2.jpg img3.jpg --caption "Carrossel"

## Criar Como Rascunho (NÃ£o Publica Imediatamente)

python C:\Users\renat\skills\instagram\scripts\publish.py --type photo --image foto.jpg --caption "Texto" --draft

## Aprovar Rascunho Para PublicaÃ§Ã£o

python C:\Users\renat\skills\instagram\scripts\publish.py --approve --id 5
```

## Agendar PublicaÃ§Ã£o Futura

python C:\Users\renat\skills\instagram\scripts\schedule.py --type photo --image foto.jpg --caption "Post agendado" --at "2026-03-01T10:00"

## Listar Posts Agendados

python C:\Users\renat\skills\instagram\scripts\schedule.py --list

## Processar Posts Prontos Para Publicar

python C:\Users\renat\skills\instagram\scripts\schedule.py --process

## Cancelar Agendamento

python C:\Users\renat\skills\instagram\scripts\schedule.py --cancel --id 5
```

## Listar ComentÃ¡rios De Um Post

python C:\Users\renat\skills\instagram\scripts\comments.py --list --media-id 12345

## Responder A Um ComentÃ¡rio

python C:\Users\renat\skills\instagram\scripts\comments.py --reply --comment-id 67890 --text "Obrigado!"

## Deletar ComentÃ¡rio

python C:\Users\renat\skills\instagram\scripts\comments.py --delete --comment-id 67890

## Ver MenÃ§Ãµes

python C:\Users\renat\skills\instagram\scripts\comments.py --mentions

## ComentÃ¡rios NÃ£o Respondidos

python C:\Users\renat\skills\instagram\scripts\comments.py --unreplied
```

## Enviar Dm

python C:\Users\renat\skills\instagram\scripts\messages.py --send --user-id 12345 --text "OlÃ¡!"

## Listar Conversas

python C:\Users\renat\skills\instagram\scripts\messages.py --conversations

## Ver Mensagens De Uma Conversa

python C:\Users\renat\skills\instagram\scripts\messages.py --thread --conversation-id 12345
```

## MÃ©tricas De Um Post EspecÃ­fico

python C:\Users\renat\skills\instagram\scripts\insights.py --media --media-id 12345

## MÃ©tricas Da Conta (Ãšltimos 7 Dias)

python C:\Users\renat\skills\instagram\scripts\insights.py --user --period day --since 7

## Buscar E Salvar Insights De Todos Os Posts Recentes

python C:\Users\renat\skills\instagram\scripts\insights.py --fetch-all --limit 20
```

## Melhores HorÃ¡rios Para Postar (Baseado Nos Seus Dados)

python C:\Users\renat\skills\instagram\scripts\analyze.py --best-times

## Top Posts Por Engajamento

python C:\Users\renat\skills\instagram\scripts\analyze.py --top-posts --limit 10

## TendÃªncias De Crescimento

python C:\Users\renat\skills\instagram\scripts\analyze.py --growth --period 30
```

## Buscar Posts Recentes Com Uma Hashtag

python C:\Users\renat\skills\instagram\scripts\hashtags.py --search "artificialintelligence" --limit 25

## Top Posts De Uma Hashtag

python C:\Users\renat\skills\instagram\scripts\hashtags.py --top "tecnologia"

## Info Da Hashtag (Contagem De Posts)

python C:\Users\renat\skills\instagram\scripts\hashtags.py --info "marketing"
```

## Criar Template

python C:\Users\renat\skills\instagram\scripts\templates.py --create --name "promo" --caption "Nova promoÃ§Ã£o: {produto}! {desconto}% OFF" --hashtags "#oferta,#desconto,#promoÃ§Ã£o"

## Listar Templates

python C:\Users\renat\skills\instagram\scripts\templates.py --list

## Usar Template Em Um Post

python C:\Users\renat\skills\instagram\scripts\publish.py --type photo --image foto.jpg --template promo --vars produto="TÃªnis" desconto=30
```

## Ver Perfil

python C:\Users\renat\skills\instagram\scripts\profile.py --view

## Listar Posts Recentes

python C:\Users\renat\skills\instagram\scripts\media.py --list --limit 10

## Detalhes De Um Post

python C:\Users\renat\skills\instagram\scripts\media.py --details --media-id 12345
```

## Exportar Analytics Para Csv

python C:\Users\renat\skills\instagram\scripts\export.py --type insights --format csv

## Exportar ComentÃ¡rios

python C:\Users\renat\skills\instagram\scripts\export.py --type comments --format json

## Exportar Tudo

python C:\Users\renat\skills\instagram\scripts\export.py --type all --format csv

## Iniciar Dashboard Web

python C:\Users\renat\skills\instagram\scripts\serve_api.py

## Acesse: Http://Localhost:8000/Dashboard

```

## Status Da AutenticaÃ§Ã£o

python C:\Users\renat\skills\instagram\scripts\auth.py --status

## Sync Completo (Busca Perfil + MÃ­dia + Insights + ComentÃ¡rios)

python C:\Users\renat\skills\instagram\scripts\run_all.py

## Sync Parcial

python C:\Users\renat\skills\instagram\scripts\run_all.py --only media insights
```

## Rate Limits

A skill rastreia automaticamente os rate limits da API:
- **200 requests/hora** por conta
- **25 publicaÃ§Ãµes/dia** por conta
- **30 hashtags Ãºnicas/semana** por conta
- **200 DMs/hora** por conta

Quando em 90% do limite, a skill emite warnings. Se exceder, bloqueia a aÃ§Ã£o e informa
quanto tempo esperar.

## ConfirmaÃ§Ãµes

AÃ§Ãµes que afetam conteÃºdo pÃºblico requerem confirmaÃ§Ã£o:
- **PUBLISH**: Publicar foto/vÃ­deo/reel/story/carrossel
- **DELETE**: Deletar comentÃ¡rio
- **MESSAGE**: Enviar DM
- **ENGAGE**: Responder comentÃ¡rio, ocultar comentÃ¡rio

O script retorna os detalhes da aÃ§Ã£o e pede confirmaÃ§Ã£o antes de executar.

## Audit Log

Todas as aÃ§Ãµes que modificam dados sÃ£o logadas no banco SQLite (`action_log` table):
- Timestamp, aÃ§Ã£o, parÃ¢metros, resultado, status de confirmaÃ§Ã£o
- Consultar via: `python C:\Users\renat\skills\instagram\scripts\db.py`

## Token Auto-Refresh

O token OAuth (60 dias) Ã© renovado automaticamente quando estÃ¡ a 7 dias de expirar.
Sem intervenÃ§Ã£o manual necessÃ¡ria.

## LimitaÃ§Ãµes Da Api

Coisas que a Instagram Graph API **nÃ£o permite**:
- Deletar posts jÃ¡ publicados
- Editar captions apÃ³s publicar
- Aplicar filtros via API
- Postar de contas pessoais (sÃ³ Business/Creator)
- DMs fora da janela de 24hrs (usuÃ¡rio precisa ter interagido primeiro)
- Fotos em formato diferente de JPEG (auto-conversÃ£o feita pelos scripts)

## "Quero Publicar Uma Foto"

```bash
python C:\Users\renat\skills\instagram\scripts\publish.py --type photo --image foto.jpg --caption "Texto"
```

## "Me Mostra Meus Analytics"

```bash
python C:\Users\renat\skills\instagram\scripts\run_all.py --only insights
python C:\Users\renat\skills\instagram\scripts\analyze.py --summary
```

## "Qual O Melhor HorÃ¡rio Para Postar?"

```bash
python C:\Users\renat\skills\instagram\scripts\analyze.py --best-times
```

## "Responde Esse ComentÃ¡rio"

```bash
python C:\Users\renat\skills\instagram\scripts\comments.py --reply --comment-id ID --text "Resposta"
```

## "Sincroniza Tudo"

```bash
python C:\Users\renat\skills\instagram\scripts\run_all.py
```

## "Abre O Dashboard"

```bash
python C:\Users\renat\skills\instagram\scripts\serve_api.py
```

## ReferÃªncias

Consultar quando precisar de detalhes:
- `references/graph_api.md` â€” Endpoints, parÃ¢metros e responses da API
- `references/publishing_guide.md` â€” Specs de mÃ­dia (dimensÃµes, formatos, tamanhos)
- `references/rate_limits.md` â€” Rate limits detalhados e estratÃ©gias
- `references/account_types.md` â€” DiferenÃ§as Business vs Creator, migraÃ§Ã£o
- `references/permissions.md` â€” Scopes OAuth necessÃ¡rios por feature
- `references/setup_walkthrough.md` â€” Guia passo-a-passo de setup do Meta App
- `references/schema.md` â€” Schema do banco SQLite (ER diagram, campos, Ã­ndices, queries)

## Best Practices

- Provide clear, specific context about your project and requirements
- Review all suggestions before applying them to production code
- Combine with other complementary skills for comprehensive analysis

## Common Pitfalls

- Using this skill for tasks outside its domain expertise
- Applying recommendations without understanding your specific context
- Not providing enough project context for accurate analysis

## Related Skills

- `social-orchestrator` - Complementary skill for enhanced analysis
- `telegram` - Complementary skill for enhanced analysis
- `whatsapp-cloud-api` - Complementary skill for enhanced analysis

## Limitations
- Use this skill only when the task clearly matches the scope described above.
- Do not treat the output as a substitute for environment-specific validation, testing, or expert review.
- Stop and ask for clarification if required inputs, permissions, safety boundaries, or success criteria are missing.


---
name: crossframe-casebook
description: "Use when working with crossframe-casebook"
---

---
name: crossframe-casebook
description: "Use when CrossFrame Suite routes explicit Chinese casebook work: turning materials into reusable cases, anonymized entries, mechanisms, and retrieval indexes."
category: content
risk: safe
source: community
source_repo: xi-kari/crossframe-skill
source_type: community
date_added: 2026-06-16
author: xi-kari
license: MIT
license_source: https://github.com/xi-kari/crossframe-skill/blob/main/LICENSE
tools:
  - "Agent Skills"
  - Codex
  - Claude
tags:
  - crossframe
  - chinese
  - casebook
  - case-study
  - knowledge-base
---
# CrossFrame Casebook



## When to Use This Skill

- Use when `crossframe-suite` routes explicit CrossFrame materials into reusable casebook entries, anonymized case records, mechanism extraction, or retrieval indexes.
- Use when the goal is future reuse rather than immediate advice.
- Do not use independently unless the user explicitly names this sibling skill.

## Packaged Source Note

This AAS-ready copy preserves the original CrossFrame skill body below. Chinese remains the canonical semantic layer; English metadata is only for discovery, installation, and repository review.

## Limitations

- The skill body is intentionally Chinese-canonical; English metadata is for discovery and does not replace the original Chinese terms.
- Use only after explicit CrossFrame invocation or `crossframe-suite` routing; do not apply it as a generic default reasoning layer.
- It structures analysis, drafting, and review, but does not replace source verification, domain expertise, or legal, medical, or financial judgment.

> **æœ¬ skill ä¸ç‹¬ç«‹è§¦å‘ã€‚** æ‰€æœ‰ CrossFrame ä»»åŠ¡ç»Ÿä¸€ä»Ž `crossframe-suite` å…¥å£è°ƒåº¦ã€‚ç”¨æˆ·æ— éœ€ç›´æŽ¥è°ƒç”¨æœ¬ skillï¼›suite æ ¹æ®è·¯ç”±è§„åˆ™åœ¨éœ€è¦æ—¶è‡ªåŠ¨åŠ è½½ã€‚

å¦‚æžœæ¡ˆä¾‹æ²‰æ·€ä¹‹åŽè¿˜è¦æˆæ–‡ã€æ•™å­¦ã€è¾©è®ºæˆ–å…¬å…±/ç»„ç»‡ä¸“é¡¹åˆ¤æ–­ï¼Œå…ˆè¯»å– `../crossframe-suite/SKILL.md` åšæ€»è°ƒåº¦ï¼›æœ¬ skill åªè´Ÿè´£æ¡ˆä¾‹åº“æ¡ç›®å’Œå¯å¤ç”¨ææ–™ç»“æž„ã€‚

CrossFrame Casebook æ˜¯ `crossframe` çš„å¹³è¡Œæ¡ˆä¾‹åº“ skillï¼Œä¸æ›¿ä»£ `crossframe`ã€‚å®ƒåªè´Ÿè´£æŠŠææ–™æ•´ç†æˆå¯å¤ç”¨æ¡ˆä¾‹æ¡ç›®ï¼šå…ˆå®ˆä½äº‹å®žã€æ¥æºå’Œéšç§è¾¹ç•Œï¼Œå†æŠ½å–å°ºåº¦çª—å£ã€æœºåˆ¶é“¾ã€è´£ä»»é“¾ã€åå‘æ¡ä»¶ã€å¯å¤ç”¨æ¦‚å¿µå’ŒåŽç»­è§‚å¯Ÿã€‚

ä¸­æ–‡ä¸ºæƒå¨è¯­ä¹‰ã€‚è‹±æ–‡åªç”¨äºŽ skill idã€æ–‡ä»¶åã€å­—æ®µåæˆ–å¯¹å¤–ç®€ä»‹ï¼›é‡åˆ°ä¸­è‹±æ–‡å†²çªï¼Œä»¥ä¸­æ–‡æœ¯è¯­ä¸ºå‡†ã€‚

## å¿…é¡»æ‰§è¡Œçš„é¡ºåº

1. è¯»å– `../crossframe/SKILL.md`ï¼Œç¡®è®¤æœ¬æ¬¡ææ–™åº”éµå®ˆçš„ CrossFrame åŸºæœ¬é—¸é—¨ä¸Žè¡¨è¾¾è¾¹ç•Œã€‚
2. è¯»å– `../crossframe/references/read-routing-map.md`ï¼ŒæŒ‰ææ–™ä¸»é¢˜é€‰æ‹©éœ€è¦å¯¹é½çš„ CrossFrame protocolã€æ¦‚å¿µå¡å’Œåˆ¤æ–­æ¡£ä½ã€‚
3. å¦‚æžœææ–™è§¦å‘é«˜è´£ä»»ã€å…¬å…±åˆ¶åº¦ã€äº²å¯†å…³ç³»ã€é•¿æœŸæ¼”åŒ–ã€æ¡†æž¶æ²»ç†ã€AI çŽ°å®žéªŒè¯ã€å¼±ä¿¡å·/ä¸é€æ˜Žã€æ— æ³•é€€å‡ºã€å·¥å…·åŒ–ã€éšå–»/æ¥æºé€æ˜Žæˆ–æ–‡ç« è¾“å‡ºï¼Œå¿…é¡»è¿½åŠ è¯»å– `../crossframe/references/continuity-bundles.md`ï¼Œå¹¶æŒ‰éœ€ä½¿ç”¨ `../crossframe/worksheets/source-continuity-check.md`ï¼›æœªå®Œæˆè”è¯»æ—¶åªèƒ½é™æ¡£ã€‚
4. å¤ç”¨ `../crossframe/templates/read-state-capsule.md` è§„å®šçš„ `v5-read-state-capsule`ï¼Œå¹¶åœ¨é«˜è´£ä»»ã€å…¬å…±ã€AI/è¿‡ç¨‹æ€§äº§ç‰©ã€ç”Ÿå‘½å‘¨æœŸã€æ— æ³•é€€å‡ºä¸»ä½“æˆ–æ–‡ç« è¾“å‡ºåœºæ™¯æ‰§è¡Œ `../crossframe/worksheets/source-anchor-integrity-check.md`ã€‚å¦‚æžœèƒ¶å›Šç¼ºå¤±ï¼Œå›žåˆ° `../crossframe/SKILL.md` è¡¥é½ï¼›æœ¬ skill ä¸é‡æ–°å‘æ˜Žæºè·¯ç”±ã€‚
5. è¯»å– `protocols/material-boundary-protocol.md`ï¼Œå…ˆåšæ¥æºã€äº‹å®žã€æŽ¨æµ‹ã€éšç§å’Œå¯å…¬å¼€æ€§åˆ†å±‚ã€‚
6. è¯»å– `protocols/casebook-build-protocol.md`ï¼Œå†³å®šæœ¬æ¬¡æ˜¯æ–°å»ºæ¡ˆä¾‹ã€æ¸…æ´—æ—§æ¡ˆä¾‹ã€æ‰¹é‡ç´¢å¼•ã€æ¯”è¾ƒæ¡ˆä¾‹ï¼Œè¿˜æ˜¯æŠŠå¤ç›˜è½¬æˆæ¡ˆä¾‹åº“ã€‚
7. è¯»å– `references/casebook-field-guide.md`ï¼Œä¿è¯æ¯ä¸ªæ¡ˆä¾‹è‡³å°‘æ²‰æ·€ä¹é¡¹ï¼šæ¡ˆä¾‹æ‘˜è¦ã€äº‹å®žè¾¹ç•Œã€ææ–™æ¥æºã€å°ºåº¦çª—å£ã€æœºåˆ¶é“¾ã€è´£ä»»é“¾ã€åå‘æ¡ä»¶ã€å¯å¤ç”¨æ¦‚å¿µã€åŽç»­è§‚å¯Ÿã€‚
8. è¯»å– `references/privacy-and-redaction-rules.md`ï¼Œå¯¹ä¸ªäººã€ç»„ç»‡ã€åœ°åã€æ—¶é—´ã€èŠå¤©åŽŸæ–‡ã€æˆªå›¾ã€é“¾æŽ¥å’Œå¯è¯†åˆ«ç»†èŠ‚åšè„±æ•ã€‚
9. è¯»å– `protocols/mechanism-extraction-protocol.md`ï¼Œä»Žæ•…äº‹å™è¿°ä¸­æŠ½å‡ºæœºåˆ¶é“¾ä¸Žè´£ä»»é“¾ï¼Œé¿å…åªå†™å‰§æƒ…æˆ–å †æ¦‚å¿µã€‚
10. æŒ‰ä»»åŠ¡è¯»å–æ¨¡æ¿ï¼šå•æ¡ˆä¾‹è¯» `templates/casebook-entry-template.md`ï¼›æ‰¹é‡æ¡ˆä¾‹è¯» `templates/casebook-index-template.md`ï¼›éœ€è¦æ¥æºå®¡è®¡è¯» `templates/redacted-source-ledger-template.md`ã€‚
11. è¾“å‡ºå‰åš smoke checkï¼šä¸å¾—æŠŠçŒœæµ‹å½“äº‹å®žã€ä¸å¾—æ³„éœ²éšç§ã€ä¸å¾—åªå†™æ•…äº‹ä¸æŠ½æœºåˆ¶ã€ä¸å¾—æ¦‚å¿µå †ç Œã€‚

## è¾“å…¥å¤„ç†

- èŠå¤©è®°å½•ï¼šä¿ç•™äº’åŠ¨ç»“æž„ã€è§’è‰²å…³ç³»ã€å¯è§‚å¯Ÿè¡Œä¸ºå’Œæ—¶é—´é¡ºåºï¼›åˆ é™¤æˆ–æ³›åŒ–å§“åã€è´¦å·ã€è”ç³»æ–¹å¼ã€ç²¾ç¡®ä½ç½®å’Œæ— å…³ç§å¯†ç»†èŠ‚ã€‚
- ç»„ç»‡ææ–™ï¼šåŒºåˆ†æ­£å¼åˆ¶åº¦ã€å£å¤´æƒ¯ä¾‹ã€ä¼šè®®çºªè¦ã€é¡¹ç›®è®°å½•ã€ä¸ªäººæ„Ÿå—å’ŒäºŒæ‰‹è½¬è¿°ã€‚
- é¡¹ç›®å¤ç›˜ï¼šåŒºåˆ†ç»“æžœäº‹å®žã€è¿‡ç¨‹äº‹å®žã€è§£é‡Šã€è´£ä»»å½’å› ã€è¡¥æ•‘åŠ¨ä½œå’ŒæœªéªŒè¯å‡è®¾ã€‚
- å…¬å…±äº‰è®®ï¼šåŒºåˆ†å…¬å¼€æ¥æºã€å½“äº‹äººè¯´æ³•ã€åª’ä½“æŠ¥é“ã€å¹³å°è§„åˆ™ã€æ³•å¾‹äº‹å®žã€èˆ†è®ºè§£é‡Šå’Œæ¨¡åž‹æŽ¨æµ‹ï¼›æ¶‰åŠæœ€æ–°äº‹å®žæˆ–çœŸå®žäººç‰©ç»„ç»‡æ—¶å¿…é¡»æŸ¥æºã€‚

## é»˜è®¤è¾“å‡º

é»˜è®¤è¾“å‡ºä¸€ä¸ªæˆ–å¤šä¸ª `æ¡ˆä¾‹åº“æ¡ç›®`ã€‚æ¯ä¸ªæ¡ç›®è‡³å°‘åŒ…å«ï¼š

- æ¡ˆä¾‹æ‘˜è¦
- äº‹å®žè¾¹ç•Œ
- ææ–™æ¥æº
- å°ºåº¦çª—å£
- æœºåˆ¶é“¾
- è´£ä»»é“¾
- åå‘æ¡ä»¶
- å¯å¤ç”¨æ¦‚å¿µ
- åŽç»­è§‚å¯Ÿ

å¦‚ç”¨æˆ·è¦æ±‚å¯ç»´æŠ¤æ¡ˆä¾‹åº“ï¼Œå†è¿½åŠ  `æ¡ˆä¾‹ç´¢å¼•`ã€`æ ‡ç­¾`ã€`ç›¸ä¼¼æ¡ˆä¾‹`ã€`å¤ç”¨åœºæ™¯` å’Œ `æ›´æ–°è®°å½•`ã€‚

## ç¡¬è§„åˆ™

- ä¸å‡†å¤åˆ¶ `crossframe` å…¨æ–‡ï¼›åªé€šè¿‡ç›¸å¯¹è·¯å¾„è¯»å– canonical skill ä¸Žè·¯ç”±å›¾ã€‚
- ä¸å‡†æŠŠèŠå¤©åŽŸæ–‡æˆ–ä¸ªäººä¿¡æ¯ç›´æŽ¥æ²‰æ·€ä¸ºæ¡ˆä¾‹èµ„äº§ï¼Œé™¤éžç”¨æˆ·æ˜Žç¡®è¦æ±‚ä¸”å·²ç¡®è®¤å¯å…¬å¼€èŒƒå›´ã€‚
- ä¸å‡†æŠŠçŒœæµ‹ã€åŠ¨æœºæŽ¨æ–­ã€äºŒæ‰‹è¯„ä»·å†™æˆäº‹å®žã€‚
- ä¸å‡†åªè®²æ•…äº‹ï¼›æ¯ä¸ªæ¡ˆä¾‹å¿…é¡»æŠ½å‡ºè‡³å°‘ä¸€æ¡æœºåˆ¶é“¾å’Œä¸€æ¡è´£ä»»é“¾ã€‚
- ä¸å‡†ç”¨ CrossFrame æœ¯è¯­æ›¿ä»£æ¡ˆä¾‹äº‹å®žï¼›æ¦‚å¿µå¿…é¡»æœåŠ¡äºŽå¤ç”¨ï¼Œè€Œä¸æ˜¯è£…é¥°è¾“å‡ºã€‚
- ä¸å‡†æŠŠæ¡ˆä¾‹åº“å†™æˆäººæ ¼å®¡åˆ¤ã€ç»„ç»‡å®šç½ªã€èˆ†è®ºå®£åˆ¤æˆ–åˆè§„èƒŒä¹¦ã€‚
- ä¸å‡†ç”¨å…¬å…±å°ºåº¦æŠ¹æŽ‰ä¸ªäººä¼¤å®³ã€ç»„ç»‡å¤±èŒã€è¯æ®ç¼ºå£æˆ–è´£ä»»é“¾ã€‚
- è¯æ®ä¸è¶³ä½†é£Žé™©ç´§æ€¥æ—¶ï¼Œåªèƒ½ç»™ä½Žé£Žé™©ã€å¯æ’¤å›žã€å¯è§‚å¯Ÿçš„åŽç»­è§‚å¯Ÿé¡¹ã€‚

## è´¨é‡é—¨

ä¸€æ¬¡åˆæ ¼çš„ casebook è¾“å‡ºå¿…é¡»èƒ½å›žç­”ï¼š

- è¿™ä¸ªæ¡ˆä¾‹å¯ä»¥å¤ç”¨æ¥è¯†åˆ«ä»€ä¹ˆç»“æž„é—®é¢˜ï¼Ÿ
- å“ªäº›ææ–™æ˜¯äº‹å®žï¼Œå“ªäº›åªæ˜¯è§£é‡Šæˆ–çŒœæµ‹ï¼Ÿ
- è¿™ä¸ªæ¡ˆä¾‹çš„æ¥æºæ˜¯å¦å¯è¿½æº¯ã€å¯è„±æ•ã€å¯å…¬å¼€ï¼Ÿ
- å½“å‰ä½¿ç”¨çš„æ˜¯å“ªä¸€ä¸ªå°ºåº¦çª—å£ï¼Œæ˜¯å¦å‘ç”Ÿäº†ä¸å½“å°ºåº¦è½¬ç§»ï¼Ÿ
- æœºåˆ¶é“¾å¦‚ä½•ä»Žæ¡ä»¶ã€è¡Œä¸ºã€åé¦ˆèµ°å‘ç»“æžœï¼Ÿ
- è´£ä»»é“¾ä¸­è°æœ‰æ”¹å˜æ¡ä»¶çš„æƒåŠ›ï¼Œè°åœ¨æ‰¿æ‹…æˆæœ¬ï¼Ÿ
- ä»€ä¹ˆåå‘æ¡ä»¶ä¼šæŽ¨ç¿»æˆ–é™æ¡£æœ¬æ¡ˆä¾‹åˆ¤æ–­ï¼Ÿ
- å“ªäº›æ¦‚å¿µçœŸæ­£æé«˜å¤ç”¨æ€§ï¼Œå“ªäº›åªæ˜¯æœ¯è¯­å †ç Œï¼Ÿ
- ä¸‹ä¸€æ¬¡é‡åˆ°ç›¸ä¼¼ææ–™æ—¶ï¼Œåº”è¯¥è§‚å¯Ÿä»€ä¹ˆä¿¡å·ï¼Ÿ


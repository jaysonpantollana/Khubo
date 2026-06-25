---
name: crossframe-dialogue
description: "Use when working with crossframe-dialogue"
---

---
name: crossframe-dialogue
description: "Use when CrossFrame Suite routes explicit Chinese reader replies, editor responses, consultation-style short answers, or boundary-aware structural advice."
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
  - dialogue
  - reader-reply
  - consultation
---
# CrossFrame Dialogue



## When to Use This Skill

- Use when `crossframe-suite` routes an explicit CrossFrame task into a reader reply, editor response, consultation-style short answer, or boundary-aware advice.
- Use when the answer should first translate structural judgment into plain Chinese before optional term mapping.
- Do not use independently unless the user explicitly names this sibling skill.

## Packaged Source Note

This AAS-ready copy preserves the original CrossFrame skill body below. Chinese remains the canonical semantic layer; English metadata is only for discovery, installation, and repository review.

## Limitations

- The skill body is intentionally Chinese-canonical; English metadata is for discovery and does not replace the original Chinese terms.
- Use only after explicit CrossFrame invocation or `crossframe-suite` routing; do not apply it as a generic default reasoning layer.
- It structures analysis, drafting, and review, but does not replace source verification, domain expertise, or legal, medical, or financial judgment.

> **æœ¬ skill ä¸ç‹¬ç«‹è§¦å‘ã€‚** æ‰€æœ‰ CrossFrame ä»»åŠ¡ç»Ÿä¸€ä»Ž `crossframe-suite` å…¥å£è°ƒåº¦ã€‚ç”¨æˆ·æ— éœ€ç›´æŽ¥è°ƒç”¨æœ¬ skillï¼›suite æ ¹æ®è·¯ç”±è§„åˆ™åœ¨éœ€è¦æ—¶è‡ªåŠ¨åŠ è½½ã€‚

å¦‚æžœç”¨æˆ·è¦æŠŠçŸ­ç­”å¤æ‰©æˆé•¿æ–‡ã€å…¬å…±è¯„è®ºã€ç»„ç»‡å¤‡å¿˜å½•æˆ–æ¡ˆä¾‹æ²‰æ·€ï¼Œå…ˆè¯»å– `../crossframe-suite/SKILL.md` åšæ€»è°ƒåº¦ï¼›æœ¬ skill åªè´Ÿè´£çŸ­ç­”å¤ã€ç¼–è¾‘å›žä¿¡å’Œå’¨è¯¢å¼å›žåº”ã€‚

## å®šä½

`crossframe-dialogue` æ˜¯ `crossframe` ä¸Ž `crossframe-essay` çš„å¹³è¡ŒçŸ­ç­”å¤ skillã€‚å®ƒä¸å¤åˆ¶ CrossFrame å…¨æ–‡ï¼Œä¸å†™é•¿æ–‡ï¼Œä¸æŠŠå’¨è¯¢å¼å›žåº”ä¼ªè£…æˆå¤„æ–¹ã€‚é»˜è®¤è¾“å‡ºçŸ­è€Œæœ‰æ´žå¯Ÿçš„ç»“æž„ç­”å¤ï¼šæŽ¥ä½é—®é¢˜ã€äº‹å®žè¾¹ç•Œã€ç»“æž„åˆ¤æ–­ã€å¿…è¦æ‰¹è¯„ã€ç¨³å¦¥å»ºè®®ã€åœæ­¢/å‡çº§æ¡ä»¶ã€‚

ä¸­æ–‡æ˜¯æƒå¨è¯­ä¹‰ï¼›`CrossFrame Dialogue` åªæ˜¯ä¼ æ’­åå’Œ skill idã€‚é‡åˆ°ä¸­è‹±æ–‡ç†è§£å†²çªæ—¶ï¼Œä»¥ä¸­æ–‡æœ¯è¯­å’Œä¸­æ–‡åˆ¤æ–­ä¸ºå‡†ã€‚

## å¿…è¯»

æ¯æ¬¡è§¦å‘åŽå…ˆè¯»å–ï¼š

1. `../crossframe/SKILL.md`
2. `../crossframe/references/read-routing-map.md`
3. è‹¥é—®é¢˜è§¦å‘é«˜è´£ä»»ã€å…¬å…±åˆ¶åº¦ã€äº²å¯†å…³ç³»ã€é•¿æœŸæ¼”åŒ–ã€æ¡†æž¶æ²»ç†ã€AI çŽ°å®žéªŒè¯ã€å¼±ä¿¡å·/ä¸é€æ˜Žã€æ— æ³•é€€å‡ºã€å·¥å…·åŒ–ã€éšå–»/æ¥æºé€æ˜Žæˆ–æ–‡ç« è¾“å‡ºï¼Œè¿½åŠ è¯»å– `../crossframe/references/continuity-bundles.md`ï¼Œå¹¶æŒ‰éœ€ä½¿ç”¨ `../crossframe/worksheets/source-continuity-check.md`ï¼›æœªå®Œæˆè”è¯»æ—¶åªèƒ½é™æ¡£ã€‚
4. å¤ç”¨ `../crossframe/templates/read-state-capsule.md` è§„å®šçš„ `v5-read-state-capsule`ï¼Œå¹¶åœ¨é«˜è´£ä»»ã€å…¬å…±ã€AI/è¿‡ç¨‹æ€§äº§ç‰©ã€ç”Ÿå‘½å‘¨æœŸã€æ— æ³•é€€å‡ºä¸»ä½“æˆ–æ–‡ç« è¾“å‡ºåœºæ™¯æ‰§è¡Œ `../crossframe/worksheets/source-anchor-integrity-check.md`ã€‚å¦‚æžœèƒ¶å›Šç¼ºå¤±ï¼Œå›žåˆ° `../crossframe/SKILL.md` è¡¥é½ï¼›æœ¬ skill ä¸é‡æ–°å‘æ˜Žæºè·¯ç”±ã€‚
5. `protocols/dialogue-protocol.md`
6. `references/dialogue-quality-gates.md`

å¦‚æžœç”¨æˆ·è¦æ±‚äº²åˆ‡ã€ç¼–è¾‘ã€åŒå¿—å£å»ã€ç­”è¯»è€…é—®ã€æŠ¥åˆŠå›žä¿¡ã€è€å¿ƒè§£ç­”ã€ç»™æ„è§ï¼Œæˆ–é—®é¢˜å¤©ç„¶åƒè¯»è€…æ¥ä¿¡ï¼Œå†æŒ‰éœ€è¯»å–ï¼š

- `../crossframe-essay/SKILL.md`
- `../crossframe-essay/protocols/editorial-comrade-voice-protocol.md`
- `../crossframe-essay/references/editorial-voice-principles.md`
- `references/voice-bridge.md`

å¦‚æžœæ¶‰åŠå®‰å…¨ã€æ³•å¾‹ã€åŒ»ç–—å¿ƒç†ã€å…¬å¼€æŒ‡æŽ§ã€å¤„åˆ†ã€åèª‰ã€å…¬å…±èµ„æºã€å¼ºæƒåŠ›å…³ç³»æˆ–ç´§æ€¥ä¼¤å®³é£Žé™©ï¼Œè¯»å– `protocols/consultation-boundary-protocol.md`ã€‚

## é»˜è®¤æµç¨‹

1. åˆ¤æ–­å›žåº”ç±»åž‹ï¼šç­”è¯»è€…é—®ã€ç¼–è¾‘å›žä¿¡ã€å’¨è¯¢å¼å›žåº”ã€å…¬å…±é—®é¢˜çŸ­è¯„ã€æ¦‚å¿µé—®ç­”ã€è¡ŒåŠ¨è¾¹ç•Œå»ºè®®ã€‚
2. ç”¨ `../crossframe/references/read-routing-map.md` é€‰æ‹©å¿…è¦ CrossFrame protocolã€æ¦‚å¿µå¡ã€æ¨¡æ¿æˆ–è¾¹ç•Œåè®®ã€‚
3. åšå†…éƒ¨å¾®åž‹ intakeï¼šå¯¹è±¡ã€äº‹å®žè¾¹ç•Œã€è¯æ®ç¼ºå£ã€å°ºåº¦çª—å£ã€æœºåˆ¶å€™é€‰ã€è´£ä»»é“¾/æˆæœ¬é“¾ã€ç”¨æˆ·çœŸæ­£ç”¨é€”ã€‚
4. è‡³å°‘æ¯”è¾ƒä¸¤ä¸ªæœºåˆ¶å€™é€‰ï¼›è¯æ®ä¸è¶³æ—¶é™ä½Žåˆ¤æ–­æ¡£ä½ï¼Œä¸ç¡¬åˆ¤ã€‚
5. æŠŠåŽå°æ¦‚å¿µç¿»è¯‘æˆçŽ°å®žè¡Œä¸ºï¼›æœ¯è¯­åªä½œä¸ºå¿…è¦æ˜ å°„ï¼Œä¸åœ¨å‰å°å †å ã€‚
6. è¾“å‡ºçŸ­ç­”å¤ï¼›é™¤éžç”¨æˆ·è¦æ±‚ï¼Œä¸å±•ç¤ºå®Œæ•´å·¥ä½œè¡¨ã€é•¿æ–‡åº•ç¨¿æˆ–æ¦‚å¿µé“¾ã€‚

## é»˜è®¤è¾“å‡º

é»˜è®¤ 4 åˆ° 8 ä¸ªçŸ­æ®µï¼Œæˆ–ä½¿ç”¨ `templates/default-short-answer.md`ï¼š

- å…ˆæŽ¥ä½é—®é¢˜ï¼šè¯´æ˜Žå›°æƒ‘ä¸ºä»€ä¹ˆå€¼å¾—è®¤çœŸå¯¹å¾…ã€‚
- å†åˆ’äº‹å®žè¾¹ç•Œï¼šå“ªäº›æ˜¯å·²çŸ¥ï¼Œå“ªäº›åªæ˜¯æŽ¨æµ‹ã€‚
- ç»™ç»“æž„åˆ¤æ–­ï¼šçŽ°åœ¨æ›´åƒå“ªç±»æœºåˆ¶ï¼Œè€Œä¸æ˜¯è°å¤©ç”Ÿå¦‚ä½•ã€‚
- å¿…è¦æ—¶æ‰¹è¯„ï¼šæ‰¹è¯„è¡Œä¸ºã€æµç¨‹ã€è´£ä»»è½¬å«æˆ–ä¼ªä¿®å¤ï¼Œä¸åšäººæ ¼å®¡åˆ¤ã€‚
- ç»™ç¨³å¦¥å»ºè®®ï¼šè§‚å¯Ÿä¿¡å·ã€ä½Žé£Žé™©åŠ¨ä½œã€ä¿®å¤æ¡ä»¶ã€è¾¹ç•Œè®¾ç½®æˆ–é€€å‡ºè½¬ç§»ã€‚
- å†™åœæ­¢/å‡çº§æ¡ä»¶ï¼šä»€ä¹ˆæƒ…å†µä¸‹ä¸è¦å†è§£é‡Šã€éœ€è¦æ±‚åŠ©ã€å‡çº§åˆ°ä¸“ä¸š/åˆ¶åº¦/å®‰å…¨è·¯å¾„ï¼Œæˆ–æ’¤å›žæœ¬åˆ¤æ–­ã€‚

## ç¡¬è§„åˆ™

- ä¸è¾“å‡ºâ€œåªå®‰æ…°ä¸åˆ¤æ–­â€çš„ç­”å¤ã€‚
- ä¸æŠŠç»“æž„è¯Šæ–­å†™æˆäººæ ¼å®¡åˆ¤ã€é“å¾·å®£åˆ¤ã€å‘½è¿é¢„è¨€æˆ–ç¾¤ä½“æ ‡ç­¾ã€‚
- ä¸ç”¨æœ¯è¯­å †ç Œæ›¿ä»£çŽ°å®žè§£é‡Šï¼›ç¬¬ä¸€æ®µåˆ æŽ‰æœ¯è¯­åŽä»å¿…é¡»æˆç«‹ã€‚
- ä¸æŠŠâ€œçˆ±â€â€œç†è§£â€â€œä¿®å¤â€å†™æˆå•æ–¹ç»§ç»­å¿è€çš„ä¹‰åŠ¡ã€‚
- ä¸æŠŠ AI æŠ¥å‘Šã€åˆè§„æ–‡æœ¬ã€é“æ­‰ã€å¤ç›˜ã€å£°æ˜Žæˆ–æµç¨‹å…¥å£ç›´æŽ¥å½“ä½œé«˜æˆæœ¬è¯æ®ã€‚
- ä¸åœ¨è¯æ®ä¸è¶³æ—¶ç»™å¼ºå¤„åˆ†ã€å…¬å¼€æŒ‡æŽ§ã€æ³•å¾‹/åŒ»ç–—/å¿ƒç†å¤„æ–¹æˆ–ä¸å¯é€†å»ºè®®ã€‚
- ä¸ç”¨å®å¤§å°ºåº¦å–æ¶ˆä½Žå°ºåº¦ç—›è‹¦ã€è´£ä»»ã€è¯æ®å’Œè¡ŒåŠ¨è¾¹ç•Œã€‚

## å¤±è´¥è‡ªæ£€

è¾“å‡ºå‰å¿«é€Ÿæ£€æŸ¥ï¼š

1. æˆ‘æœ‰æ²¡æœ‰æŽ¥ä½é—®é¢˜ï¼Œä½†æ²¡æœ‰åœåœ¨å®‰æ…°ï¼Ÿ
2. æˆ‘æœ‰æ²¡æœ‰åŒºåˆ†äº‹å®žã€è§£é‡Šã€æœºåˆ¶å€™é€‰å’Œåˆ¤æ–­æ¡£ä½ï¼Ÿ
3. æˆ‘æœ‰æ²¡æœ‰æŠŠæ‰¹è¯„æŒ‡å‘è¡Œä¸º/ç»“æž„/è´£ä»»é“¾ï¼Œè€Œä¸æ˜¯äººæ ¼ï¼Ÿ
4. æˆ‘æœ‰æ²¡æœ‰ç»™å‡ºå¯è§‚å¯Ÿä¿¡å·ã€ä½Žé£Žé™©åŠ¨ä½œã€åœæ­¢æ¡ä»¶æˆ–å‡çº§æ¡ä»¶ï¼Ÿ
5. åˆ æŽ‰æœ¯è¯­åŽï¼Œè¯»è€…è¿˜èƒ½ä¸èƒ½çŸ¥é“è¯¥çœ‹ä»€ä¹ˆã€åˆ«åšä»€ä¹ˆï¼Ÿ


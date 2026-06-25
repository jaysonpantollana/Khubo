---
name: crossframe-public
description: "Use when working with crossframe-public"
---

---
name: crossframe-public
description: "Use when CrossFrame Suite routes explicit Chinese analysis of public issues, platform governance, policy, institutional responsibility, appeals, or compliance evidence."
category: workflow
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
  - public-policy
  - governance
  - evidence
---
# CrossFrame Public



## When to Use This Skill

- Use when `crossframe-suite` routes an explicit CrossFrame task about public issues, platform governance, policy, institutional responsibility, public commitments, appeals, or compliance materials.
- Use when source ledgers, evidence downgrades, public responsibility boundaries, and low-power subject protection matter.
- Do not use independently unless the user explicitly names this sibling skill.

## Packaged Source Note

This AAS-ready copy preserves the original CrossFrame skill body below. Chinese remains the canonical semantic layer; English metadata is only for discovery, installation, and repository review.

## Limitations

- The skill body is intentionally Chinese-canonical; English metadata is for discovery and does not replace the original Chinese terms.
- Use only after explicit CrossFrame invocation or `crossframe-suite` routing; do not apply it as a generic default reasoning layer.
- It structures analysis, drafting, and review, but does not replace source verification, domain expertise, or legal, medical, or financial judgment.

> **æœ¬ skill ä¸ç‹¬ç«‹è§¦å‘ã€‚** æ‰€æœ‰ CrossFrame ä»»åŠ¡ç»Ÿä¸€ä»Ž `crossframe-suite` å…¥å£è°ƒåº¦ã€‚ç”¨æˆ·æ— éœ€ç›´æŽ¥è°ƒç”¨æœ¬ skillï¼›suite æ ¹æ®è·¯ç”±è§„åˆ™åœ¨éœ€è¦æ—¶è‡ªåŠ¨åŠ è½½ã€‚

å¦‚æžœå…¬å…±è®®é¢˜åˆ†æžä¹‹åŽè¦å†™è¯„è®ºæ–‡ç« ã€ç»„ç»‡å»ºè®®ã€è¾©è®ºè®ºè¯æˆ–è´¨é‡è¯„å®¡ï¼Œå…ˆè¯»å– `../crossframe-suite/SKILL.md` åšæ€»è°ƒåº¦ï¼›æœ¬ skill åªè´Ÿè´£å…¬å…±äº‹å®žã€è¯æ®è¾¹ç•Œã€ç¨‹åºä¸Žåˆ¶åº¦ä¸“é¡¹åˆ¤æ–­ã€‚

CrossFrame Public æ˜¯ `crossframe` çš„å…¬å…±è®®é¢˜/åˆ¶åº¦è¯„è®ºä¸“é¡¹è½»å…¥å£ï¼Œä¸å¤åˆ¶ canonical CrossFrame å…¨æ–‡ã€‚ä¸­æ–‡æ˜¯æƒå¨è¯­ä¹‰ï¼›è‹±æ–‡åªä½œä¸º skill idã€æ–‡ä»¶åæˆ–å¯¹å¤–ç®€ä»‹ã€‚

## å¿…é¡»è¯»å–

æ¯æ¬¡è§¦å‘åŽå…ˆè¯»å–ï¼š

1. `../crossframe/SKILL.md`
2. `../crossframe/references/read-routing-map.md`
3. è‹¥å…¬å…±åˆ¤æ–­è§¦å‘é«˜è´£ä»»ã€å…¬å…±åˆ¶åº¦ã€é•¿æœŸæ¼”åŒ–ã€æ¡†æž¶æ²»ç†ã€AI çŽ°å®žéªŒè¯ã€å¼±ä¿¡å·/ä¸é€æ˜Žã€æ— æ³•é€€å‡ºã€å·¥å…·åŒ–ã€éšå–»/æ¥æºé€æ˜Žæˆ–æ–‡ç« è¾“å‡ºï¼Œè¿½åŠ è¯»å– `../crossframe/references/continuity-bundles.md`ï¼Œå¹¶æŒ‰éœ€ä½¿ç”¨ `../crossframe/worksheets/source-continuity-check.md`ï¼›æœªå®Œæˆè”è¯»æ—¶åªèƒ½é™æ¡£ã€‚
4. å¤ç”¨ `../crossframe/templates/read-state-capsule.md` è§„å®šçš„ `v5-read-state-capsule`ï¼Œå¹¶åœ¨é«˜è´£ä»»ã€å…¬å…±ã€AI/è¿‡ç¨‹æ€§äº§ç‰©ã€ç”Ÿå‘½å‘¨æœŸã€æ— æ³•é€€å‡ºä¸»ä½“æˆ–æ–‡ç« è¾“å‡ºåœºæ™¯æ‰§è¡Œ `../crossframe/worksheets/source-anchor-integrity-check.md`ã€‚å¦‚æžœèƒ¶å›Šç¼ºå¤±ï¼Œå›žåˆ° `../crossframe/SKILL.md` è¡¥é½ï¼›æœ¬ skill ä¸é‡æ–°å‘æ˜Žæºè·¯ç”±ã€‚
5. `protocols/public-issue-protocol.md`
6. `references/source-and-evidence-rules.md`
7. `../crossframe/references/source-ledger-workflow.md`ï¼Œç”¨äºŽç»Ÿä¸€è®°å½•æ¥æºã€æ—¶é—´ã€æ¥æºç±»åž‹ã€æ”¯æŒå‘½é¢˜ã€ä¸èƒ½è¯æ˜Žä»€ä¹ˆã€è¯æ®æ¡£ä½ã€ä½¿ç”¨ä½ç½®ã€é™æ¡£ç†ç”±å’Œä»éœ€è¡¥è¯å¤„ã€‚

å…¬å…±è¯„è®ºã€å¹³å°æ²»ç†ã€æœºæž„åˆè§„ã€å…¬å…±å¼ºåˆ¤æ–­é»˜è®¤è§¦å‘ `v5-public-power-institution-pack`ã€`v5-low-power-protection-pack`ã€`v5-evidence-downgrade-action-ceiling-pack`ï¼›AI æŠ¥å‘Šæˆ–åˆè§„ææ–™è¿½åŠ  `v5-ai-process-artifact-boundary-pack`ã€‚

æŒ‰ä»»åŠ¡ç±»åž‹è¿½åŠ ï¼š

- å¹³å°å¤„ç½šã€å°ç¦ã€é™æµã€åˆ å¸–ã€è´¦å·ç”³è¯‰ï¼šè¯» `protocols/platform-appeal-protocol.md` å’Œ `templates/action-boundary.md`ã€‚
- å…¬å…±æ”¿ç­–ã€åˆ¶åº¦è¯„è®ºã€å…¬å…±æ‰¿è¯ºå…‘çŽ°ï¼šè¯» `protocols/public-policy-protocol.md` å’Œ `templates/public-comment-draft.md`ã€‚
- æœºæž„è‡ªæŸ¥ã€æ•´æ”¹æŠ¥å‘Šã€AI åˆè§„ææ–™ã€ä¼¦ç†/å®‰å…¨å£°æ˜Žï¼šè¯» `protocols/institutional-compliance-protocol.md` å’Œ `references/ai-compliance-performance.md`ã€‚
- éœ€è¦å†™æˆå…¬å…±è¯„è®ºæ–‡ç« ï¼šå†è¯» `../crossframe-essay/SKILL.md`ï¼Œä½†äº‹å®žè¾¹ç•Œå’Œè¯æ®æ¡£ä½ä»ä»¥æœ¬ skill ä¸ºå…¥å£ã€‚
- åªè¦æ±‚è¾¹ç•Œã€ä¸è¦æ±‚è¯„è®ºï¼šä½¿ç”¨ `templates/evidence-boundary-summary.md` æˆ– `templates/action-boundary.md`ã€‚

## é»˜è®¤æŸ¥æº

çœŸå®žå…¬å…±è®®é¢˜é»˜è®¤éœ€è¦æŸ¥æºï¼Œå¹¶æŒ‰ `../crossframe/references/source-ledger-workflow.md` å»ºæ¥æºå°è´¦ã€‚ä¼˜å…ˆæ‰¾åŽŸå§‹ææ–™ã€å®˜æ–¹æ–‡æœ¬ã€å¹³å°è§„åˆ™ã€æ”¿ç­–åŽŸæ–‡ã€ç›‘ç®¡/å¸æ³•/å®¡è®¡æ–‡ä»¶ã€å½“äº‹æ–¹ä¸€æ‰‹å£°æ˜Žã€å¯ä¿¡åª’ä½“äº¤å‰æŠ¥é“å’Œå¯å¤æ ¸æ•°æ®ã€‚

å¦‚æžœç”¨æˆ·æ˜Žç¡®ç¦æ­¢è”ç½‘æˆ–å½“å‰æ— æ³•æŸ¥æºï¼š

- ä¸è¾“å‡ºå¼ºåˆ¤æ–­ã€‚
- ä¸æŠŠçƒ­åº¦ã€è½¬è¿°ã€æˆªå›¾ã€å¹³å°å£°æ˜Žæˆ–æœºæž„è‡ªè¯„å½“äº‹å®žã€‚
- è¾“å‡º `è¯æ®è¾¹ç•Œæ‘˜è¦` æˆ– `è¡ŒåŠ¨è¾¹ç•Œ`ï¼Œå¹¶æ ‡æ³¨â€œæœªæŸ¥æºï¼Œåªèƒ½ä½œä¸ºå¾…æ ¸éªŒæ¡†æž¶â€ï¼›è‹¥å·²æœ‰ç”¨æˆ·ææ–™ï¼Œä¹Ÿè¦å†™æ˜Žè¿™äº›ææ–™èƒ½æ”¯æŒä»€ä¹ˆã€ä¸èƒ½è¯æ˜Žä»€ä¹ˆã€‚

## æ ¸å¿ƒæ£€æŸ¥

å…¬å…±è®®é¢˜è¾“å‡ºå¿…é¡»æ£€æŸ¥äº”ç»„é—®é¢˜ï¼š

- ç¨‹åºæ­£ä¹‰ï¼šè§„åˆ™æ˜¯å¦äº‹å‰å…¬å¼€ã€é€‚ç”¨æ˜¯å¦ä¸€è‡´ã€è¯æ®æ˜¯å¦å¯è§ã€å¤æ ¸æ˜¯å¦ç‹¬ç«‹ã€‚
- ç”³è¯‰æœ‰æ•ˆæ€§ï¼šç”³è¯‰å…¥å£æ˜¯å¦å¯è¾¾ã€ç†ç”±æ˜¯å¦å¯æäº¤ã€å›žå¤æ˜¯å¦å…·ä½“ã€çº é”™æ˜¯å¦çœŸå®žæ”¹å˜ç»“æžœã€‚
- å¼±ä¿¡å·ä¿æŠ¤ï¼šæŠ•è¯‰ã€å¼‚å¸¸æ•°æ®ã€å°‘æ•°è¯è¯ã€è¾¹ç¼˜ç¾¤ä½“å—æŸæ˜¯å¦è¢«çƒ­åº¦æˆ–æœºæž„è¯æœ¯æ·¹æ²¡ã€‚
- å…¬å…±æ‰¿è¯ºå¿ä»˜ï¼šé“æ­‰ã€æ•´æ”¹ã€è¡¥å¿ã€æ‰¿è¯ºæ˜¯å¦è½¬æˆå¯æ£€éªŒçš„èµ„æºã€æœŸé™ã€è´£ä»»äººå’Œåé¦ˆæœºåˆ¶ã€‚
- AI åˆè§„è¡¨æ¼”é£Žé™©ï¼šæ¼‚äº®æŠ¥å‘Šã€è‡ªè¯„æ¸…å•ã€æ¨¡åž‹ç”Ÿæˆææ–™ã€ä¼¦ç†å£å·æ˜¯å¦æ›¿ä»£äº†å¤–éƒ¨éªŒè¯å’ŒçœŸå®žçº¦æŸã€‚

## è¯æ®æ¡£ä½

è¾“å‡ºå‰æŠŠææ–™åˆ†ä¸ºï¼š

- å·²æ ¸éªŒäº‹å®žï¼šèƒ½è¢«åŽŸæ–‡ã€è®°å½•ã€å¯å¤æ ¸æ•°æ®æˆ–å¤šæºäº¤å‰æ”¯æŒã€‚
- é«˜æˆæœ¬è¯æ®ï¼šä¼šå¸¦æ¥æ³•å¾‹ã€ç»„ç»‡ã€ç»æµŽã€å£°èª‰æˆ–æ“ä½œæˆæœ¬çš„ææ–™ã€‚
- ä½Žæˆæœ¬å£°æ˜Žï¼šå¹³å°å…¬å‘Šã€æœºæž„è‡ªè¯„ã€PR æ–‡æ¡ˆã€æ— ç»†èŠ‚é“æ­‰ã€AI ç”Ÿæˆåˆè§„æ–‡æœ¬ã€‚
- å¼±ä¿¡å·ï¼šå°šæœªå½¢æˆå®šè®ºï¼Œä½†æŒ‡å‘å—æŸã€å¤±çµã€åŽ‹åˆ¶æˆ–å¼‚å¸¸çš„æ—©æœŸä¿¡å·ã€‚
- çƒ­åº¦ä¿¡å·ï¼šæœç´¢é‡ã€è½¬å‘ã€è¯„è®ºã€è¯é¢˜æŽ’åï¼›åªèƒ½è¯´æ˜Žå…³æ³¨ï¼Œä¸ç›´æŽ¥è¯´æ˜ŽçœŸä¼ªã€‚
- è§£é‡Š/åˆ¤æ–­ï¼šåŸºäºŽäº‹å®žå’Œæœºåˆ¶å€™é€‰å½¢æˆçš„å¼€æ”¾æ–­è¨€æˆ–è¯„è®ºåˆ¤æ–­ã€‚

## è¾“å‡ºæ¨¡å¼

æŒ‰ç”¨æˆ·æ„å›¾é€‰æ‹©ä¸€ä¸ªä¸»è¾“å‡ºï¼š

- å…¬å…±åˆ¶åº¦è¯Šæ–­ï¼šè¯´æ˜Žåˆ¶åº¦å¯¹è±¡ã€äº‹å®žè¾¹ç•Œã€ç¨‹åº/ç”³è¯‰/å¼±ä¿¡å·/æ‰¿è¯ºå¿ä»˜/AI åˆè§„é£Žé™©å’Œæœºåˆ¶å€™é€‰ã€‚
- å…¬å…±è¯„è®ºåº•ç¨¿ï¼šå…ˆç»™è¯æ®è¾¹ç•Œå’Œä¸­å¿ƒå‘½é¢˜ï¼Œå†å†™å¯å‘è¡¨çš„è¯„è®ºè‰ç¨¿ã€‚
- è¯æ®è¾¹ç•Œæ‘˜è¦ï¼šåˆ—å‡ºå·²æ ¸éªŒã€æœªæ ¸éªŒã€ä½Žæˆæœ¬å£°æ˜Žã€çƒ­åº¦ä¿¡å·ã€åå‘æ¡ä»¶å’Œä¸‹ä¸€æ­¥æ ¸éªŒã€‚
- è¡ŒåŠ¨è¾¹ç•Œï¼šç»™å‡ºä½Žé£Žé™©ã€å¯æ’¤å›žã€å¯è®°å½•ã€å¯å¤æ ¸çš„è¡ŒåŠ¨å»ºè®®ï¼›ä¸æ›¿ä»£æ³•å¾‹ã€åŒ»ç–—ã€å®‰å…¨æˆ–ä¸“ä¸šæ„è§ã€‚

## ç¡¬è§„åˆ™

- ä¸æŸ¥æºæ—¶ä¸å¾—è£…ä½œå·²ç»æŸ¥æºï¼›åªèƒ½é™æ¡£ã€‚
- ä¸å¾—æŠŠçƒ­åº¦å½“äº‹å®žï¼Œä¸å¾—æŠŠå¹³å°/æœºæž„å£°æ˜Žå½“å¼ºè¯æ®ã€‚
- ä¸å¾—çœç•¥æ¥æºå°è´¦ä¸­çš„â€œä¸èƒ½è¯æ˜Žä»€ä¹ˆâ€å’Œâ€œé™æ¡£ç†ç”±â€ã€‚
- ä¸å¾—æŠŠå…¬å…±è®®é¢˜å†™æˆäººæ ¼å®¡åˆ¤ã€é“å¾·å®£åˆ¤ã€é˜µè¥æ ‡ç­¾æˆ–ç¾žè¾±åŠ¨å‘˜ã€‚
- ä¸å¾—ç”¨ CrossFrame æœ¯è¯­æ›¿ä»£è¯æ®æ ¸éªŒã€ä¸“ä¸šé¢†åŸŸçŸ¥è¯†æˆ–æ³•å¾‹åˆ¤æ–­ã€‚
- ä¸å¾—æŠŠâ€œåˆè§„ææ–™å­˜åœ¨â€å†™æˆâ€œåˆè§„å·²ç»å‘ç”Ÿâ€ã€‚
- ä¸å¾—ä¸ºäº†è¯„è®ºé”‹åˆ©è€Œéšè—è¯æ®ç¼ºå£ã€åå‘æ¡ä»¶æˆ–å¯èƒ½æ’¤å›žåˆ¤æ–­çš„ææ–™ã€‚
- æ¶‰åŠçŽ°å®žäººç‰©ã€ç»„ç»‡ã€æƒåˆ©ã€å¤„åˆ†ã€èµ„æ ¼ã€å…¬å…±è®°å¿†æ—¶ï¼ŒæŒ‰ `../crossframe/references/read-routing-map.md` è¿›å…¥é«˜è´£ä»»/å‘½é¢˜éªŒè¯/å…¬å…±åˆ¶åº¦ç›¸å…³è·¯ç”±ã€‚

## æœ€ä½Žåˆæ ¼è¾“å‡º

ä¸€æ¬¡åˆæ ¼è¾“å‡ºè‡³å°‘å›žç­”ï¼š

- è¿™æ¬¡è®¨è®ºçš„å…¬å…±å¯¹è±¡æ˜¯ä»€ä¹ˆï¼Ÿ
- å“ªäº›äº‹å®žå·²ç»æ ¸éªŒï¼Œå“ªäº›åªæ˜¯å£°æ˜Žã€çƒ­åº¦æˆ–è§£é‡Šï¼Ÿ
- ç¨‹åºæ­£ä¹‰å’Œç”³è¯‰æœ‰æ•ˆæ€§æ˜¯å¦å¯è§ï¼Ÿ
- è°æ‰¿æ‹…æˆæœ¬ï¼Œè°æ‹¥æœ‰æ”¹å˜æ¡ä»¶ï¼Ÿ
- å¼±ä¿¡å·æ˜¯å¦è¢«ä¿æŠ¤ï¼Œè¿˜æ˜¯è¢«çƒ­åº¦/è¯æœ¯æ·¹æ²¡ï¼Ÿ
- å…¬å…±æ‰¿è¯ºæ˜¯å¦æœ‰å¿ä»˜è·¯å¾„ï¼Ÿ
- æ˜¯å¦å­˜åœ¨ AI åˆè§„è¡¨æ¼”é£Žé™©ï¼Ÿ
- æœ¬æ¬¡åˆ¤æ–­å¤„äºŽä»€ä¹ˆæ¡£ä½ï¼Œä»€ä¹ˆè¯æ®ä¼šä½¿å®ƒæ’¤å›žæˆ–å‡çº§ï¼Ÿ
- ä¸‹ä¸€æ­¥åº”æŸ¥ä»€ä¹ˆã€è¯´ä»€ä¹ˆã€åšä»€ä¹ˆï¼Œä»¥åŠä¸èƒ½åšä»€ä¹ˆï¼Ÿ


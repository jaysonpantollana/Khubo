# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: maps.spec.ts >> Maps Page >> should display listing cards on the maps page
- Location: tests\e2e\maps.spec.ts:21:3

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - link "Skip to main content" [ref=e3] [cursor=pointer]:
    - /url: "#main-content"
  - generic [ref=e5]:
    - generic [ref=e6]:
      - button "Go back" [ref=e8]:
        - img [ref=e9]
      - generic [ref=e12]:
        - button "Location" [ref=e14] [cursor=pointer]:
          - generic [ref=e15]:
            - img [ref=e16]
            - generic [ref=e19]: Location
          - img [ref=e20]
        - button "Budget" [ref=e24] [cursor=pointer]:
          - generic [ref=e25]:
            - img [ref=e26]
            - generic [ref=e29]: Budget
          - img [ref=e30]
        - button "Search" [ref=e32] [cursor=pointer]:
          - img [ref=e33]
    - main [ref=e36]:
      - button [ref=e100]:
        - img [ref=e101]
      - generic [ref=e103]:
        - region "Map" [ref=e106]
        - generic [ref=e108]:
          - button "Zoom in" [ref=e109]: +
          - button "Zoom out" [ref=e110]: −
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | 
  3  | test.describe('Maps Page', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     // Navigate to maps via bottom nav (direct URL doesn't work with HashRouter)
  6  |     await page.goto('/')
  7  |     await page.waitForLoadState('domcontentloaded')
  8  |     await page.getByRole('button', { name: 'Maps' }).click()
  9  |     await page.waitForLoadState('domcontentloaded')
  10 |     await page.waitForTimeout(500)
  11 |   })
  12 | 
  13 |   test('should load the maps page with location and budget filters', async ({ page }) => {
  14 |     // Verify Location and Budget filter buttons in header
  15 |     await expect(page.getByRole('button', { name: 'Location' })).toBeVisible()
  16 |     await expect(page.getByRole('button', { name: 'Budget' })).toBeVisible()
  17 |     // Verify search icon button exists
  18 |     await expect(page.locator('[aria-label="Search"]').first()).toBeVisible()
  19 |   })
  20 | 
  21 |   test('should display listing cards on the maps page', async ({ page }) => {
  22 |     // Verify at least one listing card is visible
  23 |     const listingCards = page.locator('main button').filter({ hasText: /Iligan City/ })
  24 |     const count = await listingCards.count()
> 25 |     expect(count).toBeGreaterThan(0)
     |                   ^ Error: expect(received).toBeGreaterThan(expected)
  26 |   })
  27 | 
  28 |   test('should show map or map unavailable message', async ({ page }) => {
  29 |     // Either map loads or unavailable message shows
  30 |     const mapContainer = page.locator('.maplibregl-map, .mapboxgl-map')
  31 |     const mapUnavailable = page.getByText('Map unavailable')
  32 | 
  33 |     const hasMap = (await mapContainer.count()) > 0
  34 |     const hasMessage = await mapUnavailable.isVisible().catch(() => false)
  35 | 
  36 |     expect(hasMap || hasMessage).toBeTruthy()
  37 |   })
  38 | })
  39 | 
```
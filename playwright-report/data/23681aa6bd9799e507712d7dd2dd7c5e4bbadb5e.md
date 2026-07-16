# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: user-journey.spec.ts >> Critical User Journeys >> full flow: bottom nav across all pages
- Location: tests\e2e\user-journey.spec.ts:41:3

# Error details

```
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Roommate' })

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
      - generic [ref=e39]:
        - button "Yhuzuong’s Dormitory Yhuzuong’s Dormitory Iligan City, Lanao del norte 9200 P5000 5.00" [ref=e41] [cursor=pointer]:
          - generic [ref=e42]:
            - img "Yhuzuong’s Dormitory" [ref=e43]
            - generic [ref=e44]: 6 available
          - generic [ref=e45]:
            - generic [ref=e46]:
              - heading "Yhuzuong’s Dormitory" [level=3] [ref=e47]
              - generic [ref=e48]: Iligan City, Lanao del norte 9200
            - generic [ref=e49]:
              - generic [ref=e51]: P5000
              - generic [ref=e53]:
                - img [ref=e54]
                - generic [ref=e56]: "5.00"
        - button "Kayla’s Residences & Dormitory Kayla’s Residences & Dormitory Iligan City, Lanao del norte 9200 P6000 5.00" [ref=e58] [cursor=pointer]:
          - generic [ref=e59]:
            - img "Kayla’s Residences & Dormitory" [ref=e60]
            - generic [ref=e61]: 6 available
          - generic [ref=e62]:
            - generic [ref=e63]:
              - heading "Kayla’s Residences & Dormitory" [level=3] [ref=e64]
              - generic [ref=e65]: Iligan City, Lanao del norte 9200
            - generic [ref=e66]:
              - generic [ref=e68]: P6000
              - generic [ref=e70]:
                - img [ref=e71]
                - generic [ref=e73]: "5.00"
        - button "Nathan’s Female Boarders Nathan’s Female Boarders Iligan City, Lanao del norte 9200 P5000 5.00" [ref=e75] [cursor=pointer]:
          - generic [ref=e76]:
            - img "Nathan’s Female Boarders" [ref=e77]
            - generic [ref=e78]: 3 available
          - generic [ref=e79]:
            - generic [ref=e80]:
              - heading "Nathan’s Female Boarders" [level=3] [ref=e81]
              - generic [ref=e82]: Iligan City, Lanao del norte 9200
            - generic [ref=e83]:
              - generic [ref=e85]: P5000
              - generic [ref=e87]:
                - img [ref=e88]
                - generic [ref=e90]: "5.00"
        - button "Blue Horizon Boarding House Blue Horizon Boarding House Iligan City, Lanao del norte 9200 P4500 5.00" [ref=e92] [cursor=pointer]:
          - generic [ref=e93]:
            - img "Blue Horizon Boarding House" [ref=e94]
            - generic [ref=e95]: 4 available
          - generic [ref=e96]:
            - generic [ref=e97]:
              - heading "Blue Horizon Boarding House" [level=3] [ref=e98]
              - generic [ref=e99]: Iligan City, Lanao del norte 9200
            - generic [ref=e100]:
              - generic [ref=e102]: P4500
              - generic [ref=e104]:
                - img [ref=e105]
                - generic [ref=e107]: "5.00"
        - button "Executive Solo Suite Executive Solo Suite Iligan City, Lanao del norte 9200 P8500 5.00" [ref=e109] [cursor=pointer]:
          - generic [ref=e110]:
            - img "Executive Solo Suite" [ref=e111]
            - generic [ref=e112]: 2 available
          - generic [ref=e113]:
            - generic [ref=e114]:
              - heading "Executive Solo Suite" [level=3] [ref=e115]
              - generic [ref=e116]: Iligan City, Lanao del norte 9200
            - generic [ref=e117]:
              - generic [ref=e119]: P8500
              - generic [ref=e121]:
                - img [ref=e122]
                - generic [ref=e124]: "5.00"
        - button "IIT Student Hub IIT Student Hub Trece, Iligan City 9200 P3500 4.50" [ref=e126] [cursor=pointer]:
          - generic [ref=e127]:
            - img "IIT Student Hub" [ref=e128]
            - generic [ref=e129]: 10 available
          - generic [ref=e130]:
            - generic [ref=e131]:
              - heading "IIT Student Hub" [level=3] [ref=e132]
              - generic [ref=e133]: Trece, Iligan City 9200
            - generic [ref=e134]:
              - generic [ref=e136]: P3500
              - generic [ref=e138]:
                - img [ref=e139]
                - generic [ref=e141]: "4.50"
        - button "Luxe Female Residence Luxe Female Residence Tibanga, Iligan City 9200 P7500 4.90" [ref=e143] [cursor=pointer]:
          - generic [ref=e144]:
            - img "Luxe Female Residence" [ref=e145]
            - generic [ref=e146]: 5 available
          - generic [ref=e147]:
            - generic [ref=e148]:
              - heading "Luxe Female Residence" [level=3] [ref=e149]
              - generic [ref=e150]: Tibanga, Iligan City 9200
            - generic [ref=e151]:
              - generic [ref=e153]: P7500
              - generic [ref=e155]:
                - img [ref=e156]
                - generic [ref=e158]: "4.90"
        - button "Brotherhood Shared Room Brotherhood Shared Room San Miguel, Iligan City 9200 P2500 4.20" [ref=e160] [cursor=pointer]:
          - generic [ref=e161]:
            - img "Brotherhood Shared Room" [ref=e162]
            - generic [ref=e163]: 8 available
          - generic [ref=e164]:
            - generic [ref=e165]:
              - heading "Brotherhood Shared Room" [level=3] [ref=e166]
              - generic [ref=e167]: San Miguel, Iligan City 9200
            - generic [ref=e168]:
              - generic [ref=e170]: P2500
              - generic [ref=e172]:
                - img [ref=e173]
                - generic [ref=e175]: "4.20"
        - button "Corner Solo Room Corner Solo Room Pala-o, Iligan City 9200 P5500 4.70" [ref=e177] [cursor=pointer]:
          - generic [ref=e178]:
            - img "Corner Solo Room" [ref=e179]
            - generic [ref=e180]: 1 available
          - generic [ref=e181]:
            - generic [ref=e182]:
              - heading "Corner Solo Room" [level=3] [ref=e183]
              - generic [ref=e184]: Pala-o, Iligan City 9200
            - generic [ref=e185]:
              - generic [ref=e187]: P5500
              - generic [ref=e189]:
                - img [ref=e190]
                - generic [ref=e192]: "4.70"
        - button "Kings Solo Pad Kings Solo Pad Mahayahay, Iligan City 9200 P6000 4.80" [ref=e194] [cursor=pointer]:
          - generic [ref=e195]:
            - img "Kings Solo Pad" [ref=e196]
            - generic [ref=e197]: 4 available
          - generic [ref=e198]:
            - generic [ref=e199]:
              - heading "Kings Solo Pad" [level=3] [ref=e200]
              - generic [ref=e201]: Mahayahay, Iligan City 9200
            - generic [ref=e202]:
              - generic [ref=e204]: P6000
              - generic [ref=e206]:
                - img [ref=e207]
                - generic [ref=e209]: "4.80"
      - button [ref=e210]:
        - img [ref=e211]
      - generic [ref=e213]:
        - generic [ref=e214]:
          - generic:
            - region "Map" [ref=e216]
            - button "Yhuzuong’s Dormitory - ₱5,000/mo" [ref=e217]:
              - img [ref=e219] [cursor=pointer]
            - button "Kayla’s Residences & Dormitory - ₱6,000/mo" [ref=e222]:
              - img [ref=e224] [cursor=pointer]
            - button "Nathan’s Female Boarders - ₱5,000/mo" [ref=e227]:
              - img [ref=e229] [cursor=pointer]
            - button "Blue Horizon Boarding House - ₱4,500/mo" [ref=e232]:
              - img [ref=e234] [cursor=pointer]
            - button "Executive Solo Suite - ₱8,500/mo" [ref=e237]:
              - img [ref=e239] [cursor=pointer]
            - button "IIT Student Hub - ₱3,500/mo" [ref=e242]:
              - img [ref=e244] [cursor=pointer]
            - button "Luxe Female Residence - ₱7,500/mo" [ref=e247]:
              - img [ref=e249] [cursor=pointer]
            - button "Brotherhood Shared Room - ₱2,500/mo" [ref=e252]:
              - img [ref=e254] [cursor=pointer]
            - button "Corner Solo Room - ₱5,500/mo" [ref=e257]:
              - img [ref=e259] [cursor=pointer]
            - button "Kings Solo Pad - ₱6,000/mo" [ref=e262]:
              - img [ref=e264] [cursor=pointer]
          - generic:
            - link "MapTiler logo" [ref=e268] [cursor=pointer]:
              - /url: https://www.maptiler.com/
            - group [ref=e269]:
              - generic [ref=e270]:
                - link "© MapTiler" [ref=e271] [cursor=pointer]:
                  - /url: https://www.maptiler.com/copyright/
                - link "© OpenStreetMap contributors" [ref=e272] [cursor=pointer]:
                  - /url: https://www.openstreetmap.org/copyright
        - generic [ref=e274]:
          - button "Zoom in" [ref=e275]: +
          - button "Zoom out" [ref=e276]: −
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | 
  3  | test.describe('Critical User Journeys', () => {
  4  |   test('full flow: home → search → listing detail → back', async ({ page }) => {
  5  |     // Start at home
  6  |     await page.goto('/')
  7  |     await page.waitForLoadState('networkidle')
  8  | 
  9  |     // Activate search
  10 |     const searchButton = page.locator('[aria-label="Search"]').first()
  11 |     await searchButton.click()
  12 | 
  13 |     // Type search query
  14 |     const searchInput = page.locator('input[placeholder*="looking for"]')
  15 |     await searchInput.fill('apartment')
  16 |     await expect(searchInput).toHaveValue('apartment')
  17 | 
  18 |     // Wait for results and click first listing
  19 |     await page.waitForTimeout(500)
  20 |     const listingCard = page.locator('[data-testid="listing-card"]').first()
  21 |     if (await listingCard.isVisible()) {
  22 |       await listingCard.click()
  23 |       await expect(page).toHaveURL(/listing\//)
  24 | 
  25 |       // Go back
  26 |       await page.goBack()
  27 |       await expect(page).toHaveURL(/\/$/)
  28 |     }
  29 |   })
  30 | 
  31 |   test('full flow: home → category filter → category page', async ({ page }) => {
  32 |     await page.goto('/')
  33 |     await page.waitForLoadState('networkidle')
  34 | 
  35 |     // Click Apartment category
  36 |     const apartmentBtn = page.getByRole('button', { name: 'Apartment', exact: true })
  37 |     await apartmentBtn.click()
  38 |     await page.waitForTimeout(500)
  39 |   })
  40 | 
  41 |   test('full flow: bottom nav across all pages', async ({ page }) => {
  42 |     await page.goto('/')
  43 |     await page.waitForLoadState('domcontentloaded')
  44 |     await page.waitForTimeout(500)
  45 | 
  46 |     // Navigate to each page via bottom nav buttons
  47 |     const pages = [
  48 |       { label: 'Maps', url: /maps/ },
  49 |       { label: 'Roommate', url: /roommate/ },
  50 |       { label: 'Profile', url: /profile/ },
  51 |       { label: 'Home', url: /\/$/ },
  52 |     ]
  53 | 
  54 |     for (const p of pages) {
  55 |       // Wait for stable DOM before clicking
  56 |       await page.waitForTimeout(300)
> 57 |       await page.getByRole('button', { name: p.label }).click({ timeout: 15000 })
     |                                                         ^ TimeoutError: locator.click: Timeout 15000ms exceeded.
  58 |       await page.waitForLoadState('domcontentloaded')
  59 |       await page.waitForTimeout(500)
  60 |       await expect(page).toHaveURL(p.url)
  61 |     }
  62 |   })
  63 | 
  64 |   test('full flow: profile → landlord features', async ({ page }) => {
  65 |     await page.goto('/')
  66 |     await page.waitForLoadState('networkidle')
  67 |     // Navigate via bottom nav
  68 |     await page.getByRole('button', { name: 'Profile' }).click()
  69 |     await page.waitForLoadState('networkidle')
  70 | 
  71 |     // Verify profile loaded
  72 |     await expect(page.getByText('Micheal B. Jordan')).toBeVisible()
  73 |   })
  74 | 
  75 |   test('full flow: roommate finder → filter → modal', async ({ page }) => {
  76 |     await page.goto('/')
  77 |     await page.waitForLoadState('networkidle')
  78 |     // Navigate via bottom nav
  79 |     await page.getByRole('button', { name: 'Roommate' }).click()
  80 |     await page.waitForLoadState('networkidle')
  81 | 
  82 |     // Verify roommate page loaded
  83 |     await expect(page.getByText('The Smarter Way to Share')).toBeVisible()
  84 | 
  85 |     // Filter by tag (roommate page uses UPPERCASE labels)
  86 |     const sharedTag = page.getByRole('button', { name: 'SHARED', exact: true })
  87 |     await sharedTag.click()
  88 |     await page.waitForTimeout(300)
  89 |   })
  90 | })
  91 | 
```
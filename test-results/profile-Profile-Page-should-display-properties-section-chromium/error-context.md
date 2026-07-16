# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: profile.spec.ts >> Profile Page >> should display properties section
- Location: tests\e2e\profile.spec.ts:39:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('My Living Space')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('My Living Space')

```

```yaml
- link "Skip to main content":
  - /url: "#main-content"
- button "Home":
  - img "Khubo Logo"
- button "Announcements"
- heading "WELCOME TO KHUBO" [level=1]
- 'button "Location: Location"': Location
- button "Add budget": Budget
- button "Search"
- button "Scroll left"
- button "Scroll right"
- button "ALL"
- button "Room 4 rent"
- button "Apartment"
- button "All females"
- button "Bed Spacer"
- button "No pets allowed"
- button "Near MSU-IIT"
- button "Condominium"
- button "Gated"
- button "No curfew"
- button "Shared"
- button "Quite hours"
- button "Free electricity"
- button "Free water"
- button "Boarding House"
- button "Dormitory"
- button "Study area"
- button "All males"
- main:
  - button "Previous Recommended"
  - button "Next Recommended"
  - button "View details for Yhuzuong’s Dormitory at Iligan City, Lanao del norte 9200. Price P5000 per month. Rating 5.00 stars.":
    - img "Yhuzuong’s Dormitory"
    - heading "Yhuzuong’s Dormitory" [level=3]
    - text: Iligan City, Lanao del norte 9200 Verified P5000 /month 5.00
  - button "View details for Kayla’s Residences & Dormitory at Iligan City, Lanao del norte 9200. Price P6000 per month. Rating 5.00 stars.":
    - img "Kayla’s Residences & Dormitory"
    - heading "Kayla’s Residences & Dormitory" [level=3]
    - text: Iligan City, Lanao del norte 9200 Verified P6000 /month 5.00
  - button "View details for Nathan’s Female Boarders at Iligan City, Lanao del norte 9200. Price P5000 per month. Rating 5.00 stars.":
    - img "Nathan’s Female Boarders"
    - heading "Nathan’s Female Boarders" [level=3]
    - text: Iligan City, Lanao del norte 9200 Verified P5000 /month 5.00
  - button "View details for Blue Horizon Boarding House at Iligan City, Lanao del norte 9200. Price P4500 per month. Rating 5.00 stars.":
    - img "Blue Horizon Boarding House"
    - heading "Blue Horizon Boarding House" [level=3]
    - text: Iligan City, Lanao del norte 9200 Verified P4500 /month 5.00
  - button "View details for Executive Solo Suite at Iligan City, Lanao del norte 9200. Price P8500 per month. Rating 5.00 stars.":
    - img "Executive Solo Suite"
    - heading "Executive Solo Suite" [level=3]
    - text: Iligan City, Lanao del norte 9200 Verified P8500 /month 5.00
  - button "View details for IIT Student Hub at Trece, Iligan City 9200. Price P3500 per month. Rating 4.50 stars.":
    - img "IIT Student Hub"
    - heading "IIT Student Hub" [level=3]
    - text: Trece, Iligan City 9200 Verified P3500 /month 4.50
  - button "View details for Luxe Female Residence at Tibanga, Iligan City 9200. Price P7500 per month. Rating 4.90 stars.":
    - img "Luxe Female Residence"
    - heading "Luxe Female Residence" [level=3]
    - text: Tibanga, Iligan City 9200 Verified P7500 /month 4.90
  - button "View details for Brotherhood Shared Room at San Miguel, Iligan City 9200. Price P2500 per month. Rating 4.20 stars.":
    - img "Brotherhood Shared Room"
    - heading "Brotherhood Shared Room" [level=3]
    - text: San Miguel, Iligan City 9200 Verified P2500 /month 4.20
  - button "View details for Corner Solo Room at Pala-o, Iligan City 9200. Price P5500 per month. Rating 4.70 stars.":
    - img "Corner Solo Room"
    - heading "Corner Solo Room" [level=3]
    - text: Pala-o, Iligan City 9200 Verified P5500 /month 4.70
  - button "View details for Affordable Bed Spacer at Ubaldo Laya, Iligan City 9200. Price P1500 per month. Rating 4.00 stars.":
    - img "Affordable Bed Spacer"
    - heading "Affordable Bed Spacer" [level=3]
    - text: Ubaldo Laya, Iligan City 9200 Verified P1500 /month 4.00
  - button "View details for Kings Solo Pad at Mahayahay, Iligan City 9200. Price P6000 per month. Rating 4.80 stars.":
    - img "Kings Solo Pad"
    - heading "Kings Solo Pad" [level=3]
    - text: Mahayahay, Iligan City 9200 Verified P6000 /month 4.80
  - button "View details for Garden View Boarding at Buru-un, Iligan City 9200. Price P4000 per month. Rating 4.60 stars.":
    - img "Garden View Boarding"
    - heading "Garden View Boarding" [level=3]
    - text: Buru-un, Iligan City 9200 Verified P4000 /month 4.60
  - button "View details for MSU-IIT Elite Shared at Trece, Iligan City 9200. Price P4500 per month. Rating 4.90 stars.":
    - img "MSU-IIT Elite Shared"
    - heading "MSU-IIT Elite Shared" [level=3]
    - text: Trece, Iligan City 9200 Verified P4500 /month 4.90
  - button "View details for Downtown Solo Room at Poblacion, Iligan City 9200. Price P7000 per month. Rating 4.50 stars.":
    - img "Downtown Solo Room"
    - heading "Downtown Solo Room" [level=3]
    - text: Poblacion, Iligan City 9200 Verified P7000 /month 4.50
  - button "View details for Yhuzuong’s Dormitory (B) at Iligan City, Lanao del norte 9200. Price P5000 per month. Rating 5.00 stars.":
    - img "Yhuzuong’s Dormitory (B)"
    - heading "Yhuzuong’s Dormitory (B)" [level=3]
    - text: Iligan City, Lanao del norte 9200 Verified P5000 /month 5.00
  - button "View details for Kayla’s Residences & Dormitory (B) at Iligan City, Lanao del norte 9200. Price P6000 per month. Rating 5.00 stars.":
    - img "Kayla’s Residences & Dormitory (B)"
    - heading "Kayla’s Residences & Dormitory (B)" [level=3]
    - text: Iligan City, Lanao del norte 9200 Verified P6000 /month 5.00
  - button "View details for Nathan’s Female Boarders (B) at Iligan City, Lanao del norte 9200. Price P5000 per month. Rating 5.00 stars.":
    - img "Nathan’s Female Boarders (B)"
    - heading "Nathan’s Female Boarders (B)" [level=3]
    - text: Iligan City, Lanao del norte 9200 Verified P5000 /month 5.00
  - button "View details for Blue Horizon Boarding House (B) at Iligan City, Lanao del norte 9200. Price P4500 per month. Rating 4.80 stars.":
    - img "Blue Horizon Boarding House (B)"
    - heading "Blue Horizon Boarding House (B)" [level=3]
    - text: Iligan City, Lanao del norte 9200 Verified P4500 /month 4.80
  - button "View details for Executive Solo Suite (B) at Iligan City, Lanao del norte 9200. Price P8500 per month. Rating 4.90 stars.":
    - img "Executive Solo Suite (B)"
    - heading "Executive Solo Suite (B)" [level=3]
    - text: Iligan City, Lanao del norte 9200 Verified P8500 /month 4.90
  - button "View details for IIT Student Hub (B) at Trece, Iligan City 9200. Price P3500 per month. Rating 4.50 stars.":
    - img "IIT Student Hub (B)"
    - heading "IIT Student Hub (B)" [level=3]
    - text: Trece, Iligan City 9200 Verified P3500 /month 4.50
  - button "View details for Luxe Female Residence (B) at Tibanga, Iligan City 9200. Price P7500 per month. Rating 4.90 stars.":
    - img "Luxe Female Residence (B)"
    - heading "Luxe Female Residence (B)" [level=3]
    - text: Tibanga, Iligan City 9200 Verified P7500 /month 4.90
  - button "Previous Top Listing"
  - button "Next Top Listing"
  - button "View details for Brotherhood Shared Room at San Miguel, Iligan City 9200. Price P2500 per month. Rating 4.20 stars.":
    - img "Brotherhood Shared Room"
    - heading "Brotherhood Shared Room" [level=3]
    - text: San Miguel, Iligan City 9200 Verified P2500 /month 4.20
  - button "View details for Corner Solo Room at Pala-o, Iligan City 9200. Price P5500 per month. Rating 4.70 stars.":
    - img "Corner Solo Room"
    - heading "Corner Solo Room" [level=3]
    - text: Pala-o, Iligan City 9200 Verified P5500 /month 4.70
  - button "View details for Affordable Bed Spacer at Ubaldo Laya, Iligan City 9200. Price P1500 per month. Rating 4.00 stars.":
    - img "Affordable Bed Spacer"
    - heading "Affordable Bed Spacer" [level=3]
    - text: Ubaldo Laya, Iligan City 9200 Verified P1500 /month 4.00
  - button "View details for Kings Solo Pad at Mahayahay, Iligan City 9200. Price P6000 per month. Rating 4.80 stars.":
    - img "Kings Solo Pad"
    - heading "Kings Solo Pad" [level=3]
    - text: Mahayahay, Iligan City 9200 Verified P6000 /month 4.80
  - button "View details for Garden View Boarding at Buru-un, Iligan City 9200. Price P4000 per month. Rating 4.60 stars.":
    - img "Garden View Boarding"
    - heading "Garden View Boarding" [level=3]
    - text: Buru-un, Iligan City 9200 Verified P4000 /month 4.60
  - button "View details for MSU-IIT Elite Shared at Trece, Iligan City 9200. Price P4500 per month. Rating 4.90 stars.":
    - img "MSU-IIT Elite Shared"
    - heading "MSU-IIT Elite Shared" [level=3]
    - text: Trece, Iligan City 9200 Verified P4500 /month 4.90
  - button "View details for Downtown Solo Room at Poblacion, Iligan City 9200. Price P7000 per month. Rating 4.50 stars.":
    - img "Downtown Solo Room"
    - heading "Downtown Solo Room" [level=3]
    - text: Poblacion, Iligan City 9200 Verified P7000 /month 4.50
  - button "View details for Yhuzuong’s Dormitory (B) at Iligan City, Lanao del norte 9200. Price P5000 per month. Rating 5.00 stars.":
    - img "Yhuzuong’s Dormitory (B)"
    - heading "Yhuzuong’s Dormitory (B)" [level=3]
    - text: Iligan City, Lanao del norte 9200 Verified P5000 /month 5.00
  - button "View details for Kayla’s Residences & Dormitory (B) at Iligan City, Lanao del norte 9200. Price P6000 per month. Rating 5.00 stars.":
    - img "Kayla’s Residences & Dormitory (B)"
    - heading "Kayla’s Residences & Dormitory (B)" [level=3]
    - text: Iligan City, Lanao del norte 9200 Verified P6000 /month 5.00
  - button "View details for Nathan’s Female Boarders (B) at Iligan City, Lanao del norte 9200. Price P5000 per month. Rating 5.00 stars.":
    - img "Nathan’s Female Boarders (B)"
    - heading "Nathan’s Female Boarders (B)" [level=3]
    - text: Iligan City, Lanao del norte 9200 Verified P5000 /month 5.00
  - button "View details for Blue Horizon Boarding House (B) at Iligan City, Lanao del norte 9200. Price P4500 per month. Rating 4.80 stars.":
    - img "Blue Horizon Boarding House (B)"
    - heading "Blue Horizon Boarding House (B)" [level=3]
    - text: Iligan City, Lanao del norte 9200 Verified P4500 /month 4.80
  - button "View details for Executive Solo Suite (B) at Iligan City, Lanao del norte 9200. Price P8500 per month. Rating 4.90 stars.":
    - img "Executive Solo Suite (B)"
    - heading "Executive Solo Suite (B)" [level=3]
    - text: Iligan City, Lanao del norte 9200 Verified P8500 /month 4.90
  - button "View details for IIT Student Hub (B) at Trece, Iligan City 9200. Price P3500 per month. Rating 4.50 stars.":
    - img "IIT Student Hub (B)"
    - heading "IIT Student Hub (B)" [level=3]
    - text: Trece, Iligan City 9200 Verified P3500 /month 4.50
  - button "View details for Luxe Female Residence (B) at Tibanga, Iligan City 9200. Price P7500 per month. Rating 4.90 stars.":
    - img "Luxe Female Residence (B)"
    - heading "Luxe Female Residence (B)" [level=3]
    - text: Tibanga, Iligan City 9200 Verified P7500 /month 4.90
  - button "View details for Brotherhood Shared Room (B) at San Miguel, Iligan City 9200. Price P2500 per month. Rating 4.20 stars.":
    - img "Brotherhood Shared Room (B)"
    - heading "Brotherhood Shared Room (B)" [level=3]
    - text: San Miguel, Iligan City 9200 Verified P2500 /month 4.20
  - button "View details for Corner Solo Room (B) at Pala-o, Iligan City 9200. Price P5500 per month. Rating 4.70 stars.":
    - img "Corner Solo Room (B)"
    - heading "Corner Solo Room (B)" [level=3]
    - text: Pala-o, Iligan City 9200 Verified P5500 /month 4.70
  - button "View details for Affordable Bed Spacer (B) at Ubaldo Laya, Iligan City 9200. Price P1500 per month. Rating 4.00 stars.":
    - img "Affordable Bed Spacer (B)"
    - heading "Affordable Bed Spacer (B)" [level=3]
    - text: Ubaldo Laya, Iligan City 9200 Verified P1500 /month 4.00
  - button "View details for Kings Solo Pad (B) at Mahayahay, Iligan City 9200. Price P6000 per month. Rating 4.80 stars.":
    - img "Kings Solo Pad (B)"
    - heading "Kings Solo Pad (B)" [level=3]
    - text: Mahayahay, Iligan City 9200 Verified P6000 /month 4.80
  - button "View details for Garden View Boarding (B) at Buru-un, Iligan City 9200. Price P4000 per month. Rating 4.60 stars.":
    - img "Garden View Boarding (B)"
    - heading "Garden View Boarding (B)" [level=3]
    - text: Buru-un, Iligan City 9200 Verified P4000 /month 4.60
  - button "View details for MSU-IIT Elite Shared (B) at Trece, Iligan City 9200. Price P4500 per month. Rating 4.90 stars.":
    - img "MSU-IIT Elite Shared (B)"
    - heading "MSU-IIT Elite Shared (B)" [level=3]
    - text: Trece, Iligan City 9200 Verified P4500 /month 4.90
  - button "View details for Downtown Solo Room (B) at Poblacion, Iligan City 9200. Price P7000 per month. Rating 4.50 stars.":
    - img "Downtown Solo Room (B)"
    - heading "Downtown Solo Room (B)" [level=3]
    - text: Poblacion, Iligan City 9200 Verified P7000 /month 4.50
  - button "Previous Near MSU-IIT"
  - button "Next Near MSU-IIT"
  - button "View details for Yhuzuong’s Dormitory (B) at Iligan City, Lanao del norte 9200. Price P5000 per month. Rating 5.00 stars.":
    - img "Yhuzuong’s Dormitory (B)"
    - heading "Yhuzuong’s Dormitory (B)" [level=3]
    - text: Iligan City, Lanao del norte 9200 Verified P5000 /month 5.00
  - button "View details for Kayla’s Residences & Dormitory (B) at Iligan City, Lanao del norte 9200. Price P6000 per month. Rating 5.00 stars.":
    - img "Kayla’s Residences & Dormitory (B)"
    - heading "Kayla’s Residences & Dormitory (B)" [level=3]
    - text: Iligan City, Lanao del norte 9200 Verified P6000 /month 5.00
  - button "View details for Nathan’s Female Boarders (B) at Iligan City, Lanao del norte 9200. Price P5000 per month. Rating 5.00 stars.":
    - img "Nathan’s Female Boarders (B)"
    - heading "Nathan’s Female Boarders (B)" [level=3]
    - text: Iligan City, Lanao del norte 9200 Verified P5000 /month 5.00
  - button "View details for Blue Horizon Boarding House (B) at Iligan City, Lanao del norte 9200. Price P4500 per month. Rating 4.80 stars.":
    - img "Blue Horizon Boarding House (B)"
    - heading "Blue Horizon Boarding House (B)" [level=3]
    - text: Iligan City, Lanao del norte 9200 Verified P4500 /month 4.80
  - button "View details for Executive Solo Suite (B) at Iligan City, Lanao del norte 9200. Price P8500 per month. Rating 4.90 stars.":
    - img "Executive Solo Suite (B)"
    - heading "Executive Solo Suite (B)" [level=3]
    - text: Iligan City, Lanao del norte 9200 Verified P8500 /month 4.90
  - button "View details for IIT Student Hub (B) at Trece, Iligan City 9200. Price P3500 per month. Rating 4.50 stars.":
    - img "IIT Student Hub (B)"
    - heading "IIT Student Hub (B)" [level=3]
    - text: Trece, Iligan City 9200 Verified P3500 /month 4.50
  - button "View details for Luxe Female Residence (B) at Tibanga, Iligan City 9200. Price P7500 per month. Rating 4.90 stars.":
    - img "Luxe Female Residence (B)"
    - heading "Luxe Female Residence (B)" [level=3]
    - text: Tibanga, Iligan City 9200 Verified P7500 /month 4.90
  - button "View details for Brotherhood Shared Room (B) at San Miguel, Iligan City 9200. Price P2500 per month. Rating 4.20 stars.":
    - img "Brotherhood Shared Room (B)"
    - heading "Brotherhood Shared Room (B)" [level=3]
    - text: San Miguel, Iligan City 9200 Verified P2500 /month 4.20
  - button "View details for Corner Solo Room (B) at Pala-o, Iligan City 9200. Price P5500 per month. Rating 4.70 stars.":
    - img "Corner Solo Room (B)"
    - heading "Corner Solo Room (B)" [level=3]
    - text: Pala-o, Iligan City 9200 Verified P5500 /month 4.70
  - button "View details for Affordable Bed Spacer (B) at Ubaldo Laya, Iligan City 9200. Price P1500 per month. Rating 4.00 stars.":
    - img "Affordable Bed Spacer (B)"
    - heading "Affordable Bed Spacer (B)" [level=3]
    - text: Ubaldo Laya, Iligan City 9200 Verified P1500 /month 4.00
  - button "View details for Kings Solo Pad (B) at Mahayahay, Iligan City 9200. Price P6000 per month. Rating 4.80 stars.":
    - img "Kings Solo Pad (B)"
    - heading "Kings Solo Pad (B)" [level=3]
    - text: Mahayahay, Iligan City 9200 Verified P6000 /month 4.80
  - button "View details for Garden View Boarding (B) at Buru-un, Iligan City 9200. Price P4000 per month. Rating 4.60 stars.":
    - img "Garden View Boarding (B)"
    - heading "Garden View Boarding (B)" [level=3]
    - text: Buru-un, Iligan City 9200 Verified P4000 /month 4.60
  - button "View details for MSU-IIT Elite Shared (B) at Trece, Iligan City 9200. Price P4500 per month. Rating 4.90 stars.":
    - img "MSU-IIT Elite Shared (B)"
    - heading "MSU-IIT Elite Shared (B)" [level=3]
    - text: Trece, Iligan City 9200 Verified P4500 /month 4.90
  - button "View details for Downtown Solo Room (B) at Poblacion, Iligan City 9200. Price P7000 per month. Rating 4.50 stars.":
    - img "Downtown Solo Room (B)"
    - heading "Downtown Solo Room (B)" [level=3]
    - text: Poblacion, Iligan City 9200 Verified P7000 /month 4.50
- contentinfo:
  - button "Support":
    - heading "Support" [level=4]
  - link "Help Center":
    - /url: "#"
  - link "Contact Us":
    - /url: "#"
  - link "Report an Issue":
    - /url: https://forms.gle/QLdAfaUjVyNFoKSr6
  - button "Community":
    - heading "Community" [level=4]
  - link "Reviews":
    - /url: "#"
  - link "Stories":
    - /url: "#"
  - link "Suggest a Feature":
    - /url: https://forms.gle/khaEHq6xsEfWnKeq8
  - button "Tutorials":
    - heading "Tutorials" [level=4]
  - link "List Your Property":
    - /url: "#"
  - link "Host Resources":
    - /url: "#"
  - link "Community Forum":
    - /url: "#"
  - link "Hosting Tips":
    - /url: "#"
  - button "Legal":
    - heading "Legal" [level=4]
  - link "Privacy Policy":
    - /url: "#/privacy"
- navigation:
  - button "Home"
  - button "Roommate"
  - button "Maps"
  - button "Profile"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | 
  3  | test.describe('Profile Page', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     // Navigate to profile via bottom nav (direct URL doesn't work with HashRouter)
  6  |     await page.goto('/')
  7  |     await page.waitForLoadState('domcontentloaded')
  8  |     await page.getByRole('button', { name: 'Profile' }).click()
  9  |     await page.waitForLoadState('domcontentloaded')
  10 |     await page.waitForTimeout(500)
  11 |   })
  12 | 
  13 |   test('should load profile page with user info', async ({ page }) => {
  14 |     // Verify profile name is displayed
  15 |     await expect(page.getByText('Micheal B. Jordan')).toBeVisible()
  16 |     // Verify location info
  17 |     await expect(page.getByText('Tibanga, Iligan City')).toBeVisible()
  18 |   })
  19 | 
  20 |   test('should display stat cards', async ({ page }) => {
  21 |     // Verify stat cards are visible
  22 |     await expect(page.getByText('Houses')).toBeVisible()
  23 |     await expect(page.getByText('Roommate').first()).toBeVisible()
  24 |     await expect(page.getByText('Invitation')).toBeVisible()
  25 |   })
  26 | 
  27 |   test('should display profile tags', async ({ page }) => {
  28 |     // Verify default tags
  29 |     await expect(page.getByText('Introvert')).toBeVisible()
  30 |     await expect(page.getByText('Pet-friendly')).toBeVisible()
  31 |     await expect(page.getByText('Night owl')).toBeVisible()
  32 |   })
  33 | 
  34 |   test('should display bio quote', async ({ page }) => {
  35 |     // Verify bio text
  36 |     await expect(page.getByText('Clean and organized')).toBeVisible()
  37 |   })
  38 | 
  39 |   test('should display properties section', async ({ page }) => {
  40 |     // Verify My Living Space section
> 41 |     await expect(page.getByText('My Living Space')).toBeVisible()
     |                                                     ^ Error: expect(locator).toBeVisible() failed
  42 |   })
  43 | 
  44 |   test('should open announcements modal', async ({ page }) => {
  45 |     // Click announcements button
  46 |     const announcementsBtn = page.locator('[aria-label="Announcements"]')
  47 |     await announcementsBtn.click()
  48 | 
  49 |     // Verify modal or overlay appears
  50 |     await page.waitForTimeout(500)
  51 |   })
  52 | 
  53 |   test('should display footer and bottom nav', async ({ page }) => {
  54 |     await expect(page.locator('footer')).toBeVisible()
  55 |   })
  56 | })
  57 | 
```
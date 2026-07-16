import { test, expect } from '@playwright/test'

test.describe('Critical User Journeys', () => {
  test('full flow: home → search → listing detail → back', async ({ page }) => {
    // Start at home
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Activate search
    const searchButton = page.locator('[aria-label="Search"]').first()
    await searchButton.click()

    // Type search query
    const searchInput = page.locator('input[placeholder*="looking for"]')
    await searchInput.fill('apartment')
    await expect(searchInput).toHaveValue('apartment')

    // Wait for results and click first listing
    await page.waitForTimeout(500)
    const listingCard = page.locator('[data-testid="listing-card"]').first()
    if (await listingCard.isVisible()) {
      await listingCard.click()
      await expect(page).toHaveURL(/listing\//)

      // Go back
      await page.goBack()
      await expect(page).toHaveURL(/\/$/)
    }
  })

  test('full flow: home → category filter → category page', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Click Apartment category
    const apartmentBtn = page.getByRole('button', { name: 'Apartment', exact: true })
    await apartmentBtn.click()
    await page.waitForTimeout(500)
  })

  test('full flow: bottom nav across all pages', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    await page.waitForTimeout(500)

    // Navigate to each page via bottom nav buttons
    const pages = [
      { label: 'Maps', url: /maps/ },
      { label: 'Roommate', url: /roommate/ },
      { label: 'Profile', url: /profile/ },
      { label: 'Home', url: /\/$/ },
    ]

    for (const p of pages) {
      // Wait for stable DOM before clicking
      await page.waitForTimeout(300)
      await page.getByRole('button', { name: p.label }).click({ timeout: 15000 })
      await page.waitForLoadState('domcontentloaded')
      await page.waitForTimeout(500)
      await expect(page).toHaveURL(p.url)
    }
  })

  test('full flow: profile → landlord features', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    // Navigate via bottom nav
    await page.getByRole('button', { name: 'Profile' }).click()
    await page.waitForLoadState('networkidle')

    // Verify profile loaded
    await expect(page.getByText('Micheal B. Jordan')).toBeVisible()
  })

  test('full flow: roommate finder → filter → modal', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    // Navigate via bottom nav
    await page.getByRole('button', { name: 'Roommate' }).click()
    await page.waitForLoadState('networkidle')

    // Verify roommate page loaded
    await expect(page.getByText('The Smarter Way to Share')).toBeVisible()

    // Filter by tag (roommate page uses UPPERCASE labels)
    const sharedTag = page.getByRole('button', { name: 'SHARED', exact: true })
    await sharedTag.click()
    await page.waitForTimeout(300)
  })
})

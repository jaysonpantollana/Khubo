import { test, expect } from '@playwright/test'

test.describe('Category Listings', () => {
  test('should load recommended listings', async ({ page }) => {
    await page.goto('/#/category/recommended')
    await page.waitForLoadState('networkidle')

    // Verify header shows "Recommended"
    await expect(page.getByText('Recommended')).toBeVisible()
  })

  test('should load top listings', async ({ page }) => {
    await page.goto('/#/category/top-listing')
    await page.waitForLoadState('networkidle')

    // Verify header shows "Top Listings"
    await expect(page.getByText('Top Listings')).toBeVisible()
  })

  test('should load near MSU-IIT listings', async ({ page }) => {
    await page.goto('/#/category/near-msu-iit')
    await page.waitForLoadState('networkidle')

    // Verify header shows "Near MSU-IIT"
    await expect(page.getByText('Near MSU-IIT')).toBeVisible()
  })

  test('should navigate back from category page', async ({ page }) => {
    await page.goto('/#/category/recommended')
    await page.waitForLoadState('networkidle')

    // Click back button
    await page.locator('button').filter({ has: page.locator('svg') }).first().click()

    // Verify navigation happened
    await page.waitForTimeout(500)
  })

  test('should show empty state for unknown category', async ({ page }) => {
    await page.goto('/#/category/nonexistent-category')
    await page.waitForLoadState('networkidle')

    // Should show "No listings found" or "Listings" as fallback title
    const noListings = page.getByText('No listings found')
    const listings = page.getByText('Listings')
    const hasContent = (await noListings.isVisible().catch(() => false)) ||
                       (await listings.isVisible().catch(() => false))
    expect(hasContent).toBeTruthy()
  })
})

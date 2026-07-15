import { test, expect } from '@playwright/test'

test.describe('Listing Detail', () => {
  test('should display listing details', async ({ page }) => {
    // Navigate to home and wait for listings
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)
    
    // Click on first listing if available
    const listingCard = page.locator('[data-testid="listing-card"]').first()
    if (await listingCard.isVisible()) {
      await listingCard.click()
      
      // Verify listing detail page elements
      await expect(page.locator('h1')).toBeVisible()
    }
  })

  test('should navigate back from listing detail', async ({ page }) => {
    // Navigate to home
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)
    
    // Click on first listing if available
    const listingCard = page.locator('[data-testid="listing-card"]').first()
    if (await listingCard.isVisible()) {
      await listingCard.click()
      
      // Go back
      await page.goBack()
      
      // Verify we're back on home page
      await expect(page).toHaveURL(/\/$/)
    }
  })
})

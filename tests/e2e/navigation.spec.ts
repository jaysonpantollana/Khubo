import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('should navigate to maps page', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    // Click on Maps in bottom nav
    await page.locator('text=Maps').first().click()
    
    // Verify maps page loaded
    await expect(page).toHaveURL(/maps/)
  })

  test('should navigate to roommate finder', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    // Click on Roommate in bottom nav
    await page.locator('text=Roommate').first().click()
    
    // Verify roommate page loaded
    await expect(page).toHaveURL(/roommate/)
  })

  test('should navigate to profile page', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    // Click on Profile in bottom nav
    await page.locator('text=Profile').first().click()
    
    // Verify profile page loaded
    await expect(page).toHaveURL(/profile/)
  })

  test('should navigate to listing detail from carousel', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    // Wait for listings to load
    await page.waitForTimeout(1000)
    
    // Click on first listing card
    const listingCard = page.locator('[data-testid="listing-card"]').first()
    if (await listingCard.isVisible()) {
      await listingCard.click()
      
      // Verify listing detail page loaded
      await expect(page).toHaveURL(/listing\//)
    }
  })
})

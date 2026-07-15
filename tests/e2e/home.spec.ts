import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('should display the hero section with welcome text', async ({ page }) => {
    // Verify hero section is visible with actual text
    await expect(page.locator('text=WELCOME TO')).toBeVisible()
    await expect(page.locator('text=KHUBO')).toBeVisible()
  })

  test('should display categories navigation', async ({ page }) => {
    // Verify category buttons are present - use exact text matching
    await expect(page.getByRole('button', { name: 'ALL', exact: true })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Apartment', exact: true })).toBeVisible()
  })

  test('should display listing carousels', async ({ page }) => {
    // Wait for listings to load
    await page.waitForTimeout(1000)
    
    // Verify carousel sections exist
    await expect(page.locator('text=Recommended')).toBeVisible()
  })

  test('should display footer and bottom navigation', async ({ page }) => {
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    
    // Verify footer is visible
    await expect(page.locator('footer')).toBeVisible()
  })
})

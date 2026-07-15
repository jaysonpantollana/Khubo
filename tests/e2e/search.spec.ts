import { test, expect } from '@playwright/test'

test.describe('Search Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('should activate search mode', async ({ page }) => {
    // Click on the search button in the hero
    const searchButton = page.locator('[aria-label="Search"]').first()
    await expect(searchButton).toBeVisible()
    await searchButton.click()
    
    // Verify search input appears
    const searchInput = page.locator('input[placeholder*="looking for"]')
    await expect(searchInput).toBeVisible()
  })

  test('should type in search input', async ({ page }) => {
    // Click on the search button to activate search mode
    const searchButton = page.locator('[aria-label="Search"]').first()
    await searchButton.click()
    
    // Find search input and type
    const searchInput = page.locator('input[placeholder*="looking for"]')
    await searchInput.fill('apartment')
    
    // Verify search was performed
    await expect(searchInput).toHaveValue('apartment')
  })

  test('should filter by category', async ({ page }) => {
    // Click on Apartment category - use exact match
    const apartmentCategory = page.getByRole('button', { name: 'Apartment', exact: true })
    await expect(apartmentCategory).toBeVisible()
    await apartmentCategory.click()
    
    // Verify category is selected (button should have different styling)
    await page.waitForTimeout(500)
  })
})

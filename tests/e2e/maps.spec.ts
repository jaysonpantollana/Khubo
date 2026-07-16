import { test, expect } from '@playwright/test'

test.describe('Maps Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to maps via bottom nav (direct URL doesn't work with HashRouter)
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    await page.getByRole('button', { name: 'Maps' }).click()
    await page.waitForLoadState('domcontentloaded')
    await page.waitForTimeout(500)
  })

  test('should load the maps page with location and budget filters', async ({ page }) => {
    // Verify Location and Budget filter buttons in header
    await expect(page.getByRole('button', { name: 'Location' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Budget' })).toBeVisible()
    // Verify search icon button exists
    await expect(page.locator('[aria-label="Search"]').first()).toBeVisible()
  })

  test('should display listing cards on the maps page', async ({ page }) => {
    // Verify at least one listing card is visible
    const listingCards = page.locator('main button').filter({ hasText: /Iligan City/ })
    const count = await listingCards.count()
    expect(count).toBeGreaterThan(0)
  })

  test('should show map or map unavailable message', async ({ page }) => {
    // Either map loads or unavailable message shows
    const mapContainer = page.locator('.maplibregl-map, .mapboxgl-map')
    const mapUnavailable = page.getByText('Map unavailable')

    const hasMap = (await mapContainer.count()) > 0
    const hasMessage = await mapUnavailable.isVisible().catch(() => false)

    expect(hasMap || hasMessage).toBeTruthy()
  })
})

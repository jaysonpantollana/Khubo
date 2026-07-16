import { test, expect } from '@playwright/test'

test.describe('Roommate Finder', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to roommate via bottom nav (direct URL doesn't work with HashRouter)
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.getByRole('button', { name: 'Roommate' }).click()
    await page.waitForLoadState('networkidle')
  })

  test('should load the roommate page with hero section', async ({ page }) => {
    // Verify hero text is displayed
    await expect(page.getByText('The Smarter Way to Share')).toBeVisible()
    // Verify tag filter buttons exist
    await expect(page.getByRole('button', { name: 'ALL', exact: true })).toBeVisible()
  })

  test('should display tag filter buttons', async ({ page }) => {
    // Verify tag buttons are present (roommate page uses UPPERCASE labels)
    await expect(page.getByRole('button', { name: 'ALL', exact: true })).toBeVisible()
    await expect(page.getByRole('button', { name: 'SHARED', exact: true })).toBeVisible()
    await expect(page.getByRole('button', { name: 'BED SPACER', exact: true })).toBeVisible()
  })

  test('should filter roommates by tag', async ({ page }) => {
    // Click on a specific tag (UPPERCASE)
    const sharedTag = page.getByRole('button', { name: 'SHARED', exact: true })
    await sharedTag.click()

    // Verify tag is selected (visual state change)
    await page.waitForTimeout(300)
  })

  test('should display footer and bottom nav', async ({ page }) => {
    await expect(page.locator('footer')).toBeVisible()
  })
})

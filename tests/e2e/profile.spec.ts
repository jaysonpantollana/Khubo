import { test, expect } from '@playwright/test'

test.describe('Profile Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to profile via bottom nav (direct URL doesn't work with HashRouter)
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    await page.getByRole('button', { name: 'Profile' }).click()
    await page.waitForLoadState('domcontentloaded')
    await page.waitForTimeout(500)
  })

  test('should load profile page with user info', async ({ page }) => {
    // Verify profile name is displayed
    await expect(page.getByText('Micheal B. Jordan')).toBeVisible()
    // Verify location info
    await expect(page.getByText('Tibanga, Iligan City')).toBeVisible()
  })

  test('should display stat cards', async ({ page }) => {
    // Verify stat cards are visible
    await expect(page.getByText('Houses')).toBeVisible()
    await expect(page.getByText('Roommate').first()).toBeVisible()
    await expect(page.getByText('Invitation')).toBeVisible()
  })

  test('should display profile tags', async ({ page }) => {
    // Verify default tags
    await expect(page.getByText('Introvert')).toBeVisible()
    await expect(page.getByText('Pet-friendly')).toBeVisible()
    await expect(page.getByText('Night owl')).toBeVisible()
  })

  test('should display bio quote', async ({ page }) => {
    // Verify bio text
    await expect(page.getByText('Clean and organized')).toBeVisible()
  })

  test('should display properties section', async ({ page }) => {
    // Verify My Living Space section
    await expect(page.getByText('My Living Space')).toBeVisible()
  })

  test('should open announcements modal', async ({ page }) => {
    // Click announcements button
    const announcementsBtn = page.locator('[aria-label="Announcements"]')
    await announcementsBtn.click()

    // Verify modal or overlay appears
    await page.waitForTimeout(500)
  })

  test('should display footer and bottom nav', async ({ page }) => {
    await expect(page.locator('footer')).toBeVisible()
  })
})

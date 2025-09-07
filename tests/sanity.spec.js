const { test, expect } = require('@playwright/test');

test.describe('Sanity checks', () => {
    test.beforeEach(async({ page }) => {
        await page.goto('/');
    });

    test('Sections exist', async({ page }) => {
        // Check that Demo and Plná verze sections exist
        await expect(page.locator('main section h3').filter({ hasText: 'Demo' })).toBeVisible();
        await expect(page.locator('main section h3').filter({ hasText: 'Plná verze' })).toBeVisible();
    });

    // TODO: Demo section check
});
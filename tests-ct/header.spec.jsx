import { test, expect } from '@playwright/experimental-ct-react';
import Header from '../components/header';

test.describe('Header Component', () => {
    test.describe('Mobile', () => {
        test('renders with collapsed navigation', async({ mount, page }) => {
            // Set mobile viewport
            await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE dimensions
            
            const component = await mount(<Header />);
            
            // Header should be visible
            await expect(component.locator('header')).toBeVisible();
            
            // Navigation items should be hidden (collapsed) on mobile
            const navItems = ['Nastavení', 'GitHub', 'O Aplikaci'];
            for (const item of navItems) {
                // The Bootstrap collapse functionality means items are in DOM but not visible
                const navLink = component.locator('header ul li a').filter({ hasText: item });
                await expect(navLink).toBeHidden();
            }
            
            // Toggle button should be visible on mobile
            await expect(component.locator('.navbar-toggler')).toBeVisible();
        });

        test('shows navigation when toggled on mobile', async({ mount, page }) => {
            // Set mobile viewport
            await page.setViewportSize({ width: 375, height: 667 });
            
            const component = await mount(<Header />);
            
            // Click the toggle button to show navigation
            await component.locator('.navbar-toggler').click();
            
            // Navigation items should now be visible
            const navItems = ['Nastavení', 'GitHub', 'O Aplikaci'];
            for (const item of navItems) {
                const navLink = component.locator('header ul li a').filter({ hasText: item });
                await expect(navLink).toBeVisible();
            }
        });
    });

    test.describe('Desktop', () => {
        test('renders with visible navigation', async({ mount, page }) => {
            // Set desktop viewport
            await page.setViewportSize({ width: 1366, height: 768 }); // Macbook-like dimensions
            
            const component = await mount(<Header />);
            
            // Header should be visible
            await expect(component.locator('header')).toBeVisible();
            
            // Navigation items should be visible on desktop
            const navItems = ['Nastavení', 'GitHub', 'O Aplikaci'];
            for (const item of navItems) {
                const navLink = component.locator('header ul li a').filter({ hasText: item });
                await expect(navLink).toBeVisible();
            }
            
            // Toggle button should be hidden on desktop
            await expect(component.locator('.navbar-toggler')).toBeHidden();
        });

        test('opens modal when clicking O Aplikaci', async({ mount, page }) => {
            await page.setViewportSize({ width: 1366, height: 768 });
            
            const component = await mount(<Header />);
            
            // Click on "O Aplikaci" link
            await component.locator('header ul li a').filter({ hasText: 'O Aplikaci' }).click();
            
            // Modal should be visible
            await expect(component.locator('#exampleModal')).toBeVisible();
            await expect(component.locator('.modal-title')).toHaveText('O aplikaci 🥑');
        });
    });
});
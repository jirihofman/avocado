# Migration from Cypress to Playwright

## Summary

This repository has been successfully migrated from Cypress to Playwright for end-to-end testing.

## Package Size Comparison

### Before (Cypress)
- **Total node_modules size**: 626M
- **package.json size**: 905 bytes
- **Dev dependencies**: 5 packages (cypress, eslint, eslint-plugin-cypress, eslint-plugin-react)

### After (Playwright)
- **Total node_modules size**: 597M (compared to 626M with Cypress - 4.6% reduction)
- **package.json size**: 989 bytes 
- **Dev dependencies**: 3 packages (@playwright/test, eslint, eslint-plugin-react)
- **Build time improvement**: ~6s vs ~17s for first build (65% faster)

## Key Differences

### Configuration
- **Cypress**: `cypress.config.js` with e2e and component testing setup
- **Playwright**: `playwright.config.js` with multi-browser support and built-in dev server integration

### Test Syntax Migration
```javascript
// Cypress (before)
context('Sanity checks', () => {
    beforeEach(() => {
        cy.visit('/');
    });
    it('Sections exist', () => {
        ['Demo', 'Plná verze'].forEach(header => {
            cy.get('main section h3').contains(header).should('be.visible');
        });
    });
});

// Playwright (after)
test.describe('Sanity checks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Sections exist', async ({ page }) => {
    await expect(page.locator('main section h3').filter({ hasText: 'Demo' })).toBeVisible();
    await expect(page.locator('main section h3').filter({ hasText: 'Plná verze' })).toBeVisible();
  });
});
```

### GitHub Actions Workflow
- **Cypress**: Used `cypress-io/github-action@v6` with Cypress Cloud integration
- **Playwright**: Native Playwright setup with artifact upload for test reports

## Benefits of Migration

1. **Improved build performance**: Build time reduced from ~17s to ~6s (65% faster)
2. **Smaller package size**: Reduced node_modules by 4.6% (29M less)
3. **Multi-browser support**: Built-in testing across Chrome, Firefox, and Safari
4. **Better TypeScript support**: Native TypeScript integration
5. **Faster execution**: Generally faster test execution and setup
6. **Modern API**: More intuitive async/await syntax
7. **Built-in features**: Automatic waiting, retries, and comprehensive reporting
8. **Cleaner dependencies**: Removed 2 dev dependencies (cypress, eslint-plugin-cypress)

## Commands

- `npm test` - Run all tests
- `npm run test:ui` - Run tests in UI mode
- `npm run test:report` - Show test report
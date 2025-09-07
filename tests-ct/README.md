# Component Tests

This directory contains Playwright component tests that were migrated from the original Cypress component tests.

## Component Tests Implemented

### Header Component (`tests-ct/header.spec.jsx`)
- **Mobile viewport tests**: Verifies that navigation items are collapsed on mobile devices
- **Desktop viewport tests**: Verifies that navigation items are visible on desktop
- **Interactive tests**: Tests the mobile navigation toggle and modal functionality

### Question Component (`tests-ct/question.spec.jsx`)
- **Basic rendering**: Tests for different question types (add-1, dice-1)
- **Interactive functionality**: Tests for words-1 question wrong/correct answer handling
- **Pattern questions**: Tests the reload functionality for patterns-1 questions
- **Loading states**: Verifies proper loading behavior

## Running Component Tests

```bash
# Run all component tests
npm run test:ct

# Run component tests with UI
npm run test:ct:ui

# Show component test report
npm run test:ct:report
```

## Configuration

Component tests use a separate configuration file `playwright-ct.config.js` that:
- Uses the `@playwright/experimental-ct-react` package for React component testing
- Configures multiple browser projects (Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari)
- Uses a custom HTML template at `playwright/index.html` with Bootstrap CSS for consistency

## Migrated from Cypress

These tests were migrated from the original Cypress component tests:
- `components/headerHeader.cy.js` → `tests-ct/header.spec.jsx`
- `components/questionQuestion.cy.jsx` → `tests-ct/question.spec.jsx`

The migration preserves the same test scenarios while adapting to Playwright's modern async/await API and component mounting approach.
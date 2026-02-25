# Sauce Demo Playwright Tests

End-to-end test automation for [Sauce Demo](https://www.saucedemo.com) using Playwright and TypeScript. Demonstrates modern test automation patterns including Page Object Model, semantic locators, and maintainable test architecture.

## Quick Start

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Run all tests
npx playwright test

# Run tests in headed mode (see browser)
npx playwright test --headed

# Run specific test file
npx playwright test checkout.spec.ts

# Run with UI mode for debugging
npx playwright test --ui
```

## Project Structure

```
tests/
├── auth.spec.ts          # Authentication flows
├── cart.spec.ts          # Shopping cart operations
├── checkout.spec.ts      # Checkout end-to-end flow
├── data/
│   ├── products.ts       # Test data: product catalog
│   └── users.ts          # Test data: user credentials
├── fixtures/
│   └── app.fixture.ts    # Test fixtures for dependency injection
└── pages/
    ├── app.ts            # Page manager (composes all pages)
    ├── cart.page.ts      # Cart page object
    ├── checkout.page.ts  # Checkout page object
    ├── login.page.ts     # Login page object
    └── products.page.ts  # Products page object
```

## Testing Approach

### Page Object Model (POM)
- Each page has a dedicated class encapsulating selectors, actions and assertions
- Pages expose semantic methods (`addToCart()`, `proceedToCheckout()`) not raw interactions
- Promote meaningful methods over thin wrappers that add little value
- Inline locators by default; only abstract locators once duplication appears
- Page Objects hold implementation details so tests can show user intent
- Promotes reuse and makes tests readable as business flows

### Semantic Locators
Prefer user-facing attributes over brittle CSS selectors:

```typescript
// [32m[1m[32m[1m[32m[1m[32m[1m✅ Good[0m: resilient to layout changes
await page.getByRole('button', { name: 'Checkout' }).click();
await page.getByPlaceholder('First Name').fill('John');

// [31m[1m[31m[1m[31m[1m[31m[1m❌ Avoid[0m: breaks when class names change
await page.click('.checkout-button');
```

### Test Data Management
- Externalized test data in `tests/data/`
- Type-safe data structures for users and products
- Easy to extend for new test scenarios

## Test Coverage

| Feature | Spec File | Coverage |
|---------|-----------|----------|
| Authentication | `auth.spec.ts` | Valid login, locked user handling |
| Shopping Cart | `cart.spec.ts` | Add/remove items, persistence, empty cart |
| Checkout Flow | `checkout.spec.ts` | Complete purchase, validation errors, cancellation |

## CI/CD

GitHub Actions workflow runs tests on every push and pull request.

![GitHub Actions passing workflow run](./github_actions_pass.png)
_CI run showing all Playwright tests passing successfully on GitHub Actions._

## Tech Stack

- [Playwright](https://playwright.dev/) [32m[1m— Modern end-to-end testing[0m
- [TypeScript](https://www.typescriptlang.org/) [32m[1m— Type safety[0m

## Why Playwright?

- **Auto-wait**: Elements are waited for automatically, reducing flakiness
- **Trace viewer**: Full execution traces for debugging failures
- **Codegen**: Generate tests by recording user interactions
- **Cross-browser**: Chrome, Firefox, WebKit support out of the box
- **TypeScript-first**: Built-in type definitions

# Architectural Decisions

## Current choices

- **Playwright test runner**: Used Playwright for both UI and API coverage, keeping the stack consistent and enabling a single test command across browser and API scenarios.
- **Page Object Model**: Added `pages/RoomsPage` and `pages/AdminRoomsPage` to isolate UI locators and interactions, which improves maintainability for repeated flows.
- **Fixture-based admin setup**: Used a custom Playwright fixture (`fixtures/admin_fixtures.ts`) to encapsulate admin login and room creation, reducing duplication in tests.
- **Separated UI and API tests**: Kept UI scenarios and API scenarios in separate folders for clarity and easier targeting when running specific tests.
- **Environment-based secrets**: Configured `.env` for local admin credentials and GitHub repository secrets for CI so sensitive data stays out of source control.
- **CI pipeline with HTML reporting**: Added GitHub Actions workflow to run tests on push, install browsers, and publish the Playwright HTML report artifact.

## What I would do differently

- **Centralize selectors and actions further**: I would move repeated locator logic into base page classes or shared helper methods to avoid duplication between room and booking flows.
- **Use dedicated test data factories**: Instead of inline objects in tests, I would add structured test data builders or factories for user, booking, and room payloads.
- **Add stronger type coverage**: I would tighten TypeScript types for fixture payloads and page objects, especially around optional admin parameters and accessible form values.
- **Improve failure diagnostics**: I would add trace and video capture for failed UI tests, plus a more robust reporting integration like Allure for aggregated results.
- **Add package scripts**: I would add convenience npm scripts for `test`, `test:ui`, `test:api`, and `report` so it is easier to run without the full `npx playwright` command.

## What I would add with more time

- **Allure or JUnit reporting**: Add a second reporter emitting XML/Allure artifacts to integrate with CI dashboards and test case management.
- **Cross-browser validation**: Expand tests to run on Firefox and WebKit in CI, not just Chromium, to increase coverage across browser families.
- **Retry/resilience strategy for flaky tests**: Add explicit retry configuration for UI tests and use stable selectors to reduce intermittent failures.
- **API contract testing**: Add schema validation for API responses to ensure the contract remains stable across backend changes.
- **Page object methods for booking flows**: Extend `RoomsPage` with reusable methods for the full booking flow, not just locator wrappers.
- **Test data cleanup**: Add cleanup steps for created rooms/bookings so test data does not accumulate between runs.

## Summary

The current implementation prioritizes fast iteration and clear boundaries between UI and API coverage. It is a practical foundation for a small automation suite, with room to grow into a more scalable, resilient, and reportable framework.

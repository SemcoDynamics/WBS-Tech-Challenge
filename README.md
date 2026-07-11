# WBS Tech Challenge

## Setup Instructions

1. Install Node.js (recommended versions: 18.x or 20.x).
2. Open the project root folder in your terminal.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file at the repository root if it does not already exist.
5. Add required environment variables for admin authentication:
   ```env
   ADMIN_USERNAME=your_admin_username
   ADMIN_PASSWORD=your_admin_password
   ```

> The UI tests rely on `process.env.ADMIN_USERNAME` and `process.env.ADMIN_PASSWORD` for admin login. The authentication helper reads these values from `.env` via `dotenv`.

## Run Instructions

Run all tests with Playwright:
```bash
npx playwright test
```

Run only admin UI tests:
```bash
npx playwright test tests/admin/admin.spec.ts
```

Run only booking UI tests:
```bash
npx playwright test tests/bookings/rooms.spec.ts
```

Run only API tests:
```bash
npx playwright test tests/z_api/booking.spec.ts
```

Open the HTML report after tests complete:
```bash
npx playwright show-report
```

## Project Structure

- `pages/` — page object models for UI tests
- `fixtures/` — shared Playwright fixtures and extended test setup
- `tests/admin/` — admin room management UI tests
- `tests/bookings/` — customer booking flow UI tests
- `tests/z_api/` — API tests for Restful Booker endpoints
- `controllers/` — API controller wrappers for request flows
- `helpers/` — shared helpers for login, data, and API operations
- `playwright.config.ts` — Playwright configuration and baseURL settings

## Test Scenarios

This repository covers end-to-end UI and API test scenarios for room management and booking workflows.

### Positive Scenarios

- **Admin creates a new room**
  - File: `tests/admin/admin.spec.ts`
  - Verifies that the admin can create a room with required details and amenities.

- **Admin updates a room booking**
  - File: `tests/admin/admin.spec.ts`
  - Confirms that an existing room listing can be edited, including type, accessibility, price, and description.

- **Admin removes a booking**
  - File: `tests/admin/admin.spec.ts`
  - Validates that the room delete action is available and can remove an entry from the admin room list.

- **User successfully books a room**
  - File: `tests/bookings/rooms.spec.ts`
  - Covers the booking flow from date selection through guest details and reservation confirmation.

- **API health check**
  - File: `tests/z_api/booking.spec.ts`
  - Ensures the API is available and responding correctly before executing further booking operations.

- **API booking lifecycle**
  - File: `tests/z_api/booking.spec.ts`
  - Verifies create/get/update/delete operations work together for a full booking lifecycle.

- **API booking filter by query**
  - File: `tests/z_api/booking.spec.ts`
  - Confirms the API returns filtered booking IDs correctly when query parameters are applied.

### Negative Scenarios

- **Prevent updating a booking with an invalid/expired token**
  - File: `tests/z_api/booking.spec.ts`
  - Checks that the API rejects unauthorized update attempts with proper error handling.

- **Return 404 for fetching a non-existent booking ID**
  - File: `tests/z_api/booking.spec.ts`
  - Validates the API returns a correct not-found response when a booking ID does not exist.

### Prioritization Note

These scenarios were prioritized because they exercise the most critical user and admin workflows in the application: creating and managing rooms, performing a customer booking, and verifying API reliability and authorization.

- Positive tests focus on happy paths that must work for the application to deliver core functionality.
- Negative tests focus on security and robustness by validating proper failure behavior for invalid operations.
- Together, these scenarios provide coverage for both UI-facing features and backend API behavior, which helps detect regressions across the full stack.

## Assumptions

- The application under test is available at `https://automationintesting.online/` for the UI flows.
- The API tests target `https://restful-booker.herokuapp.com/`.
- Admin credentials are available and valid for the environment.
- The test data selectors in POMs match the current UI implementation.
- The `.auth/user.json` storage state is only used for Chromium project setup and is not required for the existing tests.

## Known Limitations

- No package script is defined for test execution, so `npx playwright test` is required.
- The test suite depends on external systems and third-party endpoints, which may be unavailable or rate-limited.
- Some UI selectors are based on visible text and may break if the page copy changes.
- API tests use a public demo endpoint with fixed behavior, so certain responses (like `201` for delete) are specific to that API and may differ from a real production service.

# Testing and verification

## Automated commands

- npm test: Vitest unit tests of escaping, URLs/images, templates, colors, Gmail guards, hosting and OAuth.
- npm run test:browser: Playwright tests of uploads, crop controls, mode draft refresh/reset, provider/method selectors and matching actions, platform selection/sizing, copy fallbacks, standalone geometry and mobile overflow.
- npm run build: Vite production compilation.
- git diff --check: whitespace/patch sanity.

Browser tests use Edge locally by default. For CI: npx playwright install --with-deps chromium and PLAYWRIGHT_CHANNEL=chromium. Cloudinary requests in tests are mocked; tests do not publish personal images or use real OAuth tokens.

## Manual release checklist

1. Personal: photo crop, optional fields, social separators, portrait layout and stacked layout.
2. Business: logo-only upload, blank company enlargement, name/role alignment, top-right social groups, no-wrap contact strip and independent strip color.
3. Add more than three platforms; every populated enabled link appears. Add enough to wrap; verify no overlap and no blank links.
4. Review, upload, copy formatted, fallback copy, raw HTML and HTML download.
5. Paste into Gmail settings, Outlook web/new and classic Outlook; test actual received mail.
6. Check image loading, hyperlink targets, plain-text mode, font fallbacks, dark mode and mobile.
7. If enabling OAuth, test consent cancel/deny/expiry/revoke, successful primary update and API failures using an authorized test account.
8. Verify public icon URLs and hosted-image retention across releases.

A green browser test proves browser behavior, not pixel-perfect Gmail/Outlook rendering. Live provider and OAuth checks remain separate release gates.


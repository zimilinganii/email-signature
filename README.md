# Email Signature Generator

A clean, client-side React/Vite tool for creating a professional email signature, copying email-safe HTML, and installing the result in Gmail with explicit Google OAuth consent.

## Features

- Live signature preview
- Personal circular-photo and business portrait layouts inspired by the supplied references
- Photo/logo uploads, crop zoom and positioning, and separate drafts per mode
- Contact details and social-link editing
- Email-safe table layout with inline styles
- Copy rendered signature, copy HTML, and download HTML
- Optional Gmail installation using `gmail.settings.basic`
- Guided Outlook and Apple Mail installation
- Optional Cloudinary image hosting for direct uploads; contact fields remain in browser memory

## Development

```bash
npm install
npm run dev
```

Create `.env` from `.env.example` and set a Google OAuth client ID if Gmail installation is required. Without it, the generator and manual installation flows still work.

For the upload → create → copy flow with photos, configure the Cloudinary cloud name and unsigned upload preset using [image hosting setup](docs/image-hosting.md). Without this one-time setup, photos can preview locally but cannot be included in a Gmail-ready copy. Images are resized for email and may lose some quality.

## Production build

```bash
npm run build
npm run preview
```

See the documentation in [`docs/`](docs/) for OAuth setup, customization, compatibility, privacy, and deployment.

## Verification

Run `npm test` for signature-generation and Gmail-service tests. Run `npm run test:browser` for the upload, crop, draft-switching and mobile-layout browser test. The browser test uses installed Microsoft Edge by default; set `PLAYWRIGHT_CHANNEL` to `chrome` to use installed Chrome. Google authorization and real email-client rendering require separate account testing.

## Gmail integration

The Gmail installer requests only the Gmail settings permission and updates the authenticated user's primary send-as signature. Google OAuth credentials must never be committed. Gmail may sanitize HTML before saving it.

## License

Personal project.

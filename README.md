# Email Signature Generator

A clean, client-side React/Vite tool for creating a professional email signature, copying email-safe HTML, and installing the result in Gmail with explicit Google OAuth consent.

## Features

- Live signature preview
- Contact details and social-link editing
- Email-safe table layout with inline styles
- Copy rendered signature, copy HTML, and download HTML
- Optional Gmail installation using `gmail.settings.basic`
- Guided Outlook and Apple Mail installation
- No backend or stored personal data in the first version

## Development

```bash
npm install
npm run dev
```

Create `.env` from `.env.example` and set a Google OAuth client ID if Gmail installation is required. Without it, the generator and manual installation flows still work.

## Production build

```bash
npm run build
npm run preview
```

See the documentation in [`docs/`](docs/) for OAuth setup, customization, compatibility, privacy, and deployment.

## Gmail integration

The Gmail installer requests only the Gmail settings permission and updates the authenticated user's primary send-as signature. Google OAuth credentials must never be committed. Gmail may sanitize HTML before saving it.

## License

Personal project.

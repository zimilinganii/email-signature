# Email Signature Generator

A clean, client-side React/Vite tool for creating a personal or business email signature, copying email-safe HTML, and installing the result in Gmail with explicit Google OAuth consent.

## Features

- Live signature preview
- Personal circular-photo and logo-only business layouts inspired by the supplied references
- Photo/logo uploads, crop zoom and positioning, and separate drafts per mode
- Contact details and adaptive multi-platform editing with a full platform selector
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

See the [documentation index](docs/README.md) for the user manual, component diagram, process diagrams, OAuth, hosting, security, testing and releases.

## Branching and Wiki

`main` is production; `develop` contains ongoing changes. Use feature/fix/docs branches into develop and approve a release PR into main before deployment. These new features are not live until that promotion. See [branching](docs/branching.md).

The [GitHub Wiki](https://github.com/zimilinganii/email-signature/wiki) mirrors `docs/`. Run `node scripts/publish-wiki.mjs --prepare-only` to prepare pages locally, or `node scripts/publish-wiki.mjs` to publish after the Wiki's first page exists. See [Wiki maintenance](docs/wiki-maintenance.md).

## Verification

Run `npm test` for signature-generation and Gmail-service tests. Run `npm run test:browser` for the upload, crop, draft-switching and mobile-layout browser test. The browser test uses installed Microsoft Edge by default; set `PLAYWRIGHT_CHANNEL` to `chrome` to use installed Chrome. Google authorization and real email-client rendering require separate account testing.

## Gmail integration

The Gmail installer requests only the Gmail settings permission and updates the authenticated user's primary send-as signature. Google client secrets and tokens must never be committed; the browser client ID is public configuration. Gmail may sanitize HTML before saving it.

## License

Personal project.

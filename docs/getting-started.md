# Getting started

## Requirements

Use Node 22 (recommended), npm, Git and a modern browser. Windows users may need npm.cmd instead of npm. Install dependencies with npm ci, not a global Vite install.

```sh
git clone https://github.com/zimilinganii/email-signature.git
cd email-signature
git switch develop
npm ci
npm run dev
```

Open the localhost URL printed by Vite. Create .env.local using .env.example as a guide. This file is ignored by Git. Restart Vite after environment changes.

| Variable | Purpose |
| --- | --- |
| VITE_CLOUDINARY_CLOUD_NAME | Public image-host account name |
| VITE_CLOUDINARY_UPLOAD_PRESET | Public unsigned image-upload preset |
| VITE_PUBLIC_ASSET_BASE_URL | Permanent HTTPS root hosting the icons directory |
| VITE_GOOGLE_CLIENT_ID | Optional public browser OAuth client ID; never a client secret |

Without Cloudinary configuration, local uploads preview but cannot be copied as Gmail-ready images. HTTPS-hosted images remain usable. Without Google configuration, manual copy/download still work.

Run npm test, npm run test:browser and npm run build before proposing a release. Browser tests use installed Edge; set PLAYWRIGHT_CHANNEL=chromium with Playwright Chromium installed to use that instead. See [testing](testing.md).


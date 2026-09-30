# Deployment

Production is [GitHub Pages](https://zimilinganii.github.io/email-signature/). Only main deploys. Develop runs checks and can be previewed locally; it does not replace the public site. See [branching](branching.md) for promotion.

## Environment

Set public build-time Actions variables VITE_GOOGLE_CLIENT_ID (optional), VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET. The current Pages workflow has public Cloudinary defaults for this project. No API secret belongs in a VITE_ variable. Set the permanent icon asset root if moving hosts.

Enable Pages with GitHub Actions as its source. The workflow requires contents:read, pages:write and id-token:write, creates the build, uploads dist and deploys it. The production workflow includes an explicit main guard that prevents manual-dispatch deployment from other refs.

The 2026-09-27 release merged PR #2 at commit `010fbac1e4ba1171b5d4a7df1e316dd23aa82f97`. Pages deployment succeeded and the live HTML and JavaScript assets were checked for the new readiness notice and text-size control. Google OAuth still needs separate configuration and live account testing.

## Release checklist

Run tests/build, inspect preview/export, review provider checks and configuration, approve a develop → main release PR, wait for a successful Pages action, then verify the public site. Old signatures in Gmail/Outlook require regeneration and replacement; deployments do not update them automatically.

## Hosting and visibility

Static hosting can support GIS browser OAuth, but cannot keep a client secret. Other hosting is possible after changing Vite base/assets and authorized Google origins. Keep old icon/image URLs available or existing sent signatures may break. Do not make the repository private until checking Pages/Wiki plan support and preserving docs. No visibility or hosting changes are performed by development scripts.

# Privacy and security

Profile data is held in the browser. Gmail installation requires explicit OAuth consent. Do not commit OAuth credentials, access tokens, refresh tokens, or `.env` files. Review Git history before making the temporary public repository private again.

When Cloudinary is configured, selecting Review & create uploads the cropped/optimized photo and logo to that image host. Those images have public URLs so mail recipients can load them. Contact fields are not sent to Cloudinary; uploads use generic filenames rather than the user's original filename. Images are not committed to Git. Removing an image from the editor does not delete it from Cloudinary. The owner manages retention and deletion, which may break signatures already sent.

The cloud name and unsigned preset name are public frontend configuration. Restrict formats and file sizes in the provider, monitor quotas, and use an authenticated signing endpoint with rate limits before scaling to unrestricted public uploads. Never expose a provider API secret through a Vite variable. See [setup and limits](image-hosting.md).

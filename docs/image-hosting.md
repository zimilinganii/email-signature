# Direct photo uploads

GitHub Pages hosts the generator. Cloudinary stores optimized user images and returns public HTTPS URLs. Uploads are sent when the visitor selects **Review & create**; the generated signature refers to those URLs rather than embedding image data. The visitor then uses **Copy signature** and pastes normally into Gmail. This does not guarantee display in clients that block remote images or plain-text messages.

## One-time owner setup

1. Create an account at https://cloudinary.com/users/register and find the Cloud name in the dashboard.
2. Create an **Unsigned** upload preset named `signature_images`. Restrict allowed formats to JPG/PNG and maximum uploaded size to 100 KB. Use generated unique public IDs; disallow overwrite. Keep delivery public (`upload`). Do not configure automatic deletion of images used in signatures.
3. Add `VITE_CLOUDINARY_CLOUD_NAME` and `VITE_CLOUDINARY_UPLOAD_PRESET` as repository **Actions variables**. The Pages workflow passes them to the production build. Deploy again.
4. For development, set those values in ignored `.env.local` and restart Vite. No API key or API secret belongs in the frontend.
5. Test with a non-sensitive photo: upload, crop, create, copy, paste into Gmail signature settings, save, and send a test message to yourself. Check that a second browser can load the image without signing in.

The preset and cloud name are public configuration. An unsigned preset can be used outside this app, so enforce limits in Cloudinary and monitor quotas. For an unrestricted public launch, add an authenticated, rate-limited signing endpoint; client-side checks alone do not prevent abuse. No live Cloudinary test has been performed without an owner-provided account.

## Image handling

Images are cropped locally, limited to a 540px longest dimension and a 96 KB payload, and re-encoded to JPEG for photos or PNG for transparent logos. Metadata is removed through canvas encoding. Cropping and resizing happen before uploading. The short user notice is: **Images are resized for email and may lose some quality.**

Successful uploads are cached in memory to avoid duplicate requests in the same session. An upload failure keeps the local preview and shows a retry message. Images are never silently omitted. Public images remain on the storage provider until the owner removes them; deleting them breaks existing signatures. The app does not upload images into Git or commit user photos.

## Plain-text Gmail messages

In Gmail's compose window, open **More options (⋮)** and uncheck **Plain text mode**. Paste with Ctrl+V, not Ctrl+Shift+V. Delete a previously saved plain-text signature and paste the formatted signature again. The app supplies HTML and plain text together, with a legacy HTML copy fallback when the modern clipboard API fails.

Provider documentation: https://cloudinary.com/documentation/upload_images#unsigned_upload

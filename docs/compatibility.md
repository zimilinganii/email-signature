# Compatibility

The signature uses simple table layout, inline CSS, common fonts, absolute links, and accessible image alt text. Gmail may sanitize HTML and email clients may render CSS differently. Test the final signature in Gmail, Outlook, and Apple Mail.

Personal contact spacing uses separate spacer cells rather than padded width-constrained cells. Tables and cells explicitly use content-box sizing and font metrics so the editor's CSS reset is not required. Phone and email have non-wrapping text; long combined contact details use separate rows. The website spans the contact section. Browser regression tests compare a standalone export with an editor-style CSS reset and assert equal positions, single-line phone/email, and website alignment. This is not a substitute for verification inside each real email client.

After an update, create and copy a fresh signature and replace the previous signature in your mail settings. Already installed signatures do not update automatically.

## Gmail reports that the signature is too long

Uploaded images are embedded as base64 data in local HTML, which can make signatures far larger than they look. Copy signature now refuses embedded uploads, compacts redundant markup, and uses an 8,000-character budget to leave room for Gmail editor changes. This is a conservative app guard, not a guarantee about Gmail's internal counting.

For a signature with your photo, select Review & create and wait for the configured Cloudinary upload to return a public HTTPS URL. You can also enter an existing publicly hosted HTTPS image URL in Photos & logo. Alternatively, select Copy for Gmail without uploads to explicitly omit local images while retaining contact and social links. The full design remains in the preview and Download HTML; raw Copy HTML is for code export and may still be too large for Gmail. In Gmail, delete the old signature contents before pasting the replacement, then save. HTML download alone does not solve Gmail's size limit.

# Compatibility

The signature uses simple table layout, inline CSS, common fonts, absolute links, and accessible image alt text. Gmail may sanitize HTML and email clients may render CSS differently. Test the final signature in Gmail, Outlook, and Apple Mail.

Personal contact spacing uses separate spacer cells rather than padded width-constrained cells. Tables and cells explicitly use content-box sizing and font metrics so the editor's CSS reset is not required. Phone and email have non-wrapping text; long combined contact details use separate rows. The website spans the contact section. Browser regression tests compare a standalone export with an editor-style CSS reset and assert equal positions, single-line phone/email, and website alignment. This is not a substitute for verification inside each real email client.

After an update, create and copy a fresh signature and replace the previous signature in your mail settings. Already installed signatures do not update automatically.

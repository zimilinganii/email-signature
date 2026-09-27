# User manual

## Create and review

1. Choose Personal or Business. Personal supports a portrait; Business supports a logo only.
2. Enter your contact information. Leave the optional company name blank if it is already in the logo; the logo enlarges without cropping.
3. Upload and adjust your image. Choose platforms from the dropdown, enter complete links, and toggle visibility or remove unwanted rows.
4. Choose colors in Style. Business has an independent contact-strip background.
5. Review the live preview, then select Review & create. Wait for hosted-image preparation to finish.
6. Choose a copy method below. Editing a field returns the design to preview until you review again.

Automation notice: We’re still working on automatic installation. Use manual setup for now. Optional Google installation requires configuration and testing.

## Guided installation selectors

After Review & create, scroll to Install your signature. Select Email provider (Gmail, Outlook web/new, classic Outlook, or Apple Mail), then Installation method. The Prepare panel shows the selected action and the Install panel shows only that provider’s steps. Changing either choice updates the guide. All dropdowns keep native keyboard/touch support.

## Saved drafts

Your form, styles, platforms and processed images autosave in this browser and restore after refresh. Personal and business drafts are saved independently. Google sessions are not saved. Use Reset & clear saved data to clear both drafts on shared devices; confirm the prompt. Hosted images and existing email signatures are not deleted. If storage is blocked/full, a warning appears: keep the page open and download the signature. Clearing browser data removes drafts. The original image and crop handles are not retained; re-upload to recrop after refresh.

## Copy methods (for both Gmail and Outlook)

| Action | What it produces | How to install |
| --- | --- | --- |
| Copy signature | Formatted HTML plus a plain-text fallback | Paste normally into the provider’s signature editor using Ctrl+V / Command+V |
| Copy for Gmail without uploads | Formatted signature with local uploaded images omitted | Follow the same Gmail or Outlook steps; image removal is explicit |
| Download HTML | A .html file | Open it in a browser, select the rendered signature with Ctrl+A, copy with Ctrl+C, then paste into the editor |
| Copy HTML | HTML source text | Paste into a plain-text editor, save as UTF-8 .html, open in a browser, copy the rendered result, then paste into the editor |

Do not paste source code directly into Gmail or Outlook. Do not use Ctrl+Shift+V / Paste as plain text. If you use Download or Copy HTML before uploads finish, embedded images may be unsuitable for Gmail; prefer the ready, hosted signature. Provider size limits still apply to every method.

## Gmail (computer)

1. Open a compose window’s ⋮ menu and turn off Plain text mode if selected.
2. Go to Settings → See all settings → General → Signature.
3. Create a signature, give it a name, and paste the formatted result into the editor.
4. Replace the old contents rather than appending another copy.
5. Under Signature defaults, select it for new messages and optionally replies/forwards.
6. Save Changes at the bottom. Start a new email; old drafts can retain old signatures.

[Google setup guide](https://support.google.com/mail/answer/8395) and [Google troubleshooting](https://support.google.com/mail/answer/11468381).

## Outlook web and new Outlook

1. Open Settings → Accounts → Signatures. Some versions expose Mail → Compose and reply. Search settings for “signature” if necessary.
2. Select the account, create/name a signature and paste the rendered signature.
3. If a paste menu appears, keep source formatting.
4. Save and choose it as the default for new messages and replies/forwards.
5. Compose a new HTML-format message and verify the result.

## Classic Outlook for Windows

Go to File → Options → Mail → Signatures → New. Paste into the editor, select the account and default signature for new messages and replies/forwards, and confirm with OK. Use HTML message format, not plain text.

[Microsoft signature guide](https://support.microsoft.com/en-us/outlook/mail/how-to-add-and-change-an-email-signature-in-outlook).

## Final checks

Send yourself a test email. Check clickable links, photo/logo loading, line alignment and dark mode. Mobile apps may have separate signature settings or reduced HTML support. Missing images do not necessarily mean the links are wrong: clients may block remote images. Hosted files must remain public and available.

Changing the generator does not automatically change an installed signature. Copy and replace it again after edits. See [troubleshooting](troubleshooting.md).


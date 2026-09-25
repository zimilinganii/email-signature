# Contributing

Use [branching](branching.md): feature/fix/docs branches into develop, then an approved release into main. Keep changes focused and preserve existing user edits.

For every change: update tests and relevant docs, run unit/browser/build checks, and describe the user-visible result and limitations in the PR. Use placeholder contact details and generated image fixtures. Never commit .env files, tokens, client secrets or personal uploads.

Email markup must remain table-based with inline CSS and escaped user values. Verify both preview and standalone export; app CSS must not be required by email HTML. Do not silently remove images or links to pass provider limits.

Edit docs/ first. Run the explicit Wiki publishing script after reviewing docs. Mermaid diagrams describe actual behavior, including failures and external services; update them when components or processes change.


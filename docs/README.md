# Project documentation

This is the permanent documentation source for the personal/business Email Signature Generator. Updated 2026-09-30. The latest application release was merged into main through PR #2 and deployed on 2026-09-27. Wiki pages mirror this directory; edit these files first.

## Latest release

The production generator includes independent saved drafts, guided provider/method installation selectors, compact business layout, an optional address with a Maps directions link, font choices and proportional text sizing, separate business contact colors, equally styled export actions, and a compact Gmail readiness notice with a character-count badge. See [customization](customization.md) and the [user manual](user-manual.md).

Release: [PR #2](https://github.com/zimilinganii/email-signature/pull/2). [Successful Pages deployment](https://github.com/zimilinganii/email-signature/actions/runs/36317415637). [Open the generator](https://zimilinganii.github.io/email-signature/).

## Start here

- [Getting started](getting-started.md)
- [User manual: every copy method](user-manual.md)
- [Customization](customization.md)
- [Architecture and component diagram](architecture.md)
- [Process and sequence diagrams](processes.md)
- [Authentication](authentication.md)
- [Gmail integration](gmail-integration.md)
- [Image hosting](image-hosting.md)
- [Outlook installation](outlook-installation.md)
- [Apple Mail installation](apple-mail-installation.md)
- [Privacy and security](privacy-and-security.md)
- [Compatibility](compatibility.md)
- [Testing](testing.md)
- [Troubleshooting](troubleshooting.md)
- [Branching and releases](branching.md)
- [Deployment](deployment.md)
- [Wiki maintenance](wiki-maintenance.md)
- [Contributing](contributing.md)
- [Roadmap](roadmap.md)

## Project purpose and status

Create personal or business signatures with live preview, safe HTML, hosted images and manual installation. Optional business-only address/location beneath the role. Business uses only a logo; personal uses a circular portrait. The Gmail OAuth adapter exists but live Google configuration/testing is still required. Outlook automation is not implemented. Manual installation is the supported baseline.

No database or backend is used. Personal and business drafts autosave to localStorage on the same browser and restore after reload. Use Reset & clear saved data on shared devices; no Google tokens are saved. Cloudinary images persist separately. Copying a new version does not update signatures already installed in email clients.


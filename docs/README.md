# Project documentation

This is the permanent documentation source for the personal/business Email Signature Generator. Updated 2026-09-25 on develop. Production remains on main until a reviewed release. Wiki pages mirror this directory; edit these files first.

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


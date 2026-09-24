# Authentication

Gmail installation uses Google Identity Services and requests only `gmail.settings.basic`. The app does not request permission to read, send, or delete email.

Set `VITE_GOOGLE_CLIENT_ID` in a local `.env` file. Never commit `.env` or access tokens. Configure the deployed URL as an authorized JavaScript origin in Google Cloud.

If no client ID is configured, the generator remains fully usable through copy and download actions.

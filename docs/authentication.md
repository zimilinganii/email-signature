# Authentication

Gmail installation uses Google Identity Services and requests only `gmail.settings.basic`. The app does not request permission to read, send, or delete email.

Set `VITE_GOOGLE_CLIENT_ID` in a local `.env` file. Never commit `.env` or access tokens. Configure the deployed URL as an authorized JavaScript origin in Google Cloud.

If no client ID is configured, the generator remains fully usable through copy and download actions.

## Enable Google connection

1. Create a Google Cloud project and enable the Gmail API.
2. Configure the OAuth consent screen. Add your account as a test user while the app is in testing.
3. Create an OAuth client of type Web application. Add `http://localhost`, `http://localhost:5173`, and `https://zimilinganii.github.io` to Authorized JavaScript origins (no path). If hosting changes, add the new site's origin too. Under Data Access, add `https://www.googleapis.com/auth/gmail.settings.basic`.
4. Put the client ID in `.env.local` as `VITE_GOOGLE_CLIENT_ID=...apps.googleusercontent.com`, then restart Vite. This client ID is public configuration, not a client secret. Never put a client secret in a Vite environment variable.
5. For deployment, set the same GitHub Actions repository variable and rebuild.
6. Review your design, connect Google, grant Gmail settings permission, then select Install in Gmail. This explicitly replaces the primary Gmail web signature; it does not configure all mobile clients or secondary aliases.

Tokens are held in memory and expire automatically. Disconnect revokes the grant. Canceled or blocked popups show an error. Live OAuth testing requires a configured client and a real test account; automated tests only mock Gmail responses.

Reference: https://developers.google.com/identity/oauth2/web/guides/use-token-model

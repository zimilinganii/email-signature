export function GoogleSetupGuide() {
  return <details className="google-setup"><summary>Set up Google sign-in for testing</summary><ol>
    <li>Open <a href="https://console.cloud.google.com/" target="_blank" rel="noreferrer">Google Cloud Console</a> and create or select a project.</li>
    <li>In APIs &amp; Services → Library, find Gmail API and enable it.</li>
    <li>Open Google Auth Platform. Set the app name to Sincerely Signature Studio, and use your email for support and developer contact.</li>
    <li>Choose External audience, leave the app in Testing, and add your Gmail address as a test user.</li>
    <li>Under Clients, create a Web application client. Add these Authorized JavaScript origins: <code>http://localhost</code>, <code>http://localhost:5173</code>, and <code>https://zimilinganii.github.io</code>. If using another host, add that site's origin too. Origins do not include paths.</li>
    <li>Under Data Access, add <code>https://www.googleapis.com/auth/gmail.settings.basic</code>.</li>
    <li>Copy the public client ID ending in <code>.apps.googleusercontent.com</code>. Set <code>VITE_GOOGLE_CLIENT_ID</code> in your local <code>.env.local</code> and restart the development server. For the live site, set the same GitHub Actions repository variable and rebuild.</li>
  </ol><p>No client secret is needed in this browser app. Once configured, review your signature, connect Google, approve the requested Gmail settings access, then install. Installation replaces the primary Gmail web signature.</p></details>;
}

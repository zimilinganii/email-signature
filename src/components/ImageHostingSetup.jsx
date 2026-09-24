export function ImageHostingSetup(){return <details className="google-setup"><summary>Site owner: connect photo hosting</summary><ol>
 <li>Create a <a href="https://cloudinary.com/users/register" target="_blank" rel="noreferrer">Cloudinary account</a> and copy your Cloud name from its dashboard.</li>
 <li>Under Settings → Upload → Upload presets, create an Unsigned preset named <code>signature_images</code>. Allow JPG and PNG only, set the maximum file size to 100 KB, use unique generated filenames, and do not allow overwriting.</li>
 <li>In GitHub → repository Settings → Secrets and variables → Actions → Variables, add <code>VITE_CLOUDINARY_CLOUD_NAME</code> and <code>VITE_CLOUDINARY_UPLOAD_PRESET</code>.</li>
 <li>Run the Pages deployment again. For local testing, put the same values in <code>.env.local</code> and restart the development server.</li>
 </ol><p>These are public upload settings. Never put an API secret in this app. Hosted images need to remain available for signatures already sent. Monitor upload usage; a public unsigned preset can be used outside the site.</p></details>;}

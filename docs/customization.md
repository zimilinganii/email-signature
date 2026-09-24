# Customization

Edit `src/data/defaultProfile.js` to change the default profile. The generator also lets users edit fields at runtime. Keep image URLs publicly reachable if you use a profile image.

Choose Personal for a framed circular portrait, a left social rail, title badge and contact details, or Business for a logo and company above your name, center contact details, right portrait and accent social strip. Neither layout includes location. Each mode preserves its draft while you switch.

Use the upload shortcut in Details or the Photos & logo tab. PNG/JPG/WebP files must be under 5 MB. Personal photos are cropped square for the circle; business photos are cropped to a 2:3 portrait. Adjust zoom, horizontal and vertical crop position immediately after upload; adjust displayed size at any time. Logos retain their aspect ratio. Style controls accent, text and background colors. Personal mode also offers a stacked layout. Empty photo placeholders appear only in the editor, never in exports.

Uploads are processed locally and embedded in downloaded HTML. They are not published to an image host. Gmail installation requires replacing local uploads with public HTTPS image URLs because embedded data images are not reliable across mail clients. Hosted photos should already use the template's aspect ratio (square for personal, 2:3 for business). Use colors with readable contrast; recipient dark mode may alter colors. Outlook versions may show square corners rather than circular frames.

Review & create approves the current preview and reveals export actions. Editing any field requires reviewing again. Copy includes both HTML and a plain-text alternative. Contact symbols and social badges keep their text labels readable when fonts differ.

## Reference-inspired contact icons

Email and LinkedIn use blue tiles; GitHub uses a cat silhouette, phone uses a handset, and personal websites use a profile in a browser window. The code-drawn PNGs in `public/icons/` are 96px assets displayed at 16px. They are interpretations of the supplied references, not cropped copies. Labels remain visible if email clients block images.

Rebuild icons with `node scripts/build-icons.mjs`. Previews use local assets; exported HTML uses public HTTPS URLs. Set `VITE_PUBLIC_ASSET_BASE_URL` to a permanent public base URL when moving hosting, and deploy the `icons/` directory there. Local exports default to the current GitHub Pages address. Making the repository private must not remove the public image host; previously sent signatures still reference their original URLs.

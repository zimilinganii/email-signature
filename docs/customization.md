# Customization

Edit `src/data/defaultProfile.js` to change the default profile. The generator also lets users edit fields at runtime. Keep image URLs publicly reachable if you use a profile image.

Choose Personal for everyday contact details or Business to show your role, company and optional logo. Style & images controls accent, text and background colors, stacked or side-by-side layouts, photo dimensions and roundness, and logo size. Uploaded PNG/JPG/WebP files must be under 5 MB. Photos are cropped square and can be zoomed before export; logos retain their aspect ratio.

Uploads are processed locally and embedded in downloaded HTML. They are not published to an image host. Gmail installation requires replacing local uploads with public HTTPS image URLs because embedded data images are not reliable across mail clients. Hosted photos should already be square. Use colors with readable contrast; recipient dark mode may alter colors.

Review & create approves the current preview and reveals export actions. Editing any field requires reviewing again. Copy includes both HTML and a plain-text alternative. Contact symbols and social badges keep their text labels readable when fonts differ.

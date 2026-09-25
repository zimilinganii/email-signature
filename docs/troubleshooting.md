# Troubleshooting

| Symptom | Checks and recovery |
| --- | --- |
| Old layout still visible | Confirm latest production release deployed; refresh with Ctrl+Shift+R. Develop is not production. Regenerate installed signatures. |
| Only text after paste | Use Copy signature, not Copy HTML; normal paste; turn off Gmail plain-text mode or enable Outlook HTML format. Replace the saved old signature and start a new message. |
| Literal HTML tags | Raw source was pasted. Open saved/downloaded HTML in a browser and copy the rendered result. |
| Image missing | Finish Review & create upload; verify public HTTPS image URL; recipient may block remote images. Do not delete hosted assets used by existing signatures. |
| Signature too long | Remove unnecessary platforms/text or shorten links. The 8,000-character app guard remains even without a platform-count limit. Downloading does not bypass provider limits. |
| Upload rejected | Confirm unsigned preset, cloud name, JPG/PNG allowed formats and quota. Never put provider secrets in frontend variables. |
| Platform list appeared filtered | The old datalist filtered on Portfolio. The new select lists all platform choices immediately. |
| New empty platform missing in preview | Enter a valid full URL and enable Show. Empty rows intentionally do not render. |
| Icons missing | Deploy public/icons and palette variants to a stable public HTTPS base URL. |
| Very long contacts widen signature | Business intentionally preserves single-line contacts; narrow screens scroll. Shorten display details if a compact signature is essential. |
| Google button unavailable | Configure the public OAuth client ID and authorized origins, enable Gmail API, add test users and rebuild. Manual copy remains available. |
| Wiki repository not found | Enable Wiki and save its first page, or check repository permissions/plan. docs remains available without Wiki. |
| Pages deployment 404 | Confirm Pages is enabled with GitHub Actions as source and repository visibility/plan supports Pages. |

Do not send secrets, access tokens or personal message contents in bug reports. Include browser/provider/version, the copy method and a redacted screenshot.


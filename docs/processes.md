# Process diagrams

## Editing, upload, review and export

```mermaid
flowchart TD
  Start[Choose personal or business] --> Edit[Edit contact fields, platforms and colors]
  Edit --> Validate{Valid fields and image sources?}
  Validate -- No --> Errors[Show field errors]
  Errors --> Edit
  Validate -- Yes --> Preview[Generate live HTML preview]
  Preview --> Review[Review and create]
  Review --> Local{Local image present?}
  Local -- Yes --> Host[Upload optimized image to Cloudinary]
  Host --> Result{Upload succeeded?}
  Result -- No --> Retry[Explain failure; retry or explicit image-free copy]
  Retry --> Review
  Result -- Yes --> Replace[Replace local data URL with public HTTPS URL]
  Local -- No --> Guard
  Replace --> Guard[Compact HTML and check export size]
  Guard --> Ready{Gmail-ready?}
  Ready -- No --> Fix[Explain size/image issue; edit or omit uploads explicitly]
  Fix --> Edit
  Ready -- Yes --> Export[Copy formatted / copy HTML / download]
  Export --> Install[Paste rendered signature in email settings]
  Install --> Test[Save defaults and test a new message]
  Preview --> Edit
```

## Image lifecycle

```mermaid
sequenceDiagram
  participant User
  participant Editor as ImageEditor
  participant Canvas as Browser canvas
  participant App
  participant Host as Cloudinary
  User->>Editor: Select JPG / PNG / WebP
  Editor->>Editor: Check 5 MiB and 40 megapixel input limits
  Editor->>Canvas: Decode, crop personal photo, retain logo aspect ratio
  Canvas-->>App: Optimized JPEG / PNG data URL, at most 96 KiB
  User->>App: Review and create
  App->>Host: Unsigned preset upload (no API secret)
  alt Upload succeeds
    Host-->>App: Public HTTPS image URL
    App->>App: Ignore stale result if draft changed; otherwise update profile
  else Upload fails
    App-->>User: Retry/setup guidance; no silent image removal
  end
```

Browser-side upload limits can be bypassed; unsigned hosting requires quota monitoring and provider restrictions. Removing a photo from the editor does not delete its hosted asset.

## Clipboard paths

```mermaid
flowchart TD
  Copy[Copy signature] --> Guard[Require ready export]
  Guard --> Modern[ClipboardItem: text/html plus text/plain]
  Modern --> Success{Write succeeds?}
  Success -- Yes --> Paste[Normal paste into provider editor]
  Success -- No --> Legacy[Select hidden rendered HTML; copy event supplies both MIME types]
  Legacy --> Check{Confirmed HTML copy?}
  Check -- Yes --> Paste
  Check -- No --> Error[Explain blocked clipboard; offer rendered HTML download route]
  Raw[Copy HTML] --> Source[Save source as .html]
  Download[Download HTML] --> File[Open .html in browser]
  Source --> File
  File --> Select[Copy rendered result]
  Select --> Paste
```

## Optional Gmail OAuth

```mermaid
sequenceDiagram
  participant User
  participant App
  participant GIS as Google Identity Services
  participant Gmail as Gmail REST API
  User->>App: Connect Google
  App->>GIS: Request gmail.settings.basic
  GIS->>User: Consent prompt
  alt Consent succeeds
    GIS-->>App: Short-lived token kept in memory
    User->>App: Install in Gmail
    App->>App: Validate token, hosted images and HTML budget
    App->>Gmail: GET users/me/settings/sendAs
    Gmail-->>App: Send-as identities
    App->>Gmail: PATCH primary identity (signature only)
    Gmail-->>App: Sanitized signature / result
    App-->>User: Success; verify new Gmail message
  else Canceled, denied or API error
    App-->>User: Error and manual-copy fallback
  end
  User->>App: Disconnect
  App->>GIS: Revoke token grant
```

No email-reading/sending/contact scopes are requested. No Google client secret or refresh token is stored. Live authorization still needs a configured Cloud project and test account.

## Release process

```mermaid
flowchart LR
  Feature[feature / fix / docs branch] --> PR[PR into develop]
  PR --> CI[Unit + browser tests + build]
  CI --> Develop[develop integration]
  Develop --> Review[Manual preview and provider checks]
  Review --> Release[Release PR: develop into main]
  Release --> Approval[Review and approve]
  Approval --> Main[main production]
  Main --> Pages[GitHub Pages deployment]
  Docs[docs source] --> Wiki[Explicit Wiki sync]
```


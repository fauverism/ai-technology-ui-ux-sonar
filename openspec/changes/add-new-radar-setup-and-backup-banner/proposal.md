## Why

Users are likely to share the live radar URL with others for testing, but the app currently stores data only in the local browser storage. This means new users may lose their work if they clear storage, switch browsers/devices, or don’t export before making changes. Providing an explicit “create your own” start point plus a visible alpha/backup reminder will reduce confusion and help people keep their data safe.

## What Changes

- Add a **“Create Your Own”** button to the top bar that creates a new radar instance (empty or minimal starter set) and makes it clear the user is working on their own copy.
- Offer a minimal “starter” template when creating a new radar: one sample item per quadrant in different rings, with a label indicating it is a sample.
- Add an always-visible **alpha/backup notice banner** to the UI that explains data is stored locally, encourages regular exports, and points to the Export/Import buttons.
- Ensure the “Create Your Own” action does not overwrite a user’s current work without confirmation.

## Capabilities

### New Capabilities
- `radar-starter` : Introduces a “Create Your Own” workflow that starts a fresh radar (minimal starter data) and keeps it separate from any existing customizations.
- `alpha-backup-banner` : Adds an always-visible banner warning that the app is in alpha, data is stored locally, and exporting is recommended.

### Modified Capabilities
- `<none>`

## Impact

- UI changes to the header (new button + banner area).
- App state management updates to support a “new radar” / “starter radar” mode.
- Persistence logic (localStorage) stays the same, but will need to support initializing a new data set without losing the ability to export/import.
- Possible text/copy changes throughout the app to make the alpha/beta status and backup guidance clear.

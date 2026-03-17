# Changelog

All notable changes to the UX Technology Radar are documented in this file.

## [Unreleased]

### Added

- **Create Your Own button** in the header for starting a fresh radar instance
  - When clicked, displays a confirmation dialog to prevent accidental data loss
  - Recommends exporting current radar before proceeding
  - Initializes a new radar with a minimal starter dataset (one sample item per quadrant)

- **Alpha/Backup reminder banner**
  - Always-visible banner below the header that warns users the app is an alpha preview
  - Clearly communicates that data is stored locally in the browser only
  - Explicitly calls out the Export button as the recommended backup mechanism
  - Dismissible for the current session (returns on page reload)

- **Starter dataset** (`getStarterData()`)
  - Four minimal sample items (one per quadrant) in different rings to demonstrate the radar structure
  - Each item clearly labeled as "Sample item — replace me!" to indicate they are examples
  - Helps new users understand what a populated radar looks like

### Changed

- **Header layout**: "Create Your Own" button added next to existing controls
- **App initialization**: New users can now choose between creating their own radar (starter mode) or importing an existing one

### Technical Details

- New export: `getStarterData()` in `src/data.js` provides minimal starter items
- New button handler in `src/main.js` for "Create Your Own" workflow with confirmation flow
- Banner styling added to `src/styles/main.css` using existing CSS variables and amber-100 background
- Banner dismiss behavior tracks session state (not persisted across page reloads)

---

## Notes for Testers

When sharing the live URL with testers:
- New visitors will see the alpha/backup banner immediately
- They can click "Create Your Own" to start a fresh radar with sample data
- Emphasize the importance of exporting their work regularly (Export button in header)
- Data is lost if they clear browser storage or switch devices — export is their safety net

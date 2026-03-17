## Context

The app is a single-page vanilla JS radar editor that stores its data entirely in `localStorage`. Users can add/edit/delete radar items, and they can export/import the full data set as JSON. The header currently includes buttons for Add, Reset, Export, and Import. There is no persistent UI messaging about alpha status or data safety.

This change introduces a better onboarding path for new users (a dedicated "Create Your Own" start point) and makes the risk of data loss explicit via an always-visible banner.

## Goals / Non-Goals

**Goals:**
- Provide a clear way for a user to start with their own radar (minimal starter content). This should feel like a “fresh canvas” while still giving a hint of what a radar looks like.
- Surface a persistent, low-distraction message that explains data is stored locally and encourages regular exports.
- Ensure the “Create Your Own” action does not overwrite existing user work without explicit confirmation.

**Non-Goals:**
- Implementing server-side persistence or user accounts.
- Automating backups or syncing across devices.
- Reworking the radar visualization or changing the existing data model.

## Decisions

### 1) Location and behavior of the “Create Your Own” button
**Decision:** Add a new button in the header next to “Add Item” labeled **Create Your Own**.
- Clicking it opens a confirmation dialog (modal or `confirm()`), explaining that continuing will start a new radar and that they should export first if they want to keep their current work.
- If confirmed, it initializes app state with a small starter dataset (one sample item per quadrant in different rings) and persists it.

**Alternatives considered:**
- A “New Radar” dropdown listing multiple starter templates (too heavy for current scope).
- Using “Reset” as the entry point (confusing because Reset currently reverts to default full dataset and provides no “sample” guidance).

### 2) Starter dataset content and labeling
**Decision:** The starter dataset is a minimal set of 4 items (one per quadrant) with ring values spread across Adopt/Trial/Assess/Hold. Each starter item will include a `description` that clearly labels it as a sample, e.g. “Sample item — replace me!”.

### 3) Alpha / backup banner design and placement
**Decision:** Add a dismissible yet persistent banner below the header (above the radar content) that reads:
> **Alpha preview:** Your radar is stored locally in this browser. Export regularly to avoid losing changes. Use the Export button in the header.

- The banner should be visible by default on first load.
- It can be dismissible via an “X” icon, but if dismissed it should remain dismissed for the session (no persistence required). If we want persistence later, we can store a `bannerDismissed` flag in localStorage.
- The banner should not block the radar content on smaller screens; it should be compact and responsive.

### 4) Persistence behavior
**Decision:** The existing `Storage` abstraction remains unchanged (still uses `localStorage`). The “Create Your Own” action will call the same `persist()` logic used during save/reset to write the new starter data to storage and update the UI.

## Risks / Trade-offs

- [Users ignore the banner] → Mitigation: Make the copy concise, use consistent warning styling (e.g., yellow background), and mention the export button explicitly.
- [Users think Export is automatic] → Mitigation: Keep the call to action explicit: “Export regularly”.
- [Starter data could be mistaken for real items] → Mitigation: Label sample items clearly and keep the starter set minimal.

## Open Questions

- Should the banner be dismissible permanently (persisted) or only per session?
- Do we want a separate “Start from blank” option (zero items) as well as a “sample” starter? For now, we will ship only the sample starter and can revisit if desired.

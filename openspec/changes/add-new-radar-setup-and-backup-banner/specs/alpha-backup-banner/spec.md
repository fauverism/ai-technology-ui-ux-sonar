## ADDED Requirements

### Requirement: Always-visible alpha/backup notice
The system SHALL display an always-visible banner that warns users the application is an alpha preview and that their data is stored locally.

#### Scenario: Banner is visible on page load
- **WHEN** the user loads the application
- **THEN** the banner is displayed below the main header and above the radar content
- **AND** the banner text includes a mention of local storage and a prompt to export regularly

#### Scenario: Banner is “dismissed” for the session
- **WHEN** the user clicks a dismiss (close) control on the banner
- **THEN** the banner is hidden for the remainder of the session (until the page reloads)

### Requirement: Banner copy references export feature
The system SHALL include a prominent reference to the existing Export button in the banner copy.

#### Scenario: Banner includes export call to action
- **WHEN** the banner is displayed
- **THEN** the banner copy mentions "Export" and that exporting is how users can back up their work

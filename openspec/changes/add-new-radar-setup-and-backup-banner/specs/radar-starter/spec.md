## ADDED Requirements

### Requirement: Users can create a new radar instance
The system SHALL provide a UI control labeled "Create Your Own" that allows a user to start a fresh radar instance.

#### Scenario: User starts a new radar with confirmation
- **WHEN** the user clicks the "Create Your Own" button
- **THEN** the system displays a confirmation dialog explaining that their current radar will be replaced and encouraging export before proceeding
- **AND** the confirmation dialog has options to cancel or proceed

#### Scenario: User confirms starting a new radar
- **WHEN** the user confirms they want to start a new radar
- **THEN** the system replaces the current radar data with a starter dataset consisting of exactly four items (one per quadrant) and persists it to localStorage
- **AND** the system updates the UI to show the new starter dataset

#### Scenario: User cancels starting a new radar
- **WHEN** the user cancels the confirmation dialog
- **THEN** the system keeps the existing radar data unchanged and does not persist any changes

### Requirement: Starter dataset clearly indicates it is a sample
The system SHALL include a clear label in the starter items to show they are samples and can be replaced.

#### Scenario: Starter item labeling
- **WHEN** the starter dataset is loaded
- **THEN** each starter item’s description SHALL include the phrase "Sample item" (or equivalent) to indicate it is not a real tracking entry

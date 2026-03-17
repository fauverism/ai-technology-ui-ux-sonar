## 1. UI Updates

- [ ] 1.1 Add a "Create Your Own" button to the header next to the Add Item button
- [ ] 1.2 Add a persistent alpha/backup banner below the header that includes export guidance
- [ ] 1.3 Implement a dismiss control for the banner that hides it for the current session

## 2. Behavior and State

- [ ] 2.1 Implement a confirmation dialog when the user clicks "Create Your Own" explaining the data will be replaced and recommending export
- [ ] 2.2 Create a starter dataset with one sample item per quadrant and persist it when the user confirms
- [ ] 2.3 Ensure canceling the confirmation dialog keeps existing data unchanged

## 3. Copy and Content

- [ ] 3.1 Ensure starter items include "Sample item" wording in their descriptions
- [ ] 3.2 Ensure banner copy mentions local storage and explicitly calls out using the Export button

## 4. Testing / Verification

- [ ] 4.1 Verify the banner displays on load and can be dismissed for the session
- [ ] 4.2 Verify the "Create Your Own" flow replaces the radar data only after confirmation
- [ ] 4.3 Verify existing export/import behavior still works after changes

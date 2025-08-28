# UI Implementation Plan

This document outlines the step-by-step plan for building the UI layer of the application. Each task is designed to be a self-contained, verifiable increment.

---

### Task 1: Basic Application Layout and Page Structure

**Objectives:**
- Create the main `App` component to set up global Ant Design providers.
- Implement the `ProductDashboardPage` component, which will serve as the main container for all views.
- Add the fixed header with the `Segmented` control for view switching.

**Acceptance Criteria:**
- The `App.tsx` file correctly wraps the application in Ant Design's `ConfigProvider` and `App`.
- The `ProductDashboardPage.tsx` component is created and rendered by `App.tsx`.
- The page displays a fixed header at the top.
- The header contains a `Segmented` control with two options: "Product Ideas" and "Reality Checks".
- The component manages an `activeView` state, which defaults to `'ideas'`.
- The `Segmented` control is wired to update the `activeView` state.
- A placeholder text is displayed below the header, indicating which view (`'ideas'` or `'checks'`) is currently active.

**Manual Testing Plan:**
1.  Run the application.
2.  Verify that a header is visible at the top of the page.
3.  Observe that the header contains a control with "Product Ideas" and "Reality Checks" options.
4.  "Product Ideas" should be selected by default, and a placeholder text like "Product Ideas View" should be visible below it.
5.  Click on "Reality Checks". The selection in the control should update, and the placeholder text should change to "Reality Checks View".
6.  Click back on "Product Ideas". The view should revert to the "Product Ideas View" placeholder.

---

### Task 2: Create the `RealityChecksSummary` Component

**Objectives:**
- Build the `RealityChecksSummary` component, which displays the total number of reality checks for a product idea and a visual breakdown of their statuses.

**Acceptance Criteria:**
- A new component is created at `src/components/reality-checks/RealityChecksSummary.tsx`.
- The component accepts a `productIdeaId` prop.
- It uses the `useRealityChecks({ productIdeaId })` hook to fetch summary data.
- It displays the total count of reality checks in a large font.
- Below the count, it renders a horizontal bar composed of four colored `div`s representing 'New', 'In Progress', 'Proved', and 'Disproved' statuses.
- The width of each colored `div` is proportional to the count of checks in that status (e.g., if 2 out of 5 checks are 'Proved', the green div takes up 40% of the bar's width).
- If there are no reality checks, the bar should be empty or show a default state.

**Manual Testing Plan:**
1.  For testing, the `RealityChecksSummary` component will be temporarily rendered on the `ProductDashboardPage`.
2.  Hardcode a known `productIdeaId` from the pre-seeded data.
3.  Run the application.
4.  Verify that the component displays the correct total number of reality checks for that product idea.
5.  Verify that the colored bar beneath the number accurately reflects the proportion of statuses (e.g., a mix of light blue for 'New', green for 'Proved', etc.).
6.  Test with a product idea that has zero reality checks to ensure it displays correctly (e.g., shows '0').

---

### Task 3: Create the `ProductIdeaCard` Component

**Objectives:**
- Create a read-only card component to display a summary of a single product idea.
- This card will be the primary building block for the main product ideas list.

**Acceptance Criteria:**
- A new component is created at `src/components/product-ideas/ProductIdeaCard.tsx`.
- The component accepts a `productIdea` object and an `onClick` function as props.
- It uses an Ant Design `Card` as its root element.
- It displays the product idea's `name` and `description`.
- It displays three sections for Impact, Confidence, and Ease, each showing the label, the numerical value, and a non-editable `antd` `Progress` component to visualize the value.
- It displays the calculated `iceScore` in a separate section.
- It integrates and renders the `RealityChecksSummary` component, passing the `productIdea.id`.
- The entire card is clickable and triggers the `onClick` prop.

**Manual Testing Plan:**
1.  For testing, render a single `ProductIdeaCard` on the `ProductDashboardPage`, passing it a hardcoded `productIdea` object from the pre-seeded data.
2.  Run the application.
3.  Verify that the card displays the correct name, description, and ICE score.
4.  Check that the Impact, Confidence, and Ease sections each have a label, a number, and a progress bar showing the correct value.
5.  Confirm that the `RealityChecksSummary` sub-component is visible and displays the correct data for that idea.
6.  Click anywhere on the card and verify that a console log (or a temporary alert) is triggered, confirming the `onClick` handler works.

---

### Task 4: Implement `ProductIdeasView` and Integrate into Dashboard

**Objectives:**
- Create the `ProductIdeasView` component to display a list of all `ProductIdeaCard`s.
- Integrate this view into the `ProductDashboardPage` to replace the placeholder.

**Acceptance Criteria:**
- A new component is created at `src/components/product-ideas/ProductIdeasView.tsx`.
- It uses the `useProductIdeas` hook to get the list of all product ideas.
- The list of ideas is sorted in descending order by `iceScore`.
- The component maps over the sorted list and renders a `ProductIdeaCard` for each one.
- The `ProductDashboardPage` is updated: when `activeView` is `'ideas'` and no specific idea is selected, it renders the `ProductIdeasView` component.
- The placeholder text for the "Product Ideas" view is removed.

**Manual Testing Plan:**
1.  Run the application.
2.  The "Product Ideas" view should be active by default.
3.  You should see a list of product idea cards, rendered vertically.
4.  Verify that the cards are sorted with the highest ICE score at the top.
5.  Scroll down to see all available product ideas from the seed data.

---

### Task 5: Implement the `ProductIdeaForm` Modal

**Objectives:**
- Create the `ProductIdeaForm` component as a modal for adding new product ideas.
- Wire up the floating action button on the main ideas view to open this modal.

**Acceptance Criteria:**
- A new component is created at `src/components/product-ideas/ProductIdeaForm.tsx`.
- It uses an `antd` `Modal` that is controlled by `isOpen` and `onClose` props.
- The modal contains an `antd` `Form` with fields for Name (Input), Description (Input.TextArea), Impact (Slider), Confidence (Slider), and Ease (Slider).
- The modal displays the calculated ICE score, which updates in real-time as the sliders are moved.
- The form is connected to the `addProductIdea` function from the `useProductIdeas` hook.
- The `ProductDashboardPage` now includes a single `antd` `FloatButton` with a plus icon.
- When the `ProductIdeasView` is visible, clicking the `FloatButton` opens the "New Product Idea" modal.

**Manual Testing Plan:**
1.  Run the application. You should see the product ideas list and a floating '+' button in the bottom right corner.
2.  Click the '+' button. The "New Product Idea" modal should appear.
3.  Fill in the "Name" and "Description" fields.
4.  Adjust the sliders for "Impact", "Confidence", and "Ease". Verify that the "ICE score" text updates as you move them.
5.  Click the "Create" button. The modal should close, and the new product idea should appear in the list, sorted according to its ICE score.
6.  Click the '+' button again. This time, click the "Cancel" button or the 'x' in the corner. The modal should close without creating a new idea.

---

### Task 6: Implement Read-Only `ProductIdeaOverview`

**Objectives:**
- Create the `ProductIdeaOverview` component to display the detailed view of a single product idea.
- Implement the navigation logic in `ProductDashboardPage` to switch between the list view and the overview.

**Acceptance Criteria:**
- A new component `ProductIdeaOverview.tsx` is created.
- It accepts a `productIdeaId` and an `onBack` function as props.
- It uses the `useProductIdeas` hook to fetch the data for the specified `productIdeaId`.
- The layout matches the sketch, including a header with a back arrow and the idea's name.
- It displays the description, the ICE inputs (as non-editable sliders for now), the final ICE score, and the `RealityChecksSummary` component.
- In `ProductDashboardPage`, clicking a `ProductIdeaCard` in `ProductIdeasView` now hides the list and renders the `ProductIdeaOverview` for the selected idea.
- Clicking the back arrow in the `ProductIdeaOverview` header calls the `onBack` prop, which makes the `ProductDashboardPage` return to the `ProductIdeasView`.

**Manual Testing Plan:**
1.  Run the application and view the list of product ideas.
2.  Click on any `ProductIdeaCard`.
3.  The view should transition to a detailed overview of that specific idea.
4.  Verify the idea's name is in the header, and its description, ICE score, and reality check summary are displayed correctly.
5.  Click the back arrow in the top-left of the header.
6.  The view should return to the full list of product ideas.

---

### Task 7: Implement Editable `ProductIdeaOverview`

**Objectives:**
- Enhance the `ProductIdeaOverview` to allow editing of the idea's details.
- Add the delete functionality.

**Acceptance Criteria:**
- In `ProductIdeaOverview`, the `Typography.Title` for the name and `Typography.Paragraph` for the description are now editable using Ant Design's `editable` prop.
- The three sliders for Impact, Confidence, and Ease are now active and can be changed.
- Changes to any of these fields trigger the `updateProductIdea` function from the `useProductIdeas` hook.
- A delete button with a `DeleteOutlined` icon is present in the header.
- Clicking the delete button shows an `antd` `Modal.confirm` dialog.
- Upon confirmation, the `removeProductIdea` function is called, and the view navigates back to the product ideas list.

**Manual Testing Plan:**
1.  Navigate to the `ProductIdeaOverview` for any idea.
2.  Click the title. An input field should appear. Change the name and press Enter. The title should update.
3.  Navigate back to the list and verify the name has been updated there as well.
4.  Return to the overview. Click the description to edit it. Verify the change is saved.
5.  Adjust the "Impact" slider. The ICE score should update in real-time, and the change should be saved.
6.  Click the delete icon in the header. A confirmation popup should appear.
7.  Click "Cancel". The dialog should close, and nothing should happen.
8.  Click the delete icon again and click "OK". The idea should be deleted, and you should be redirected to the main product ideas list.

---

### Task 8: Create Kanban View Components (`RealityCheckCard`, `RealityChecksKanban`)

**Objectives:**
- Create the `RealityCheckCard` component.
- Create the `RealityChecksKanban` component to display the cards in four status columns.
- Integrate the Kanban into both the global "Reality Checks" tab and the `ProductIdeaOverview`.

**Acceptance Criteria:**
- `RealityCheckCard.tsx` is created. It displays the `hypothesis`, the associated product idea's name (if any), and the date range. It has a colored indicator based on its status.
- `RealityChecksKanban.tsx` is created. It accepts an optional `productIdeaId` prop.
- It uses `useRealityChecks` to fetch and filter checks based on the `productIdeaId`.
- It renders four columns: "New", "In Progress", "Proved", "Disproved". Each column header shows the count of cards within it.
- It maps over the fetched checks and renders `RealityCheckCard` components in the appropriate columns.
- `ProductDashboardPage` now renders the `RealityChecksKanban` (without a `productIdeaId` prop) when the "Reality Checks" tab is active.
- `ProductIdeaOverview` now renders the `RealityChecksKanban` (with its `productIdeaId`) below the main details panel.
- Drag-and-drop is not implemented yet. The board is read-only.

**Manual Testing Plan:**
1.  Run the application and navigate to a `ProductIdeaOverview`.
2.  Below the idea's details, verify that a Kanban board appears, showing only the reality checks associated with that specific idea, organized into the correct status columns.
3.  Navigate back to the main screen and click the "Reality Checks" tab in the header.
4.  Verify that a global Kanban board appears, showing *all* reality checks from the seed data, organized into the correct status columns.
5.  Check that each card displays the hypothesis, product idea name, and date range correctly.

---

### Task 9: Implement Drag-and-Drop in `RealityChecksKanban`

**Objectives:**
- Add drag-and-drop functionality to the `RealityChecksKanban` component to allow users to change the status of a reality check.

**Acceptance Criteria:**
- A drag-and-drop library (like `react-dnd`) is added to the project.
- `RealityCheckCard`s can be dragged.
- The four columns in `RealityChecksKanban` are configured as drop targets.
- When a card is dropped into a new column, the `updateRealityCheck` function from `useRealityChecks` is called with the check's ID and the new status.
- The UI updates immediately to reflect the change.

**Manual Testing Plan:**
1.  Navigate to the global "Reality Checks" view.
2.  Click and drag a card from the "New" column and drop it into the "In Progress" column.
3.  The card should move to the "In Progress" column, and the counts in both column headers should update.
4.  Refresh the page. The card should remain in the "In Progress" column, confirming the change was persisted.
5.  Navigate to a `ProductIdeaOverview` and repeat the drag-and-drop test on its filtered Kanban board. Verify it works there as well.

---

### Task 10: Implement `RealityCheckForm` Modal

**Objectives:**
- Create the `RealityCheckForm` component for creating and editing reality checks.

**Acceptance Criteria:**
- A new component `src/components/reality-checks/RealityCheckForm.tsx` is created.
- It's a modal that supports both "create" and "edit" modes based on props (`editingCheckId`).
- The form includes:
    - A `Select` dropdown for "Product Idea", populated from `useProductIdeas`.
    - A `TextArea` for "We believe that...".
    - A `TextArea` for "To verify that, we will...".
    - A `DatePicker.RangePicker` for dates.
    - A `Segmented` control for the status.
- In "edit" mode, the form is pre-populated with the check's data, and a "Delete" button is visible.
- The form is connected to `addRealityCheck`, `updateRealityCheck`, and `removeRealityCheck` from the `useRealityChecks` hook.
- The `defaultProductIdeaId` prop correctly sets the initial value of the "Product Idea" dropdown when creating a new check.

**Manual Testing Plan:**
1.  For this task, the form will not be fully integrated yet. We will add a temporary button to the `ProductDashboardPage` to open the modal in its various states for testing.
2.  Click a button to open the form in "create" mode. Verify all fields are empty.
3.  Click a button to open the form in "create" mode with a `defaultProductIdeaId`. Verify the "Product Idea" dropdown is pre-selected.
4.  Click a button to open the form in "edit" mode with a known `editingCheckId`. Verify all fields are populated with the correct data and a "Delete" button is visible.
5.  Fill out the form in create mode and click "Create". Verify a console log confirms the correct data was submitted.
6.  Modify data in edit mode and click "Update". Verify a console log confirms the correct data was submitted.
7.  In edit mode, click "Delete". Verify the delete function is triggered via console log.

---

### Task 11: Final Integration of `RealityCheckForm` and All User Flows

**Objectives:**
- Integrate the `RealityCheckForm` into the application, connecting all remaining user interaction points.

**Acceptance Criteria:**
- The temporary test buttons are removed.
- In `ProductDashboardPage`, the logic for the `FloatButton` is completed:
    - On `ProductIdeaOverview`, it opens the `RealityCheckForm` in "create" mode, with `defaultProductIdeaId` set to the current idea.
    - On the global "Reality Checks" view, it opens the form in "create" mode with no `defaultProductIdeaId`.
- In `RealityChecksKanban`, clicking on any `RealityCheckCard` now opens the `RealityCheckForm` in "edit" mode for that specific check.
- All create, update, and delete operations through the form are fully functional and persist data.

**Manual Testing Plan:**
1.  Navigate to the `ProductIdeaOverview` for "AI-Powered Grocery List".
2.  Click the floating '+' button. The "New Reality Check" modal should appear, with "AI-Powered Grocery List" pre-selected in the dropdown.
3.  Fill out and create the check. It should appear on the Kanban board below.
4.  Now, navigate to the global "Reality Checks" tab.
5.  Click the floating '+' button. The modal should appear, but the "Product Idea" dropdown should be empty (or show a placeholder like "Not connected...").
6.  Create a check here. Verify it appears on the global Kanban.
7.  On any Kanban board, click an existing reality check card. The "Edit Reality Check" modal should open with that card's data.
8.  Change the hypothesis and click "Update". The modal should close, and the card on the board should show the new text.
9.  Click a card again to open the edit modal. Click the "Delete" button. After confirming, the modal should close, and the card should be removed from the Kanban board.
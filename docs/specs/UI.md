# UI Layer Specification

This document specifies the UI layer of the application, breaking it down into pages and reusable components based on the provided sketches. All components will adhere to Ant Design's principles and utilize the data access patterns defined in `docs/guidelines/Zustand-guidelines.md`.

## 1. High-Level Structure

The application is a single-page application (SPA). It will be composed of a main layout, one primary page, and several reusable components.

### 1.1. `App` Component

The root component that sets up routing and global providers.

-   **Location**: `src/App.tsx`
-   **Purpose**: To provide global context, including Ant Design's `ConfigProvider` and `App` contexts for message notifications, and to render the main page.
-   **Composition**:
    -   Wraps the application with `ConfigProvider` and `App as AntApp` from 'antd' to enable global message notifications.
    -   Renders `ProductDashboardPage`.

## 2. Pages

### 2.1. `ProductDashboardPage`

-   **Location:** `src/pages/ProductDashboard.tsx`
-   **Purpose:** The main application page that allows users to switch between the Product Ideas list and the global Reality Checks Kanban board. It also handles rendering the detailed view for a single product idea and manages the single, contextual `FloatingActionButton`.
-   **Data Access:** None directly. It orchestrates child components that handle their own data access.
-   **Internal State:**
    -   `activeView: 'ideas' | 'checks'`: Manages which main tab is selected. Defaults to `'ideas'`.
    -   `selectedProductIdeaId: string | null`: Manages which product idea is selected for viewing its details.
    -   `isProductIdeaFormOpen: boolean`: Manages the visibility of the "New Product Idea" modal.
    -   `isRealityCheckFormOpen: boolean`: Manages the visibility of the "New/Edit Reality Check" modal.
-   **Composition:**
    -   A fixed header containing an `antd` `Segmented` control with "Product Ideas" and "Reality Checks" options.
    -   Conditionally renders content based on `activeView` and `selectedProductIdeaId`:
        -   If `activeView === 'ideas'` and `selectedProductIdeaId === null`, it renders `ProductIdeasView`.
        -   If `activeView === 'ideas'` and `selectedProductIdeaId` is a string, it renders `ProductIdeaOverview`.
        -   If `activeView === 'checks'`, it renders the `RealityChecksKanban` component directly.
    -   An antd `FloatButton` with a `PlusOutlined` icon.
    -   Renders `ProductIdeaForm` and `RealityCheckForm` modals, controlling their visibility via state. The `RealityCheckForm` receives a `defaultProductIdeaId` prop based on the current context.
-   **User Interactions:**
    -   Clicking the `Segmented` control updates `activeView`.
    -   Selecting a product idea from `ProductIdeasView` sets `selectedProductIdeaId`.
    -   From `ProductIdeaOverview`, clicking the back button resets `selectedProductIdeaId` to `null`.
-   **Logic:**
    -   The `onClick` handler for the `antd` `FloatButton` is contextual:
        -   If `ProductIdeasView` is visible (`selectedProductIdeaId` is null), it sets `isProductIdeaFormOpen` to `true`.
        -   If `ProductIdeaOverview` is visible (`selectedProductIdeaId` is not null), it sets `isRealityCheckFormOpen` to `true`, passing `selectedProductIdeaId` to the form.
        -   If the global `RealityChecksKanban` is visible (`activeView === 'checks'`), it sets `isRealityCheckFormOpen` to `true` without a default product idea.

## 3. Components

### 3.1. `ProductIdeasView`

-   **Location:** `src/components/product-ideas/ProductIdeasView.tsx`
-   **Purpose:** Displays a list of all product ideas, sorted by ICE score.
-   **Props:**
    ```typescript
    interface ProductIdeasViewProps {
      onSelectIdea: (id: string) => void;
    }
    ```
-   **Data Access:**
    -   `useProductIdeas()`: To get the `productIdeas` array.
-   **Internal State:** None.
-   **Composition:**
    -   Maps over the `productIdeas` array from the hook.
    -   For each idea, it renders a `ProductIdeaCard` component.
-   **User Interactions:**
    -   Clicking on a `ProductIdeaCard` invokes the `onSelectIdea` prop with the idea's ID.

### 3.2. `ProductIdeaCard`

-   **Location:** `src/components/product-ideas/ProductIdeaCard.tsx`
-   **Purpose:** A card that provides a high-level summary of a single Product Idea. Used within `ProductIdeasView`.
-   **Props:**
    ```typescript
    interface ProductIdeaCardProps {
      productIdea: ProductIdea;
      onClick: () => void;
    }
    ```
-   **Data Access:** None directly, data is passed via props.
-   **Internal State:** None.
-   **Composition:**
    -   An `antd` `Card` component.
    -   Displays the idea `name` and `description`.
    -   Shows three sections for `Impact`, `Confidence`, and `Ease`, each with a label, value, and a non-editable `antd` `Progress` bar.
    -   Displays the total `iceScore`.
    -   Renders the `RealityChecksSummary` component, passing the `productIdea.id`.
-   **User Interactions:**
    -   The entire card is clickable, triggering the `onClick` prop.

### 3.3. `ProductIdeaOverview`

-   **Location:** `src/components/product-ideas/ProductIdeaOverview.tsx`
-   **Purpose:** Provides a detailed, editable view of a single Product Idea and its associated Reality Checks.
-   **Props:**
    ```typescript
    interface ProductIdeaOverviewProps {
      productIdeaId: string;
      onBack: () => void;
    }
    ```
-   **Data Access:**
    -   `useProductIdeas()`: To get the specific product idea using `productIdeasDict[productIdeaId]` and to call `updateProductIdea` and `removeProductIdea`.
-   **Internal State:**
    -   Manages the state of form inputs (name, description, scores) to allow for editing before saving.
-   **Composition:**
	-   A header section with:
        -   The `onBack` prop of the `PageHeader` is connected to the component's `onBack` prop.
        -   The `title` of the `PageHeader` is an editable `Typography.Title`, displaying the product idea's `name`.
        -   The `extra` content of the `PageHeader` is an Ant Design `Button` with a `DeleteOutlined` icon.
    -   A main panel, with a four-column layout:
        -   **Description** (wider than other columns):** An editable `Typography.Paragraph` for the `description`.
        -   **ICE Inputs Box:** Contains three rows for `Impact`, `Confidence`, and `Ease`. Each row has the metric's name, its current numerical value, and an active Ant Design `Slider`.
		-  **ICE Score Box:** Displays the label "ICE score" and the large, calculated numerical score.
		-  **Reality Checks Box:** Renders the `RealityChecksSummary` component, passing the `productIdea.id`.
    -   Below the main details panel, it renders the `RealityChecksKanban` component, passing the `productIdeaId` to filter the checks.
-   **User Interactions:**
    -   Clicking the back arrow calls the `onBack` prop.
    -   Clicking the delete icon shows a confirmation dialog and then calls `removeProductIdea`.
    -   Editing the title, description, or sliders updates the local state. Changes are saved via `updateProductIdea`.

### 3.4. `ProductIdeaForm`

-   **Location:** `src/components/product-ideas/ProductIdeaForm.tsx`
-   **Purpose:** A modal form for creating a new Product Idea.
-   **Props:**
    ```typescript
    interface ProductIdeaFormProps {
      isOpen: boolean;
      onClose: () => void;
    }
    ```
-   **Data Access:**
    -   `useProductIdeas()`: To call `addProductIdea`.
-   **Internal State:**
    -   Uses `antd` `Form` (`useForm`) to manage input state for `name`, `description`, `impact`, `confidence`, and `ease`.
-   **Composition:**
    -   An `antd` `Modal` titled "New Product Idea".
    -   An `antd` `Form` containing:
        -   `Form.Item` with `Input` for "Name".
        -   `Form.Item` with `Input.TextArea` for "Description".
        -   `Form.Item` with `Slider` for "Impact".
        -   `Form.Item` with `Slider` for "Confidence".
        -   `Form.Item` with `Slider` for "Ease".
    -   Displays the calculated ICE score, which updates as the sliders are adjusted.
    -   "Cancel" and "Create" buttons in the modal footer.
-   **User Interactions:**
    -   Filling in form fields and adjusting sliders.
    -   Clicking "Create" validates the form and calls `addProductIdea`, then closes the modal.
    -   Clicking "Cancel" or the 'x' icon calls the `onClose` prop.

### 3.5. `RealityChecksKanban`

-   **Location:** `src/components/reality-checks/RealityChecksKanban.tsx`
-   **Purpose:** A reusable Kanban board for displaying and organizing Reality Checks.
-   **Props:**
    ```typescript
    interface RealityChecksKanbanProps {
      productIdeaId?: string;
    }
    ```
-   **Data Access:**
    -   `useRealityChecks({ productIdeaId })`: To fetch the relevant checks and summary.
    -   `updateRealityCheck`: To change a check's `status` when it's dragged to a new column.
-   **Internal State:**
    -   `editingCheckId: string | null`: Stores the ID of the reality check being edited to control the `RealityCheckForm` modal.
-   **Composition:**
    -   A layout with four columns: "New", "In Progress", "Proved", and "Disproved". Each column header displays the count of cards within it.
    -   Uses a drag-and-drop library (e.g., `react-dnd`) to enable card movement between columns.
    -   Groups the `realityChecks` array by `status` and maps them to `RealityCheckCard` components in the appropriate column.
    -   Renders a `RealityCheckForm` modal for editing, controlled by `editingCheckId`.
-   **User Interactions:**
    -   Clicking a `RealityCheckCard` sets `editingCheckId` to open the edit form.
    -   Dragging a card from one column to another triggers `updateRealityCheck` with the new status.

### 3.6. `RealityCheckCard`

-   **Location:** `src/components/reality-checks/RealityCheckCard.tsx`
-   **Purpose:** A card representing a single Reality Check on the Kanban board.
-   **Props:**
    ```typescript
    interface RealityCheckCardProps {
      realityCheck: RealityCheck;
      onClick: () => void;
    }
    ```
-   **Data Access:**
    -   `useProductIdeas()`: To get `productIdeasDict` for looking up the associated product idea's name.
-   **Internal State:** None.
-   **Composition:**
    -   An `antd` `Card` with a colored border/indicator corresponding to its status.
    -   Displays the `hypothesis` ("We believe that...").
    -   Displays the associated `ProductIdea` name (or nothing if `productIdeaId` is null).
    -   Displays the `startDate` and `endDate`.
-   **User Interactions:**
    -   The entire card is clickable, invoking the `onClick` prop.

### 3.7. `RealityCheckForm`

-   **Location:** `src/components/reality-checks/RealityCheckForm.tsx`
-   **Purpose:** A modal form to create or edit a Reality Check.
-   **Props:**
    ```typescript
    interface RealityCheckFormProps {
      isOpen: boolean;
      onClose: () => void;
      editingCheckId?: string;
      defaultProductIdeaId?: string;
    }
    ```
-   **Data Access:**
    -   `useRealityChecks()`: For `addRealityCheck`, `updateRealityCheck`, and `removeRealityCheck`.
    -   `useProductIdeas()`: To get `productIdeas` for populating the Product Idea dropdown.
-   **Internal State:**
    -   Uses `antd` `Form` (`useForm`) to manage the form state.
-   **Composition:**
    -   An `antd` `Modal` whose title is "New Reality Check" or "Edit Reality Check" depending on the mode.
    -   An `antd` `Form` containing:
        -   `Form.Item` with an `antd` `Select` for "Product Idea". Populated with all product ideas, plus a "Not connected to any idea" option.
        -   `Form.Item` with `Input.TextArea` for "We believe that...".
        -   `Form.Item` with `Input.TextArea` for "To verify that, we will...".
        -   `Form.Item` with `DatePicker.RangePicker` for the start and end dates.
        -   `Form.Item` with an `antd` `Segmented` control for the `status`.
    -   The modal footer contains "Cancel" and "Create"/"Update" buttons. A "Delete" button is also present in edit mode.
-   **Logic:**
    -   **Create Mode:** If `defaultProductIdeaId` is passed, it's the default value for the Select component.
    -   **Edit Mode:** If `editingCheckId` is passed, the form is populated with the data for that reality check. The "Delete" button is visible.
-   **User Interactions:**
    -   Selecting a Product Idea from the dropdown.
    -   Filling in text areas and selecting dates.
    -   Changing the status via the segmented control.
    -   Clicking "Create" or "Update" submits the form.
    -   Clicking "Delete" in edit mode shows a confirmation and then removes the check.

### 3.8. `RealityChecksSummary`

-   **Location:** `src/components/reality-checks/RealityChecksSummary.tsx`
-   **Purpose:** A compact component to visualize the status breakdown of Reality Checks for a specific Product Idea.
-   **Props:**
    ```typescript
    interface RealityChecksSummaryProps {
      productIdeaId: string;
    }
    ```
-   **Data Access:**
    -   `useRealityChecks({ productIdeaId })`: To get the `summary` object.
-   **Internal State:** None.
-   **Composition:**
    -   A container `div`.
    -   Displays the `summary.total` number in a large font.
    -   A horizontal flex container that serves as the progress bar.
    -   Inside the flex container, it renders colored `div`s for each status (`New`, `In Progress`, `Proved`, `Disproved`). The width of each `div` is proportional to its count in the `summary` object (e.g., `(summary.Proved / summary.total) * 100%`).
-   **User Interactions:** None.
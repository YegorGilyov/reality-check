# Plan: Data Access Layer Implementation

This plan outlines the steps to create a robust Data Access Layer (DAL) using Zustand, following the provided specifications and guidelines. Each task is designed to be completed sequentially.

---

### Task 1: Define Core Entity Types

**Objective:** Establish the foundational TypeScript interfaces for all entities in a central location. This ensures type safety across the entire data layer.

**Acceptance Criteria:**
- A new file `src/types/entities.ts` is created.
- The file contains and exports the `BaseEntity` interface as specified.
- The file contains and exports the `ProductIdea` interface, which extends `BaseEntity`.
- The file contains and exports the `RealityCheckStatus` type alias.
- The file contains and exports the `RealityCheck` interface, which extends `BaseEntity`.
- All interfaces and types match the definitions in `DAL.md` exactly.
- Type-only imports are used where appropriate in subsequent tasks.

---

### Task 2: Implement the `ProductIdea` Store

**Objective:** Create the Zustand store for managing `ProductIdea` entities, including state, actions, and persistence, but without the cross-store communication which will be added later.

**Acceptance Criteria:**
- A new file `src/stores/productIdeas.ts` is created.
- The store is created using `create` and wrapped with the `persist` middleware.
- The persistence key is set to `product-ideas-storage`.
- The store's state includes `productIdeas: Record<string, ProductIdea>`.
- The `addProductIdea` action is implemented:
    - It accepts a single object parameter.
    - It correctly calculates `iceScore`.
    - It generates an ID using `crypto.randomUUID()`.
    - It sets `createdAt` and `updatedAt` timestamps.
    - It returns the new product idea's `id`.
- The `updateProductIdea` action is implemented:
    - It performs an existence check and fails silently if the entity is not found.
    - It correctly recalculates `iceScore` if `impact`, `confidence`, or `ease` are updated.
    - It updates the `updatedAt` timestamp.
- The `removeProductIdea` action is implemented:
    - It performs an existence check.
    - It removes the entity from the `productIdeas` dictionary.
    - A placeholder comment is added for the future cross-store call (e.g., `// TODO: Call reality check store to disassociate`).

---

### Task 3: Implement the `RealityCheck` Store

**Objective:** Create the Zustand store for `RealityCheck` entities, including logic for validating relationships with `ProductIdea` entities.

**Acceptance Criteria:**
- A new file `src/stores/realityChecks.ts` is created.
- The store is created using `create` and wrapped with the `persist` middleware.
- The persistence key is set to `reality-checks-storage`.
- The store's state includes `realityChecks: Record<string, RealityCheck>`.
- The `useProductIdeaStore` is imported to perform relationship validation.
- The `addRealityCheck` action is implemented:
    - It validates that if a `productIdeaId` is provided, a corresponding entity exists in the `useProductIdeaStore`. The operation fails if the validation fails.
    - It generates an ID and timestamps.
    - It returns the new reality check's `id`.
- The `updateRealityCheck` action is implemented:
    - It performs an existence check for the `RealityCheck` itself.
    - It validates that if `productIdeaId` is being changed, the new `ProductIdea` exists.
    - It updates the `updatedAt` timestamp.
- The `removeRealityCheck` action is implemented with an existence check.
- The internal `_disassociateFromProductIdea` method is implemented:
    - It accepts a `productIdeaId`.
    - It iterates over all `realityChecks` and sets `productIdeaId` to `null` for all matching entries.

---

### Task 4: Establish Cross-Store Communication

**Objective:** Connect the `ProductIdea` store to the `RealityCheck` store to handle cascading updates when a `ProductIdea` is deleted.

**Acceptance Criteria:**
- The `src/stores/productIdeas.ts` file is modified.
- `useRealityCheckStore` is imported.
- The `removeProductIdea` action is updated to call `useRealityCheckStore.getState()._disassociateFromProductIdea(id)` *before* deleting the `ProductIdea` to ensure data integrity.
- The placeholder comment from Task 2 is removed.

---

### Task 5: Create the `useProductIdeas` Hook

**Objective:** Implement the primary custom hook for UI components to access and manipulate `ProductIdea` data, following the specified hook pattern.

**Acceptance Criteria:**
- A new file `src/hooks/useProductIdeas.ts` is created.
- The hook subscribes to the `productIdeas` state from `useProductIdeaStore`.
- The hook returns an object with the shape defined in `DAL.md`:
    - `productIdeas`: A memoized array of `ProductIdea` objects, sorted by `iceScore` in descending order. `useMemo` is used for this derivation.
    - `productIdeasDict`: The raw `Record<string, ProductIdea>` from the store.
    - `addProductIdea`, `updateProductIdea`, `removeProductIdea`: Functions that call the corresponding actions in the store.

---

### Task 6: Create the `useRealityChecks` Hook

**Objective:** Implement the versatile custom hook for `RealityCheck` data, supporting filtering and providing derived summary data.

**Acceptance Criteria:**
- A new file `src/hooks/useRealityChecks.ts` is created.
- The hook accepts an optional `filter` object with a `productIdeaId` property.
- The hook subscribes to the `realityChecks` state from `useRealityCheckStore`.
- All derived data is memoized using `useMemo` and re-calculates when the base data or the filter changes.
- The hook returns an object with the shape defined in `DAL.md`:
    - `realityChecks`: A memoized array of `RealityCheck` objects, filtered by `productIdeaId` (if provided) and sorted by `startDate` (ascending) then `hypothesis` (alphabetical).
    - `realityChecksDict`: A memoized dictionary, filtered by `productIdeaId` (if provided).
    - `summary`: A memoized object that correctly calculates the count for each status and the total count based on the *filtered* data.
    - `addRealityCheck`, `updateRealityCheck`, `removeRealityCheck`: Functions that call the corresponding actions in the store.

---

### Task 7: Create a DAL Test Page Component

**Objective:** Build a comprehensive React component to visually test and verify all functionalities of the implemented Data Access Layer.

**Acceptance Criteria:**
- A new file `src/pages/DalTestPage.tsx` is created.
- The component uses the `useProductIdeas` hook to display a list of all product ideas.
- For each product idea, it displays its properties (`name`, `description`, `iceScore`, etc.).
- Below each product idea, it uses the `useRealityChecks({ productIdeaId: idea.id })` hook to display a list of its associated reality checks and the `summary` object.
- The component includes a separate section that uses `useRealityChecks({})` (with no filter) to display all reality checks, including those not associated with any product idea.
- The UI contains forms and buttons to perform all DAL actions:
    - Add a new `ProductIdea`.
    - Update an existing `ProductIdea`.
    - Remove a `ProductIdea`.
    - Add a new `RealityCheck` (with and without a `productIdeaId`).
    - Update an existing `RealityCheck`.
    - Remove a `RealityCheck`.
- The UI provides clear visual feedback that all operations are working as expected (e.g., lists update automatically, the summary counts change, removing a `ProductIdea` makes its `RealityCheck`s appear in the "unassociated" list).

---

### Task 8: Integrate the Test Page into the Application

**Objective:** Make the `DalTestPage` the main page of the application so that the DAL's functionality can be easily reviewed and manually tested upon starting the application.

**Acceptance Criteria:**
- The main application component (`src/App.tsx`) is modified.
- All default placeholder content is removed.
- The `DalTestPage` component is imported and rendered as the primary view.
- Running `npm run dev` starts the application and displays the `DalTestPage` immediately.
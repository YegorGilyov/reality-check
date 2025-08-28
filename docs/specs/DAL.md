# Data Access Layer Specification

This document outlines the specification for the data access layer of the application, following the principles defined in `docs/guidelines/Zustand-guidelines.md`.

## 1. Type Definitions

Location: `src/types/entities.ts`

### 1.1. `BaseEntity`

A shared interface that all entities should extend.
```typescript
export interface BaseEntity {
  id: string;
  createdAt: string; // ISO 8601 format
  updatedAt: string; // ISO 8601 format
}
```

### 1.2. `ProductIdea`

The interface for the `ProductIdea` entity.
```typescript
export interface ProductIdea extends BaseEntity {
  name: string;
  description: string;
  impact: number;
  confidence: number;
  ease: number;
  iceScore: number;
}
```

### 1.3. `RealityCheck`

The interface for the `RealityCheck` entity.
```typescript
export type RealityCheckStatus = 'New' | 'In Progress' | 'Proved' | 'Disproved';

export interface RealityCheck extends BaseEntity {
  hypothesis: string;
  experiment: string;
  status: RealityCheckStatus;
  startDate: string; // ISO 8601 format
  endDate: string; // ISO 8601 format
  productIdeaId: string | null;
}
```

## 2. Zustand Stores

### 2.1. Store for `ProductIdea`

**Location:** `src/stores/productIdeas.ts`

The Zustand store will manage the state of all `ProductIdea` items.

**Store State (`ProductIdeaState`):**
```typescript
import type { ProductIdea } from '../types/entities';

interface ProductIdeaState {
  productIdeas: Record<string, ProductIdea>;
  addProductIdea: (data: Omit<ProductIdea, 'id' | 'createdAt' | 'updatedAt' | 'iceScore'>) => string;
  updateProductIdea: (id: string, data: Partial<Omit<ProductIdea, 'id' | 'createdAt' | 'updatedAt' | 'iceScore'>>) => void;
  removeProductIdea: (id: string) => void;
}
```

**Store Implementation (`useProductIdeaStore`):**

- The store will be created using `create<ProductIdeaState>()(...)`.
- It will use the `persist` middleware from `zustand/middleware` to save state to `localStorage`. The persistence key will be `product-ideas-storage`.
- `productIdeas` will be a dictionary (`Record<string, ProductIdea>`) for O(1) access.

**Actions:**

- **`addProductIdea`**:
    - Accepts an object containing `name`, `description`, `impact`, `confidence`, and `ease`.
    - Generates a secure `id` using `crypto.randomUUID()`.
    - Sets `createdAt` and `updatedAt` to the current ISO date string.
    - Calculates `iceScore` as `impact * confidence * ease`.
    - Adds the new `ProductIdea` object to the `productIdeas` dictionary.
    - Returns the generated `id`.
- **`updateProductIdea`**:
    - Accepts a `ProductIdea` `id` and a partial data object for the update.
    - Validates that a `ProductIdea` with the given `id` exists in the store. If not, the operation fails silently.
    - Merges the provided data with the existing `ProductIdea`.
    - If `impact`, `confidence`, or `ease` are part of the update, it recalculates the `iceScore`.
    - Updates the `updatedAt` timestamp.
    - Saves the updated `ProductIdea` back into the `productIdeas` dictionary.
- **`removeProductIdea`**:
    - Accepts a `ProductIdea` `id`.
    - Validates that a `ProductIdea` with the given `id` exists.
    - Removes the `ProductIdea` from the `productIdeas` dictionary.
    - **Relationship Handling**: It will trigger a cross-store operation to disassociate related `RealityCheck` items by calling the `_disassociateFromProductIdea` method in the `RealityCheck` store.

### 2.2. Store for `RealityCheck`

**Location:** `src/stores/realityChecks.ts`

The Zustand store will manage the state of all `RealityCheck` items.

**Store State (`RealityCheckState`):**
```typescript
import type { RealityCheck } from '../types/entities';

interface RealityCheckState {
  realityChecks: Record<string, RealityCheck>;
  addRealityCheck: (data: Omit<RealityCheck, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateRealityCheck: (id: string, data: Partial<Omit<RealityCheck, 'id' | 'createdAt' | 'updatedAt'>>) => void;
  removeRealityCheck: (id: string) => void;
  _disassociateFromProductIdea: (productIdeaId: string) => void;
}
```

**Store Implementation (`useRealityCheckStore`):**

- The store will be created using `create<RealityCheckState>()(...)`.
- It will use the `persist` middleware from `zustand/middleware` to save state to `localStorage`. The persistence key will be `reality-checks-storage`.
- `realityChecks` will be a dictionary (`Record<string, RealityCheck>`) for O(1) access.

**Actions:**

- **`addRealityCheck`**:
    - Accepts an object containing `hypothesis`, `experiment`, `status`, `startDate`, `endDate`, and `productIdeaId`.
    - **Relationship Validation**: If `productIdeaId` is provided, it must verify that the corresponding `ProductIdea` exists in the `useProductIdeaStore`. If not, the operation fails.
    - Generates a secure `id` using `crypto.randomUUID()`.
    - Sets `createdAt` and `updatedAt` to the current ISO date string.
    - Adds the new `RealityCheck` object to the `realityChecks` dictionary.
    - Returns the generated `id`.
- **`updateRealityCheck`**:
    - Accepts a `RealityCheck` `id` and a partial data object for the update.
    - Validates that a `RealityCheck` with the given `id` exists.
    - **Relationship Validation**: If `productIdeaId` is being changed, it must verify the new `ProductIdea` exists.
    - Merges the provided data with the existing `RealityCheck`.
    - Updates the `updatedAt` timestamp.
    - Saves the updated `RealityCheck` back into the `realityChecks` dictionary.
- **`removeRealityCheck`**:
    - Accepts a `RealityCheck` `id`.
    - Validates that a `RealityCheck` with the given `id` exists.
    - Removes the `RealityCheck` from the `realityChecks` dictionary.
- **`_disassociateFromProductIdea`**:
    - An internal method for cross-store operations.
    - Accepts a `productIdeaId`.
    - Iterates through all `realityChecks` and sets `productIdeaId` to `null` for any `RealityCheck` where `productIdeaId` matches the one provided. This is called by `removeProductIdea` to handle cascading updates.

## 3. Custom Hooks

### 3.1. `useProductIdeas`

**Location:** `src/hooks/useProductIdeas.ts`

The hook will be the primary interface for UI components to interact with `ProductIdea` data.

**Hook Return Value:**
```typescript
import type { ProductIdea } from '../types/entities';

interface UseProductIdeasReturn {
  productIdeas: ProductIdea[];
  productIdeasDict: Record<string, ProductIdea>;
  addProductIdea: (data: Omit<ProductIdea, 'id' | 'createdAt' | 'updatedAt' | 'iceScore'>) => string;
  updateProductIdea: (id: string, data: Partial<Omit<ProductIdea, 'id' | 'createdAt' | 'updatedAt' | 'iceScore'>>) => void;
  removeProductIdea: (id: string) => void;
}
```

**Hook Implementation:**
- Subscribes to the `productIdeas` dictionary from `useProductIdeaStore`.
- **`productIdeas`**: A memoized array of all `ProductIdea` objects. The array is sorted by `iceScore` in descending order.
- **`productIdeasDict`**: The raw, unsorted dictionary of all `ProductIdea` objects, for direct O(1) lookup.
- **`addProductIdea`, `updateProductIdea`, `removeProductIdea`**: Functions that directly call the corresponding actions in the `useProductIdeaStore`.

### 3.2. `useRealityChecks`

**Location:** `src/hooks/useRealityChecks.ts`

The hook will be the primary interface for UI components to interact with `RealityCheck` data, with support for filtering.

**Hook Parameters:**
```typescript
interface RealityCheckFilter {
  productIdeaId?: string;
}
```

**Hook Return Value:**
```typescript
import type { RealityCheck, RealityCheckStatus } from '../types/entities';

type RealityCheckSummary = Record<RealityCheckStatus, number> & { total: number };

interface UseRealityChecksReturn {
  realityChecks: RealityCheck[];
  realityChecksDict: Record<string, RealityCheck>;
  summary: RealityCheckSummary;
  addRealityCheck: (data: Omit<RealityCheck, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateRealityCheck: (id: string, data: Partial<Omit<RealityCheck, 'id' | 'createdAt' | 'updatedAt'>>) => void;
  removeRealityCheck: (id: string) => void;
}
```

**Hook Implementation:**
- Subscribes to the `realityChecks` dictionary from `useRealityCheckStore`.
- Accepts an optional `filter` object. If `filter.productIdeaId` is provided, the hook will only operate on `RealityCheck`s associated with that `ProductIdea`. Otherwise, it operates on all `RealityCheck`s.
- All derived data (`realityChecks`, `realityChecksDict`, `summary`) is memoized using `useMemo` to re-calculate only when the store data or filter changes.
- **`realityChecks`**: A memoized and filtered array of `RealityCheck` objects. The array is sorted first by `startDate` (ascending) and then by `hypothesis` (alphabetically).
- **`realityChecksDict`**: A memoized and filtered dictionary of `RealityCheck` objects for O(1) lookup.
- **`summary`**: A memoized helper object that provides a count of filtered `RealityCheck`s for each status (`New`, `In Progress`, `Proved`, `Disproved`) and a `total` count. This is used for the summary component on `ProductIdea` cards.
- **`addRealityCheck`, `updateRealityCheck`, `removeRealityCheck`**: Functions that directly call the corresponding actions in the `useRealityCheckStore`.
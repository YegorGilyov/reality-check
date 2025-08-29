# Reality Check: Product Idea Management

This project is a web application designed to help product managers and teams manage and prioritize product ideas. It provides a simple, intuitive interface for tracking ideas, evaluating them based on the ICE (Impact, Confidence, Ease) scoring model, and managing their validation through "Reality Checks."

The application is built as a single-page application (SPA) and features a two-part dashboard for viewing product ideas and a Kanban board for tracking the status of reality checks.

## Features

-   **Product Idea Management**: Create, edit, and delete product ideas.
-   **ICE Scoring**: Evaluate ideas based on Impact, Confidence, and Ease. The ICE score is calculated and updated in real-time.
-   **Prioritized List View**: Product ideas are automatically sorted by their ICE score, allowing for easy prioritization.
-   **Reality Check Kanban**: Track the validation process of your ideas on a drag-and-drop Kanban board with four statuses: New, In Progress, Proved, and Disproved.
-   **Detailed Idea Overview**: Drill down into a specific product idea to see its details and its associated reality checks.
-   **Persistent State**: The application state is saved to `localStorage`, so your data persists across browser sessions.

## Tech Stack

-   **Framework**: React
-   **Language**: TypeScript
-   **Build Tool**: Vite
-   **UI Library**: Ant Design
-   **State Management**: Zustand
-   **Drag & Drop**: React DnD

## Getting Started

### Prerequisites

-   Node.js (v18 or later recommended)
-   npm

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd reality-check
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Application

To start the development server, run the following command:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).
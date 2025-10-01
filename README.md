# Intent Prototyping: The "Reality Check" Case Study

This repository contains the source code for the "Reality Check" application, a simple tool for managing and prioritizing product ideas. However, its primary purpose is to serve as a practical, hands-on case study for the **Intent Prototyping** method.

The entire application was built following this method, using an AI coding agent guided by a clear, documented design *intent*. You can find all the design documents (sketches, conceptual models, specifications, and plans) that were used to generate this prototype in the `/docs` directory.

## About Intent Prototyping

Intent Prototyping is a method for AI-assisted prototyping that bridges the gap between a design idea and a live, interactive prototype. It rejects the ambiguity of "vibe coding" and the limitations of static mockups by centering the development process on a clear, explicit, and holistic expression of the designer's **intent**.

This *intent* is captured in a set of documents that typically includes:
1.  **Conceptual Model**: Defines the objects, attributes, and relationships within the system.
2.  **Visualization**: Low-fidelity sketches of the user interface.
3.  **Flow**: Descriptions of user journeys and interactions.

By providing this complete blueprint to an AI coding agent, we can rapidly generate a robust, functional prototype that is built on a solid foundation. This approach is particularly effective for complex, data-heavy applications where structural integrity is the biggest risk.

The key benefits are:
-   **Learn Faster**: Go from an idea to a testable, interactive prototype in days, not weeks.
-   **Gain Confidence**: Validate the core logic and user flows with real interactions, not just clicks on static pictures.
-   **Enforce Clarity**: A live prototype cannot hide a flawed or ambiguous conceptual model.
-   **Improve Handoff**: The documented intent serves as a clear and durable source of truth for the engineering team.

## Learn More

This project was created to support a two-part article series on Intent Prototyping, which is scheduled for publication in *Smashing Magazine*.

-   **Read Part 1**: [Intent Prototyping: The Allure and Danger of Pure Vibe Coding in Enterprise UX](https://yegorgilyov.name/intent-prototyping-01/)
-   **Read Part 2**: Intent Prototyping: A Practical Guide to Building with Clarity *(coming soon)*

For more materials, updates, and discussions on the method, please visit the central hub on my personal website:
-   **[yegorgilyov.name/intent-prototyping](https://yegorgilyov.name/intent-prototyping/)**

---

## About the "Reality Check" Application

The application itself is a web app designed to help product managers and teams manage and prioritize product ideas. It provides a simple, intuitive interface for tracking ideas, evaluating them based on the ICE (Impact, Confidence, Ease) scoring model, and managing their validation through "Reality Checks."

### Features

-   **Product Idea Management**: Create, edit, and delete product ideas.
-   **ICE Scoring**: Evaluate ideas based on Impact, Confidence, and Ease. The ICE score is calculated and updated in real-time.
-   **Prioritized List View**: Product ideas are automatically sorted by their ICE score, allowing for easy prioritization.
-   **Reality Check Kanban**: Track the validation process of your ideas on a drag-and-drop Kanban board with four statuses: New, In Progress, Proved, and Disproved.
-   **Detailed Idea Overview**: Drill down into a specific product idea to see its details and its associated reality checks.
-   **Persistent State**: The application state is saved to `localStorage`, so your data persists across browser sessions.

### Tech Stack

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
    git clone https://github.com/YegorGilyov/reality-check.git
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

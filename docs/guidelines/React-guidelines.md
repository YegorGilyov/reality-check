# Guidelines: React Best Practices

## Component Structure

- Use functional components over class components
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use composition over inheritance
- Implement proper prop types with TypeScript
- Structure React files: exported component, subcomponents, helpers, static content, types
- Use declarative TSX for React components
- Ensure that UI components use custom hooks for data fetching and operations rather than receive data via props, except for simplest components

## React Patterns

- Utilize useState and useEffect hooks for state and side effects
- Use React.memo for performance optimization when needed
- Utilize React.lazy and Suspense for code-splitting
- Implement error boundaries for robust error handling
- Keep styles close to components

## React Performance

- Avoid unnecessary re-renders
- Lazy load components and images when possible
- Implement efficient state management
- Optimize rendering strategies
- Optimize network requests
- Employ memoization techniques (e.g., React.memo, useMemo, useCallback)

## React Project Structure

```

/src
- /components - UI components (every component in a separate file)
- /hooks - public-facing custom hooks (every hook in a separate file)
- /providers - React context providers (every provider in a separate file)
- /pages - page components (every page in a separate file)
- /stores - entity-specific Zustand stores (every store in a separate file)
- /styles - global styles (if needed)
- /types - shared TypeScript types and interfaces

```


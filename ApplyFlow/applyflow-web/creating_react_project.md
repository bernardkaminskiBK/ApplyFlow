# React + TypeScript Junior Notes

## Vite + React + TypeScript Project Creation

Create a new React + TypeScript project:

```bash
npm create vite@latest my-app -- --template react-ts
```

Install dependencies:

```bash
cd my-app
npm install
```

Run the application:

```bash
npm run dev
```

Install Material UI:

```bash
npm install @mui/material
npm install @emotion/react @emotion/styled
```

Install React Router:

```bash
npm install react-router-dom
```

---

# Core React Concepts

## Component

A component is a reusable UI building block.

```tsx
export default function DashboardPage() {
  return <div>Hello</div>;
}
```

---

## Props

Props allow a parent component to pass data to a child component.

```tsx
type DashboardCardProps = {
  title: string;
  value: number;
};

export default function DashboardCard({ title, value }: DashboardCardProps) {
  return <div>{title}</div>;
}
```

---

## State

State stores component data and triggers re-rendering.

```tsx
const [loading, setLoading] = useState(false);
```

---

## Controlled Input

```tsx
const [name, setName] = useState("");

<input value={name} onChange={(e) => setName(e.target.value)} />;
```

---

## Event Handling

```tsx
<button onClick={handleSave}>Save</button>
```

With parameters:

```tsx
<button onClick={() => handleDelete(id)}>Delete</button>
```

---

## List Rendering

```tsx
items.map((item) => <ItemCard key={item.id} item={item} />);
```

Always provide a unique key.

---

# API Calls

## Async / Await

```tsx
try {
  const companies = await getCompanies();
} catch (error) {
  console.error(error);
} finally {
}
```

---

## Promise.all

Execute multiple requests in parallel.

```tsx
const [companies, applications] = await Promise.all([
  getCompanies(),
  getApplications(),
]);
```

---

# Loading State

Create a reusable loading component.

```tsx
if (loading) {
  return <LoadingSpinner />;
}
```

---

# Error Handling

Use a reusable Material UI Snackbar component.

```tsx
<ErrorSnackbar open={Boolean(error)} message={error} onClose={clearError} />
```

---

# Custom Hooks

## Why Use Custom Hooks?

Without custom hooks:

```text
DashboardPage
├── UI
├── State
├── Loading
├── Error
├── API calls
├── Promise.all
└── useEffect
```

With custom hooks:

```text
DashboardPage
└── UI

useDashboard
├── State
├── Loading
├── Error
├── API calls
├── Promise.all
└── useEffect
```

The page becomes easier to read and maintain.

---

## Naming Convention

Custom hooks should always start with:

```text
use
```

Examples:

```text
useDashboard
useCompanies
useApplications
useAuth
useUser
```

Recommended file naming:

```text
useDashboard.ts
```

---

## Example

```tsx
const { stats, loading, error, clearError } = useDashboard();
```

This is conceptually similar to:

```java
DashboardService dashboardService =
    new DashboardService();

dashboardService.getStats();
dashboardService.clearError();
```

The implementation differs, but the separation of responsibilities is similar.

---

# Dashboard Refactoring Example

Instead of:

```tsx
<DashboardCard ... />
<DashboardCard ... />
<DashboardCard ... />
<DashboardCard ... />
```

Use data-driven rendering:

```tsx
const dashboardCards = [
  { title: "Companies", value: stats.companyCount },
  { title: "Job Applications", value: stats.applicationCount },
  { title: "Application Events", value: stats.eventCount },
  { title: "Contact Persons", value: stats.contactCount },
];
```

Render:

```tsx
{
  dashboardCards.map((card) => (
    <DashboardCard key={card.title} title={card.title} value={card.value} />
  ));
}
```

This follows the React philosophy:

```text
Data
↓
UI
```

---

# Junior React Topics Checklist

Essential:

- Components
- Props
- useState
- useEffect
- Event Handling
- Controlled Inputs
- List Rendering
- TypeScript Types
- API Calls
- Promise.all
- Loading States
- Error Handling
- Routing
- Custom Hooks

Later:

- Context API
- useMemo
- useCallback
- TanStack Query
- Redux
- Zustand
- Suspense
- Server Components

---

# Key Lesson

The goal is not simply to make the application work.

The goal is:

```text
Working
↓
Readable
↓
Maintainable
↓
Reusable
```

Small components, reusable UI elements, API separation, and custom hooks help achieve this.

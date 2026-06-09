# ApplyFlow Frontend

ApplyFlow is a small job application tracking system built as a learning and demonstration project.

The purpose of this project is to demonstrate practical understanding of a typical .NET and React full-stack workflow, including REST API integration, CRUD operations, routing, validation and reusable component design.

## Technologies

- React
- TypeScript
- Material UI
- Axios
- React Router
- Vite

## Features

### Dashboard

- Overview statistics
- Project information
- Links to source code repositories

### Companies

- List companies
- Create company
- Edit company
- Delete company
- View company details
- Search companies

### Job Applications

- List job applications
- Create application
- Edit application
- Delete application
- View application details
- Search applications
- Status, source and work mode support

### Application Events

- List events
- Create events
- Edit events
- Delete events
- View event details
- Search events

### Contact Persons

- List contacts
- Create contacts
- Edit contacts
- Delete contacts
- View contact details
- Search contacts

## Design Decisions

The project intentionally focuses on clarity and maintainability rather than advanced enterprise features.

For demonstration purposes:

- Client-side filtering is used
- Material UI components are used for rapid development
- Simple component composition is preferred
- Reusable components are extracted where appropriate

Examples:

- PageHeader
- SearchField
- ConfirmDeleteDialog

In a production environment, filtering, sorting and pagination would typically be implemented on the backend.

## Learning Goals

This project was created to practice and demonstrate:

- React fundamentals
- TypeScript usage
- State management with React hooks
- REST API communication
- Component composition
- Reusable UI patterns
- Full-stack application development with ASP.NET Core and React
  <br>
  <br>
  <br>
  <br>

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

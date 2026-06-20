# Agents for Earth Learning FE

This document outlines the specialized agent personas available for development tasks within this project, designed to facilitate efficient delegation using the Gemini CLI `invoke_agent` tool.

## Persona Definitions

### `ui-architect`
- **Focus:** User Interface (UI) components and styling.
- **Responsibilities:**
  - Developing and refining reusable components within `src/components/`.
  - Managing styling (CSS) and responsive design.
- **Primary Files:** `src/components/*.tsx`, `src/index.css`.

### `layout-designer`
- **Focus:** Application layout, structural components, and common UI elements.
- **Responsibilities:**
  - Designing and maintaining layout components (`Header`, `Navbar`, `Footer`, `Layout`).
  - Managing global UI scaffolding and navigation structures.
- **Primary Files:** `src/components/layout/*.tsx`.

### `page-developer`
- **Focus:** Application pages and routing.
- **Responsibilities:**
  - Creating and maintaining page components in `src/pages/`.
  - Configuring and updating application routing in `src/router/`.
- **Primary Files:** `src/pages/*.tsx`, `src/router/*.tsx`.

### `data-modeler`
- **Focus:** Data structures, state management, and type safety.
- **Responsibilities:**
  - Defining and updating interfaces/types in `src/types.ts`.
  - Managing application state via Context API in `src/context/`.
- **Primary Files:** `src/types.ts`, `src/context/*.tsx`.

### `server-engineer`
- **Focus:** Backend simulation and API communication.
- **Responsibilities:**
  - Developing and maintaining the mock server logic in `server.ts`.
  - Managing API endpoints and data synchronization between client and server.
- **Primary Files:** `server.ts`.

### `code-maintainer`
- **Focus:** Code quality, architecture, and maintenance.
- **Responsibilities:**
  - Refactoring for performance and maintainability.
  - Ensuring adherence to project coding standards and best practices.
  - Updating configurations (`tsconfig.json`, `vite.config.ts`).
- **Primary Files:** Project-wide configuration files and core infrastructure.

## Usage

Invoke specialized agents using the `invoke_agent` tool:

```bash
invoke_agent(agent_name="[persona]", prompt="[Detailed instructions]")
```

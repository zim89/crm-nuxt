# CRM Nuxt

## Description

CRM Nuxt is a modern web application built with Vue 3 and Nuxt 3. It provides a powerful interface for managing customers and deals, leveraging cutting-edge technologies and tools.

One of the key features of this application is a **Kanban board** for managing orders. The Kanban board allows users to view orders and drag-and-drop them between columns to update their statuses seamlessly.

---

## Tech Stack

- **Vue 3**: The core framework for building the user interface.
- **Nuxt 3**: A framework for server-side rendering and static site generation.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **ShadCN/UI**: A component library for building UI elements.
- **Pinia**: A modern state management library for Vue.
- **TanStack Query**: A tool for managing server-side data state.
- **VeeValidate**: A library for form validation.
- **Appwrite**: A backend-as-a-service for database, authentication, and storage management.

---

## Live Demo

You can view the live version of the project here:  
[CRM Nuxt Live Demo](https://crm-system-nuxt-kappa.vercel.app/)

---

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/crm-nuxt.git
cd crm-nuxt
```

### 2. Cleanup and Start Development Server

```bash
bunx nuxi cleanup && bun dev
```

---

## Running the Project

### Development Mode

To run the project in development mode with hot-reloading:

```bash
bun dev
```

### Production Mode

To build and run the project in production mode:

1. Build the project:

   ```bash
   bun build
   ```

2. Start the production server:

   ```bash
   bun start
   ```

---

## Features

- **Kanban Board**: View and manage orders with a drag-and-drop interface for updating statuses.
- **State Management**: Pinia is used for managing application state.
- **Form Validation**: VeeValidate makes form validation easy and efficient.
- **Backend**: Appwrite handles database, authentication, and file uploads.
- **UI Design**: Tailwind CSS and ShadCN/UI provide a modern and responsive design.

---

## License

This project is licensed under the [MIT License](LICENSE).

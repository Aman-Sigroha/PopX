# PopX Frontend

A modern React + Vite application for user registration, login, and account management, integrated with a Node.js/Express/PostgreSQL backend.

## Features
- User registration with validation (name, phone, email, password, company, agency status)
- User login with email and password
- Account settings page displaying user info and profile picture
- Profile picture upload and retrieval
- React Router for navigation
- API integration with backend (`https://popx-server.onrender.com`)
- Responsive and modern UI

## Project Structure
```
PopX/
  ├── public/                # Static assets
  ├── src/
  │   ├── components/        # React components (Register, Signin, Welcome, AccountSettings)
  │   ├── utils/api.js       # API endpoints
  │   ├── App.jsx            # Main app with routes
  │   └── ...
  ├── package.json           # Project metadata and scripts
  ├── vite.config.js         # Vite configuration
  ├── netlify.toml           # Netlify deployment config
  └── README.md              # This file
```

## Getting Started

### Prerequisites
- Node.js v18 or higher
- npm

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```
2. (Optional) Create a `.env` file in the root of `PopX/` to override the backend URL:
   ```env
   VITE_API_URL=https://popx-server.onrender.com
   ```

### Running the App
- Start the development server:
  ```bash
  npm run dev
  ```
- The app will be available at `http://localhost:5173` (or as shown in your terminal).

### Build for Production
- To build the app:
  ```bash
  npm run build
  ```
- To preview the production build:
  ```bash
  npm run preview
  ```

## API Integration
- The frontend communicates with the backend at `https://popx-server.onrender.com`.
- Endpoints used:
  - `POST /register` — Register a new user
  - `POST /login` — Login with email and password
  - `GET /profile-picture/:userId` — Get user profile picture
  - `POST /upload-profile-picture` — Upload profile picture

## Deployment
- The app is configured for Netlify deployment (see `netlify.toml`).
- Build command: `npm run build`
- Publish directory: `dist`

## Scripts
- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run lint` — Lint the codebase

## Tech Stack
- React 19
- Vite
- React Router v7
- PostgreSQL (backend)
- Node.js/Express (backend)

## Notes
- User info is stored in `localStorage` after login for use in the Account Settings page.
- Make sure the backend server is running and accessible at the configured URL.

---

For backend setup and API details, see the `PopX-Server/README.md`.

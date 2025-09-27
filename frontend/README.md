# Frontend - E-Commerce React App

This is the frontend for the E-Commerce project, built with React and Vite. It provides a modern shopping experience with cart management, checkout, and payment integration.

## Features
- Product listing with add-to-cart functionality
- Cart management (increase/decrease quantity, remove items)
- Checkout form with validation (name, email, card details, expiry, CVV)
- Payment flow integrated with backend
- Payment success/failure UI
- Responsive and modern UI using Google Fonts (Poppins)

## Packages Used
- **react**: UI library for building components
- **react-router-dom**: Routing for navigation between pages
- **axios**: HTTP client for API requests
- **vite**: Fast development server and build tool

## Getting Started
1. Install dependencies:
	```bash
	npm install
	```
2. Start the development server:
	```bash
	npm run dev
	```
3. The app will be available at `http://localhost:5173` (or as shown in your terminal).

## Project Structure
- `src/components/`: All React components (Cart, Home, Nav, etc.)
- `src/App.jsx`: Main app and routing
- `public/`: Static assets

## Notes
- Make sure the backend server is running for payment and order APIs.
- Update API URLs in the code if your backend runs on a different port.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

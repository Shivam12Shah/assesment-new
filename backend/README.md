# Backend - E-Commerce Node.js API

This is the backend for the E-Commerce project, built with Node.js, Express, MongoDB, and Stripe. It handles product orders, payment processing, and order status.

## Features
- Payment intent creation with Stripe
- Webhook for payment status updates
- Order details storage in MongoDB
- API to check order/payment status
- Secure environment variable usage

## Packages Used
- **express**: Web server framework
- **mongoose**: MongoDB object modeling
- **stripe**: Stripe payment integration
- **dotenv**: Loads environment variables from `.env`
- **cors**: Enables CORS for frontend-backend communication
- **body-parser**: Parses incoming request bodies
- **nodemon** (dev): Auto-restarts server on changes

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file with your Stripe secret key and MongoDB URI:
   ```env
   STRIPE_SECRET_KEY=your_stripe_secret_key
   MONGODB_URI=your_mongodb_uri
   ```
3. Start the server:
   ```bash
   npm run dev
   # or
   node app.js
   ```
4. The API will be available at `http://localhost:3000` (or as configured).

## Project Structure
- `controller/`: Payment and order controllers
- `schemas/`: Mongoose schemas
- `db/`: Database connection
- `app.js`: Main Express app

## Notes
- Make sure to set up Stripe and MongoDB credentials in `.env`.
- The frontend must point to the correct backend API URL.


env

// STRIPE_PUBIC_KEY = 'sk_test_51SBrjGCfdANa4TRklxUc8nUPHn86c12pBi0sbsXO4hO9hgoVT1GIFjfqpyhRXxbolT6tXbdGke2MPFVZa52Vexvc00uZGsxJJV'
// STRIPE_WEBHOOK_SECRET = 'whsec_daedec4ffebfecf60054eae3b800305c15f3b39b1cbd157bcbb04023453a4b1e'
// PORT = 3000
# Book My Show

Book My Show is a web application for booking movie tickets. It consists of a client-side application built with React and a server-side application built with Node.js and Express.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and login
- Password reset functionality
- Browse and book movie tickets
- Admin panel for managing movies and shows
- Email notifications for booking confirmations

## Technologies

### Client

- React
- Redux
- React Router
- Axios
- Ant Design
- Vite

### Server

- Node.js
- Express
- MongoDB
- Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Nodemailer for email notifications
- Stripe for payment processing

## Installation

### Prerequisites

- Node.js
- MongoDB

### Clone the repository

- https://github.com/TanKoth/Book_My_Show.git
- cd Book_My_Show

### Client
- cd client
- npm install

### Server
- cd server
- npm install

### Running the Client
- cd client
- npm run dev

### Running the Server
- cd server
- node server.js || nodemon server.js

### Building the Client to the Production
- cd client
- npm run build

### API Endpoints
- User
- POST /api/users/register - Register a new user
- POST /api/users/login - Login a user
- POST /api/users/forgetPassword - Send OTP for password reset
- PATCH /api/users/resetPassword - Reset password
### Movies
- GET /api/movies - Get all movies
- POST /api/movies - Add a new movie (Admin only)
### Shows
- GET /api/shows - Get all shows
- POST /api/shows - Add a new show (Admin only)
### Bookings
- POST /api/bookings/makePayment - Make a payment for booking
- POST /api/bookings/getAllBookings - Get all bookings for a user
### Environment Variables
- Create a .env file in the root of the server directory and add the following environment variables:
- PORT=8081
- MONGO_URI=your_mongodb_uri
- JWT_SECRET=your_jwt_secret
- SENDGRID_API_KEY=your_sendgrid_api_key
- STRIPE_SECRET_KEY=your_stripe_secret_key

### Contributing
- Contributions are welcome! Please open an issue or submit a pull request for any changes.

### License
- This project is licensed under the MIT License.

- This `README.md` file provides a comprehensive overview of your project, including features, technologies, installation instructions, usage, API endpoints, environment variables, and more. Adjust the content as needed to fit your specific project details.

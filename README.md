
AUTOGEAR : An Automobile Accessory Website
📌 Introduction
This project is a backend system for an Automobile Parts & Accessories E-Commerce platform built using the MERN stack (MongoDB, Express.js, React, Node.js). It provides robust APIs to manage products, users, orders, authentication, and payments.

The backend is designed to support scalable, secure, and efficient operations for an online marketplace specializing in automobile components and accessories.

📚 Table of Contents
Introduction

Features

Tech Stack

Installation

Configuration

Usage

API Endpoints

Dependencies

Examples

Troubleshooting

Contributors

License

✨ Features
🔐 User Authentication & Authorization (JWT-based)

🛒 Product Catalog Management

📦 Order Processing System

💳 Payment Integration (optional)

🔍 Search & Filter Functionality

🧾 Order History Tracking

📊 Admin Dashboard APIs

📁 RESTful API Architecture

🛠 Tech Stack
Backend: Node.js, Express.js

Database: MongoDB (Mongoose ODM)

Authentication: JSON Web Tokens (JWT)

Environment Management: dotenv

API Testing: Postman / Thunder Client

⚙️ Installation
Clone the repository:

git clone https://github.com/your-username/auto-parts-backend.git
Navigate to the project directory:

cd auto-parts-backend
Install dependencies:

npm install
Start the development server:

npm run dev
🔧 Configuration
Create a .env file in the root directory and add the following:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PAYMENT_API_KEY=your_payment_gateway_key
🚀 Usage
Use tools like Postman to test API endpoints.

Base URL:

http://localhost:5000/api
Example endpoints:

POST /api/users/register → Register user

POST /api/users/login → Login user

GET /api/products → Fetch all products

POST /api/orders → Create order

📡 API Endpoints
👤 User Routes
POST /api/users/register

POST /api/users/login

GET /api/users/profile

🛍 Product Routes
GET /api/products

GET /api/products/:id

POST /api/products (Admin)

PUT /api/products/:id (Admin)

DELETE /api/products/:id (Admin)

📦 Order Routes
POST /api/orders

GET /api/orders/:id

GET /api/orders/user

📦 Dependencies
express

mongoose

jsonwebtoken

bcryptjs

dotenv

cors

nodemon (dev dependency)

🧪 Examples
Sample Product Object
{
  "name": "Brake Pads",
  "price": 1200,
  "description": "High-quality brake pads for durability",
  "category": "Brakes",
  "countInStock": 50
}
Sample User Registration
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
🛠 Troubleshooting
❌ MongoDB connection failed

Check your MONGO_URI

Ensure MongoDB service is running

❌ JWT errors

Verify JWT_SECRET is set correctly

❌ Port already in use

Change PORT in .env

👥 Contributors
Vishawa R 

Ram Sankar

Rahul Karthik

AV Shayan

📄 License
This project is licensed under the MIT License.
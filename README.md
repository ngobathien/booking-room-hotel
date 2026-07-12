# 🏨 Hotel Booking System

A hotel booking system that provides room searching, reservation management, online payment, and AI-powered customer assistance.

## 🌐 Demo

**Live Demo:**
https://booking-room-hotel-murex.vercel.app/

**GitHub:**
https://github.com/ngobathien/booking-room-hotel

---

# 📌 Overview

Hotel Booking System is a web application that allows users to search for available rooms, create reservations, manage bookings, and complete online payments.

The backend is built with **NestJS and MongoDB**, providing REST APIs with secure authentication, role-based authorization, payment integration, AI chatbot assistance, and cloud file storage.

---

# ✨ Features

## 👤 User Features

- Register and login
- JWT-based authentication
- Google OAuth authentication
- Search available rooms
- View room details
- Create room reservations
- Check booking status
- Online payment through VNPay
- Receive AI assistance through Gemini chatbot

## 🛠️ Admin Features

- Manage users
- Manage rooms
- Upload and manage room images
- Manage bookings
- Update booking status

---

# 🚀 Tech Stack

## Backend

- TypeScript
- NestJS
- Node.js
- MongoDB
- Mongoose
- JWT Authentication
- REST APIs

## Frontend

- React.js
- Tailwind CSS

## Third-party Services

- VNPay Payment Gateway
- Google Gemini API
- Supabase Storage
- Google OAuth

## Development Tools

- Postman
- Git/GitHub

---

# 🔐 Authentication & Authorization

The system implements secure authentication using JWT:

- User login generates access tokens.
- Protected APIs require JWT authentication.
- Role-based authorization controls access permissions between users and administrators.
- Google OAuth is integrated for third-party authentication.

---

# 🏨 Booking Workflow

The booking process includes:

1. User searches available rooms.
2. System checks room availability.
3. User creates a reservation.
4. User completes payment through VNPay.
5. Booking status is updated after payment verification.

---

# 💳 VNPay Payment Integration

Integrated VNPay payment gateway for online transactions:

- Create payment requests.
- Redirect users to VNPay payment page.
- Handle VNPay callback responses.
- Update payment and booking status.

---

# 🤖 AI Chatbot Integration

Integrated Google Gemini API to provide AI-powered customer support:

- Recommend suitable rooms based on user requirements.
- Answer questions about rooms and booking.
- Assist users during the reservation process.

---

# 📦 Installation

## Clone Repository

```bash
git clone https://github.com/ngobathien/booking-room-hotel.git

cd booking-room-hotel
```

---

# ⚙️ Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
# Application
PORT=3000
API_URL=/api/v1

BASE_URL=http://localhost:3000
URL_CLIENT=http://localhost:5173


# Database
MONGODB_URI=mongodb://localhost:27017/booking-hotel


# Authentication
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=your_token_expiration_time


# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key


# Email Service
EMAIL_USER=your_email
EMAIL_PASS=your_email_password


# Supabase Storage
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key

SUPABASE_BUCKET_ROOMS=rooms
SUPABASE_BUCKET_AVATARS=avatars


# VNPay
VNP_TMN_CODE=your_terminal_code
VNP_HASH_SECRET=your_hash_secret
VNP_URL=your_vnpay_payment_url

VNP_RETURN_URL=http://localhost:3000/api/v1/payments/vnpay-return


# Google OAuth
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret

GOOGLE_CALLBACK_URL=http://localhost:3000/api/v1/auth/google/callback


# Payment Expiration

USE_EXPIRE_SECONDS=true
PAYMENT_EXPIRE_SECONDS=30
```

Run backend:

```bash
npm run start:dev
```

---

# 💻 Frontend Setup

Navigate to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
# Development

VITE_API_URL=http://localhost:3000/api/v1

VITE_GOOGLE_LOGIN_URL=http://localhost:3000/api/v1/auth/google


# Production
```

Run frontend:

```bash
npm run dev
```

---

# 📚 API Modules

The backend provides REST APIs for:

## Authentication

- Register
- Login
- JWT authentication
- Google OAuth login

## Users

- User management
- Profile management

## Rooms

- Create rooms
- Update rooms
- Delete rooms
- Search rooms
- Upload room images

## Booking

- Create reservations
- Check availability
- Update booking status

## Payment

- VNPay payment processing
- Payment callback handling

## AI Chatbot

- Room recommendation
- Customer assistance

---

# 🧪 API Testing

API testing was performed using:

- Postman

# 💸 Payment App Backend API

This is a backend service for a simple Payment App built using **Node.js** and **Express.js**.  
It provides APIs for **user authentication**, **account balance check**, and **money transfers**.

Hosted on [Render](https://render.com):  
🔗 **Base URL:** `https://payment-app-backend-hmwg.onrender.com/api/v1/`

---

## 📦 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** with Mongoose
- **JWT Authentication**
- **Zod** for input validation
- **CORS** for cross-origin access
<br>
---
## 🔐 Authentication

All secure routes require a **Bearer Token** in the `Authorization` header.

Authorization: Bearer <your_jwt_token>

## Sample API Test URLs
POST /user/signup → /api/v1/user/signup<br>
POST /user/signin → /api/v1/user/signin<br>
PUT /user/update → /api/v1/user/update<br>
GET /user/bulk?filter=pras → /api/v1/user/bulk?pras<br>
GET /account/balance → /api/v1/account/balance<br>
POST /account/transfer → /api/v1/account/transfer<br>

## Setup Locally (Optional)
git clone https://github.com/your-repo.git<br>
cd backend<br>
npm install<br>
touch .env<br>



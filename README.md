#  Roxlier Store Rating System 

A complete full-stack web application where:

- Users can register & login
- Users can rate any store (one rating per store)
- Store owners can view:
  - Their store dashboard
  - Average rating
  - Total ratings
  - List of users who rated their store
- Admin can:
  - View all users
  - View all stores
  - Manage store list

---
## LIVE DEMO : 
 m
  - A full-stack Store Rating System built with React + Node.js + Express + MySQL, featuring role-based access for users, owners, and admins.
    Includes store ratings, owner analytics dashboard, admin management panel, and secure JWT authentication.
  
  - https://roxiler-frontend-elag.onrender.co

  - ### **Admin  Login Credentials for Live demo**
```
email: admin@gmail.com
password: 123
```

### **Store Owner Login Credentials for Live demo**
```
email: owner1@gmail.com
password: 123
```
### **Normal User Login Credentials for Live demo**
```
email: user1@gmail.com
password: 1234
```
---

## Tech Stack

### **Frontend**
- React JS
- Axios
- React Router
- CSS

### **Backend**
- Node.js
- Express.js
- MySQL (sequelize ORM)
- JWT Authentication
- bcryptjs Password Hashing
- dotenv for environment variables

---

## 📁 Project Folder Structure

```
/project-root
│── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── config/db.js
│   │   └── server.js
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── src/
    ├── public/
    ├── package.json
    └── .env.example
```

---

# 🗄️ Database Schema (MySQL)

Create database first:

```sql
CREATE DATABASE roxiler_db;
USE roxiler_db;
```

### ➤ **Users Table**
```sql
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','owner','admin') DEFAULT 'user',
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

```

### ➤ **Stores Table**
```sql
CREATE TABLE `stores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `ownerId` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `ownerId` (`ownerId`),
  CONSTRAINT `stores_ibfk_1` FOREIGN KEY (`ownerId`) 
    REFERENCES `Users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


```

### ➤ **Ratings Table**
```sql
CREATE TABLE `ratings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ratingValue` int(11) NOT NULL CHECK (`ratingValue` BETWEEN 1 AND 5),
  `userId` int(11) NOT NULL,
  `storeId` int(11) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `storeId` (`storeId`),
  CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`userId`) 
      REFERENCES `Users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`storeId`) 
      REFERENCES `stores` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

```

### ➤ **INSERT ONLY ADMIN USER**
```sql
INSERT INTO users (name, email, address, password, role)
VALUES (
  'Admin',
  'admin@gmail.com',
  'Nashik',
  '$2b$10$5ttVIjnR2uwr3l8Oo0GUmuFI0BVxzC9wa9R6c.mrZ898LEXYGVLFK',  -- password = 123
  'admin'
);
```
---

#  Running This Project (Frontend + Backend)

## 1️⃣ Clone the Repository

```
git clone https://github.com/gauravshevkar/Roxiler_FullStack_Challenge
cd Roxiler_FullStack_Challenge
```

---

## 2️⃣ Backend Setup

```
cd backend
npm install
```

### Configure `.env`

Create a `.env` file inside backend folder:

```
PORT=5000
JWT_SECRET=your_jwt_secret_here
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=roxiler_db
```

### Start Backend

## **Backend Dependencies**
```
npm install express mysql2 sequelize jsonwebtoken bcryptjs cors dotenv
npm install --save-dev nodemon
```

```
npm run dev
```

Backend runs on:  
👉 **http://localhost:5000**

---

## 3️⃣ Frontend Setup

```
cd frontend
npm install
```

## **Frontend Dependencies**
```
npm install react react-dom react-router-dom axios
```



Start the frontend:

```
npm run dev
```

Frontend runs on:  
👉 **http://localhost:5173**

---

---

# 👤 Default Login Credentials 

### **Admin**
```
email: admin@gmail.com
password: 123
```

### **Store Owner Example**
```
email: owner@gmail.com
password: 123
```
### **Normal User**
```
email: user@gmail.com
password: 123
```
---

#  Features Summary

### ✔ User Features
- Register, Login
- Browse store list
- Rate any store
- View own submitted rating

### ✔ Owner Features
- View store dashboard
- Total ratings + average rating
- List of users who rated

### ✔ Admin Features
- Total users
- Total stores
- Manage user list
- Manage store list

---

# 📌 Notes
- Sequelize auto-generates foreign keys.
- Ratings update instantly.
- Fully role-based protected routes using JWT.

---

# ✨ Developer
**Gaurav Shevkar**  
Full Stack Developer  
https://github.com/gauravshevkar/Roxiler_FullStack_Challenge

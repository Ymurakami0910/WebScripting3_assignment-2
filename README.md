# Final Project – Favorite Books App

## Description
This is a BCIT term project that involves the creation of a full-stack web application where users can sign up, log in, and manage their own collection of favorite books. The app allows viewing, filtering, adding, editing, and deleting book entries, including file uploads (e.g., book cover images). All user data is securely stored in a MySQL database and protected with JWT-based authentication.

---

## Features
- User registration with hashed passwords using bcrypt
- User login with JSON Web Token (JWT) authentication
- Only authenticated users can view and manage their own data
- CRUD operations (Create, Read, Update, Delete) for favorite books
- Filtering books by category
- File upload support (book covers) via Multer
- React front-end with login/sign-up forms and authenticated views

---

## Technologies Used
- **Frontend:** React.js, HTML, CSS
- **Backend:** Node.js, Express, CORS, body-parser
- **Database:** MySQL with `mysql2`
- **Authentication:** bcrypt, JSON Web Token (JWT)
- **File Uploads:** Multer
- **Dev Environment:** MAMP, phpMyAdmin

---

## Setup Instructions

### 1. Clone this repository
```bash
git clone https://github.com/Ymurakami0910/WebScripting3_assignment-2.git
cd WebScripting3_assignment-2
2. Backend Setup
```bash
cd api
npm install
3. Import the SQL Database
```bash
Open phpMyAdmin (or your preferred MySQL client)

Create a new database (e.g., final_project_db)

Import the provided books.sql file located in the root or /api/sql/ folder

4. Configure Environment Variables
```bash
Create a .env file inside the /api folder with the following:

env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=final_project_db
JWT_SECRET=yourSuperSecretKey
⚠️ Make sure your database credentials match your local MAMP settings

5. Start the Backend Server
```bash
npm run dev

6. Frontend Setup
```bash
cd ../web
npm install
npm start
The React app will be accessible at http://localhost:3000

Folder Structure
/WebScripting3_assignment-2
  ├── api/
  │   ├── routes/
  │   ├── controllers/
  │   ├── middleware/
  │   └── sql/
  ├── web/
  ├── books.sql
  ├── .env
  └── README.md

Notes
All passwords are hashed with bcrypt before being stored in the database

JWT tokens are saved in localStorage and sent with requests for protected routes

Each user's data is isolated — users can only manage their own books

Author
Yurino Murakami
New Media Design & Web Development – BCIT
GitHub: Ymurakami0910


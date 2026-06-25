# School ID Card Generator

A comprehensive MERN stack application designed for schools to generate, manage, and distribute student ID cards. This system features role-based access control with distinct dashboards for School Administrators and Students.

## 🚀 Features

### Admin (School)
- **Dashboard:** View a grid of all generated ID cards with search functionality.
- **Create ID Cards:** Form to input student details and upload student photos (stored securely on Cloudinary).
- **Manage ID Cards:** Edit existing ID cards to correct mistakes or delete them if necessary.
- **Print ID Cards:** High-quality, print-ready views of student ID cards.
- **Secure Access:** Protected routes and API endpoints ensuring only admins can manage data.

### Student
- **Simple Dashboard:** Students log in to view their specific ID card based on their email.
- **Print:** Easily print their own ID card.
- **Read-Only Access:** Students cannot edit, create, or delete ID cards, nor can they view other students' cards.
- **Empty States:** Clear messaging if the school hasn't generated their ID card yet.

## 🛠️ Technology Stack

**Frontend:**
- React.js (Vite)
- React Router DOM
- Zustand (Global State Management)
- Tailwind CSS (Styling)
- Axios (API Communication)
- React Icons (UI Icons)

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Token (JWT) for authentication
- bcrypt (Password Hashing)
- Cloudinary & Multer (Image Uploads)
- dotenv (Environment Variables)

## 📂 Project Structure

The project is cleanly separated into two main directories:

### Backend Structure
- `src/models/`: Mongoose schemas for `User` and `IdCard`.
- `src/controllers/`: Business logic for authentication, ID card management, and image uploads.
- `src/routes/`: API endpoint definitions.
- `src/middleware/`: Authentication checks, role verification, and error handling.
- `src/config/`: Database and Cloudinary connection configurations.
- `src/utils/`: Helper functions like asynchronous handlers and token generators.

### Frontend Structure
- `src/api/`: Axios interceptors and API service functions.
- `src/store/`: Zustand stores for global auth and ID card state.
- `src/components/`: Reusable UI elements and forms.
- `src/pages/`: Main application views (Dashboards, Login, Forms).
- `src/routes/`: App routing and protected route wrappers.
- `src/hooks/`: Custom React hooks for data fetching and logic.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB URI
- Cloudinary Account

### 1. Backend Setup
1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in a `.env` file (refer to `.env.example` if available):
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Navigate to the Frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

## 🔒 Security Concepts Implemented
- **Password Hashing:** Passwords are never stored in plain text.
- **JWT Authentication:** Secure stateless authentication tokens.
- **Role-Based Access Control (RBAC):** Middleware on the backend and protected routes on the frontend restrict access to sensitive endpoints and pages based on user roles (Admin vs Student).
- **Environment Variables:** Sensitive keys and database URIs are kept out of source control.

## 🎨 Design Philosophy
The UI is built with a focus on modern, premium aesthetics using Tailwind CSS. It features:
- Responsive layouts for desktop and mobile viewing.
- Clean typography and ample whitespace.
- Hover effects, smooth transitions, and intuitive empty states.
- Dedicated print stylesheets to ensure ID cards look professional when printed on physical media.

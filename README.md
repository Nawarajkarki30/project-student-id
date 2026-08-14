# School ID Card Generator
#mylearning of making idcard generator
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

## 🧠 Technical Architecture & Implementation Details (For Supervisor Review)

This project strictly adheres to modern MERN stack principles. Below is a breakdown of the core technical decisions and implementations:

### 1. State Management (Zustand)
Instead of relying heavily on `useState` drilling or complex Redux boilerplate, this project uses **Zustand**. 
- **Why Zustand?** It provides a lightweight, hook-based global state.
- **Implementation:** We have two main stores: `useAuthStore` (manages the logged-in user, JWT token, and role) and `useIdCardStore` (handles fetching, adding, and editing ID cards). This keeps the React components clean and focused strictly on the UI.

### 2. React Hooks & Component Architecture
The application makes heavy use of React's functional component architecture:
- **`useState`:** Used for local component state, particularly for handling controlled inputs in the `IdCardForm.jsx` (e.g., tracking typed text before submitting).
- **`useEffect`:** Used to trigger side-effects, such as automatically fetching the student's ID card from the database as soon as the `StudentDashboard.jsx` component mounts.
- **Custom Hooks (`useAuth`, `useIdCards`):** Encapsulate API calling logic so the components don't become bloated with Axios `try/catch` blocks.

### 3. Role-Based Routing (React Router)
- **Implementation:** The `ProtectedRoute.jsx` component acts as a gatekeeper. It wraps around our routes in `AppRoutes.jsx`. 
- **Logic:** If a user is not logged in, they are redirected to `/login`. If a `student` tries to access `/admin/dashboard`, the `ProtectedRoute` checks their `user.role` from the Zustand store and redirects them back to the `/student/dashboard`. This ensures a strict separation of concerns.

### 4. Image Handling (Cloudinary + Multer)
- **The Problem:** Saving raw image files directly into a MongoDB database severely degrades performance and bloats database size.
- **The Solution:** We implemented **Cloudinary**, a cloud-based media delivery network.
- **How it works:** When an admin uploads a student photo, the frontend sends the file to the Express backend. The backend uses `multer` to temporarily hold the file, then securely uploads it to Cloudinary. Cloudinary returns a lightweight **URL string**. We save only this URL string in our MongoDB database. When the frontend needs to show the image, it simply uses an `<img src={url} />` tag.

### 5. Print Optimization
- The ID card printing functionality relies on advanced CSS rather than a heavy PDF-generation library. 
- Using Tailwind's `print:hidden` classes, we strip away the navigation bars, buttons, and backgrounds when the browser's print dialog opens, ensuring only the styled `IdCardPreview` component is rendered to the printer or saved as a PDF.

## 🔒 Security Concepts Implemented
- **Password Hashing:** Passwords are never stored in plain text.
- **JWT Authentication:** Secure stateless authentication tokens.
- **Role-Based Access Control (RBAC):** Middleware on the backend and protected routes on the frontend restrict access to sensitive endpoints and pages based on user roles (Admin vs Student).
- **Environment Variables:** Sensitive keys and database URIs are kept out of source control.

## 🎨 Design Philosophy
The UI is built with a focus on modern, premium aesthetics using Tailwind CSS. It features:
- Responsive layouts for desktop and mobile viewing.
- Clean typography and ample whitespace.
- Dedicated print stylesheets to ensure ID cards look professional when printed on physical media.

## 📅 Recent Updates (Changelog)

**Today's Collaborative Session:**
As a team of two developers, we successfully achieved the following milestones today:

1. **Frontend Architecture:** Initialized the React + Vite frontend, configured Tailwind CSS, and set up React Router with role-based `ProtectedRoute` wrappers.
2. **State Management:** Implemented Zustand stores (`authStore` and `idCardStore`) to handle global application state effectively.
3. **Admin Dashboard Completion:** Built out the Admin views including the ID card grid, the comprehensive creation/editing form with Cloudinary image upload, and the Single ID Card preview.
4. **Student Dashboard Completion:** Developed a streamlined, distraction-free student view featuring dynamic empty states and a clean ID card presentation.
5. **ID Card Polish:** Finalized the `IdCardPreview` component to include all required fields (Student ID, Class/Section, Blood Group, Guardian Phone, Issue Date, etc.) matching the project requirements perfectly.
6. **Print Capabilities:** Added `print:hidden` utility classes to ensure the print dialog strictly exports the beautifully formatted ID card without any UI clutter.
7. **Environment Setup & Seeding:** Configured the MongoDB Atlas connection and Cloudinary keys in `.env`, and created a utility script (`seedAdmin.js`) to seamlessly generate the very first admin login account.

## 🤖 Future Workspace Skills (AI Automation)
To maintain code quality and standardize future development, this project recommends setting up AI Agent skills in the `.agents/skills/` directory.

### Recommended Skills to Add:
1. **`unslop-ui`**: A skill that forces AI agents to audit Tailwind CSS layouts for premium aesthetics, consistent spacing, and modern UI/UX principles (like micro-animations and color harmony).
2. **`mern-scaffold`**: A code generator skill that enforces strict boilerplate rules when asking the AI to build new features (e.g., automatically generating a Mongoose Model, Express Controller with `asyncHandler`, and Zustand store logic).
3. **`security-audit`**: A vulnerability checker that forces the AI to check for JWT flaws, RBAC logic gaps, and data isolation before finalizing any backend changes.
4. **`test-writer`**: A skill that automatically writes API tests (e.g., using Jest/Supertest) for any newly created Express routes.

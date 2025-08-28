# Adam Project

![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-7-purple?logo=vite)
![MongoDB](https://img.shields.io/badge/MongoDB-6+-green?logo=mongodb)
![License](https://img.shields.io/badge/License-ISC-yellow)

A full-stack web application built with **React (Vite)** for the frontend and **Node.js + Express + MongoDB** for the backend.  

---

## ✨ Features
- ⚡ **Frontend (React + Vite)**
  - React 19
  - React Router for navigation
  - Bootstrap 5 styling
  - Icons via `react-icons`

- 🛠 **Backend (Node.js + Express)**
  - REST API with Express 5
  - MongoDB database (via Mongoose)
  - Nodemon for hot reload during development
  - CORS support

---

## 📂 Project Structure
adam/ → Backend (Express server)
├── index.js
├── package.json
└── ...

reactjs/ → Frontend (React + Vite)
├── src/
├── package.json
└── ...

yaml
Copy code

---

## ⚡ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/adamapu/adam.git
cd adam
2. Backend Setup (Server)
bash
Copy code
cd adam
npm install
Run backend:

bash
Copy code
npm run dev
Backend runs at:
👉 http://localhost:5000 (default, check your index.js for port)

3. Frontend Setup (React + Vite)
Open a new terminal:

bash
Copy code
cd reactjs
npm install
Run frontend:

bash
Copy code
npm run dev
Frontend runs at:
👉 http://localhost:5173

🔗 Usage Flow
Start backend server first (npm run dev inside adam/)

Then start frontend (npm run dev inside reactjs/)

Open the frontend in browser → it will connect to backend APIs

🧩 Scripts
Backend (adam/)
npm run dev → start backend with nodemon (dev mode)

npm start → start backend without nodemon

Frontend (reactjs/)
npm run dev → start frontend in development

npm run build → build for production

npm run preview → preview production build

npm run lint → run ESLint checks

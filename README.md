# Tasks App a Fullstack Project - Assignment App

This repository contains both the frontend and backend code for the project. Follow the instructions below to set up and run the project on your local machine.

## Table of Contents

- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Clone the Repository](#clone-the-repository)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)

---

## Project Structure

```bash
.
├── frontend      # React-based frontend
└── backend       # Node.js Express backend
```

## Tech Stack

- **Frontend:**
  - React
  - Vite
  - TailwindCSS
  - React Router DOM
  - Axios

- **Backend:**
  - Node.js
  - Express
  - MongoDB
  - JWT Authentication
  - Mongoose

---

## Prerequisites

Make sure you have the following installed on your machine:

- **Node.js**: >= v16.x
- **npm**: >= 7.x or **yarn**
- **MongoDB Atlas** (or a local MongoDB instance)

---

## Getting Started

### Clone the Repository

```bash
git clone git@github.com:atNeerajShukla/tasks-app.git
cd tasks-app
```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `frontend` directory and add the following:

   ```bash
   VITE_BE_API_URL=http://localhost:5000/api
   ```

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd ../backend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add the following:

   ```bash
   MONGO_URI=mongodb+srv://<your-mongodb-connection-string>
   JWT_SECRET=your_jwt_secret
   PORT=5000
   CORS_ORIGIN=*
   ```

   Replace `<your-mongodb-connection-string>` with your actual MongoDB URI.

---

## Environment Variables (For testing and running purposes, please use my provided .env files for both the front-end and back-end.)

Both the frontend and backend require environment variables to be set up for proper configuration.

### Frontend `.env` file:

```env
VITE_BE_API_URL=http://localhost:5000/api
```

- **VITE_BE_API_URL**: The base URL for the backend API.

### Backend `.env` file:

```env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
CORS_ORIGIN=*
```

- **MONGO_URI**: Your MongoDB connection string (use MongoDB Atlas or a local instance).
- **JWT_SECRET**: A secret key for signing JWT tokens.
- **PORT**: The port where the backend will run.
- **CORS_ORIGIN**: Set to `*` to allow all origins (or specify a frontend URL if needed).

---

## Running the Project

### Running the Frontend

1. Start the development server:

   ```bash
   cd frontend
   npm run dev
   ```

2. Open your browser and visit `http://localhost:3000` (or the port specified by Vite).

### Running the Backend

1. Start the backend server:

   ```bash
   cd backend
   npm run dev
   ```

2. The backend will run at `http://localhost:5000`.

# Task Management Application (Express, React, MongoDB)

This repository contains a simple task management application built with Express for the backend, React (Vite) for the frontend, and MongoDB for the database. The application supports both user and admin functionalities.

## Features

### User Functions:
- Create a task.
- Update a task.
- Delete a task.
- View a particular task.
- List all tasks.

### Admin Functions:
- View all users.
- View all tasks for each user.

## Table of Contents
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)

## Prerequisites

Before setting up the project, ensure that you have the following installed on your machine:
- Node.js (v18 or higher)
- npm (v8 or higher)
- MongoDB

## Installation

To get started with this project, clone the repository and navigate into the project directory:

```bash
git clone https://github.com/your-username/task-manager-app.git
cd task-manager-app
```

## Backend Setup

### 1. Navigate to the `backend` folder:
```bash
cd backend
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Create an `.env` file in the `backend` folder with the following content:

```bash
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
PORT=5000
```

Replace `your-mongodb-uri` and `your-secret-key` with your actual MongoDB connection string and JWT secret.

### 4. Start the backend server:
```bash
npm run dev
```

The backend server will run on `http://localhost:5000`.

## Frontend Setup

### 1. Navigate to the `frontend` folder:
```bash
cd ../frontend
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Create an `.env` file in the `frontend` folder with the following content:
```bash
REACT_APP_API_URL=http://localhost:5000/api
```

This points the frontend to the backend API running locally.

### 4. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`.

## Running the Application

### Backend:
1. Ensure MongoDB is running on your machine or your MongoDB URI is correct.
2. Start the backend using `npm run dev` in the `backend` folder.

### Frontend:
1. Run `npm run dev` in the `frontend` folder to start the Vite development server.

Now you can access the application via `http://localhost:5173`.

## Environment Variables

### Backend `.env`:
- `MONGO_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret key used for signing JWTs.
- `PORT`: Port for the backend server.

### Frontend `.env`:
- `REACT_APP_API_URL`: URL of the backend API (usually `http://localhost:5000/api` for local development).

## Additional Notes
- For any errors or issues, check the logs in both the frontend and backend consoles.
- Make sure to have MongoDB running locally or use a cloud-based MongoDB service like Atlas with the correct `MONGO_URI`.

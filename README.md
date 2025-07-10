# 💬 Chat Application – Real-Time Messaging with Socket.IO

Welcome to the **Chat Application** — a full-stack real-time messaging platform built using the modern MERN stack with **Socket.IO** for seamless, bi-directional communication. Sign in, chat live, and track active users in real time — all through a clean and responsive UI.

---

## 📑 Table of Contents

- [🚀 Overview](#-overview)  
- [✨ Features](#-features)  
- [🧰 Tech Stack](#-tech-stack)  
- [⚙️ Prerequisites](#️-prerequisites)  
- [📦 Installation](#-installation)  
- [🚦 Usage](#-usage)  
- [🧱 Project Structure](#-project-structure)  
- [🛠️ Configuration](#-configuration)  
- [▶️ Running the Application](#️-running-the-application)  
- [📡 API Endpoints](#-api-endpoints)  
- [🔌 Socket.IO Events](#-socketio-events)  
- [🐞 Troubleshooting](#-troubleshooting)  

---

## 🚀 Overview

This project is a **real-time, full-stack chat platform**. It allows users to:
- Log in with a username
- Join a shared chat room (`general-chat`)
- Exchange messages live
- View a sidebar of active users

Under the hood, it uses **MongoDB** for persistence, **Express** for the backend, **React** with **Tailwind CSS** for the frontend, and **Socket.IO** for real-time communication.

---

## ✨ Features

- 🔐 Simple username-based authentication (no password required)
- 💬 Real-time group chat via Socket.IO
- 🧍 Live sidebar showing currently active users
- 🧾 Persistent message history stored in MongoDB
- 📱 Fully responsive UI with scrollable chat and user lists

---

## 🧰 Tech Stack

**Frontend**: React, Tailwind CSS, Axios  
**Backend**: Node.js, Express.js  
**Realtime Engine**: Socket.IO  
**Database**: MongoDB  
**Tooling**: Vite, `pnpm`, `concurrently`

---

## ⚙️ Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)  
- [pnpm](https://pnpm.io/)  
- [MongoDB](https://www.mongodb.com/)  
- [Git](https://git-scm.com/)

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/chat-app.git
cd chat-app

Install dependencies:
pnpm install              # Root dependencies
cd client && pnpm install  # Frontend dependencies


## 🛠️ Configuration
Create a .env file inside the server/ directory with the following:

MONGO_URI=mongodb://localhost:27017/GroupDB
PORT=5000
CLIENT_URL=http://localhost:5173
✅ If using MongoDB Atlas, replace MONGO_URI accordingly.

## ▶️ Running the Application
Start MongoDB:

mongod
From the root of the project, run:

``` bash
pnpm run dev
This runs both the backend and frontend concurrently. Then visit:

http://localhost:5173

## 🚦 Usage
Enter a username to join the chat

Send and receive messages live

Open multiple tabs to simulate multiple users

Watch active users update in real time


## 🧱 Project Structure
chat-app/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── services/    # Socket.IO and API logic
│   │   └── App.jsx
│   └── vite.config.js
├── server/              # Node.js backend
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── socket/
│   └── server.js
├── .env
├── package.json
└── README.md

## 📡 API Endpoints
POST /api/users
Create a new user
### Body:

{ "username": "User1" }

### Response:

{ "_id": "...", "username": "User1" }
GET /api/messages
Fetch all messages

###Response:
[
  {
    "username": "User1",
    "message": "Hello",
    "timestamp": "2025-07-10T12:00:00Z",
    "room": "general-chat"
  }
]


## 🔌 Socket.IO Events
| **Event Name**    | **Direction**        | **Payload**                              | **Description**                             |
| ----------------- | -------------------- | ---------------------------------------- | ------------------------------------------- |
| `send_message`    | Client → Server      | `{ username, message, timestamp, room }` | Sent by client when a message is submitted  |
| `receive_message` | Server → All Clients | `{ username, message, timestamp, room }` | Broadcasts the message to all clients       |
| `user_join`       | Client → Server      | `{ username }`                           | Notifies server that a new user has joined  |
| `user_joined`     | Server → All Clients | `{ username }`                           | Notifies all clients that a user has joined |

🤝 Contributing
Fork the repo

Create a new branch

``` bash
git checkout -b feature-name
Commit and push

``` bash
git commit -m "Add feature-name"
git push origin feature-name
Open a pull request 🚀

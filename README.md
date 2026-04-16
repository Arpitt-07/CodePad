# CodePad 🚀

A real-time collaborative code editor that lets you write, run, and share code with others instantly.

## What is this?
CodePad is a lightweight tool for developers to collaborate on code in real-time. Instead of just sharing a static file or a screen, you can actually code together in a shared environment and execute that code against real compilers.

## Key Features
- **Real-time Collaboration**: Powered by Socket.io, see changes as they happen.
- **Integrated Code Execution**: Uses the JDoodle API to run code in multiple languages (Node.js, C++, Python) without leaving the editor.
- **Monaco Editor**: The same powerful editor that powers VS Code, providing a familiar and robust coding experience.
- **Fast & Responsive**: Built with React and Vite for a snappy frontend and Node.js/Express for a scalable backend.

## Tech Stack
- **Frontend**: React, Vite, Monaco Editor, Socket.io-client
- **Backend**: Node.js, Express, Socket.io, dotenv
- **Code Execution**: JDoodle API

## Getting Started

### Prerequisites
- Node.js installed on your machine
- A JDoodle API account (for code execution)

### Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/yourusername/code-pad.git
   cd code-pad
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` folder and add your JDoodle credentials:
   ```env
   PORT=5000
   JDoodle_ClientID=your_client_id
   JDoodle_Client_Secrete=your_client_secret
   ```
   Start the backend:
   ```bash
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

## How it works
The app uses a WebSocket connection to synchronize the state of the editor across all connected clients. When a user wants to run their code, the backend forwards the request to JDoodle's API, which compiles and executes the code in a secure sandbox and returns the output to the user.

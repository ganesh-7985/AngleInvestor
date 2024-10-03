# Investr

Investr is a platform designed to connect founders and investors, providing a smarter way to collaborate and grow businesses. This project is built using React and Vite for the frontend and Node.js with Express for the backend.

## Tech Stack

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **Framer Motion**: A library for animations.
- **Tailwind CSS**: A utility-first CSS framework for styling.

### Backend

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: A minimal and flexible Node.js web application framework.
- **MongoDB**: A NoSQL database for storing data.
- **Socket.io**: Enables real-time, bidirectional, and event-based communication.

## Installation

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB instance running.

### Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/investr.git
   cd investr
   ```

2. **Install server dependencies**:
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**:
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Variables**:
   - Create a `.env` file in the `server` directory and add your MongoDB URI and database name:
     ```
     MONGO_URI=your_mongo_uri
     DBNAME=your_db_name
     ```

5. **Run the server**:
   ```bash
   cd ../server
   npm run dev
   ```

6. **Run the client**:
   ```bash
   cd ../client
   npm run dev
   ```

## Usage

- Navigate to `http://localhost:3000` to access the application.
- Sign up or log in to explore the features.

## Project Structure

- **client**: Contains the React frontend code.
  - **src**: Source files for the React application.
  - **public**: Static files and assets.
- **server**: Contains the Node.js backend code.
  - **controllers**: Logic for handling requests.
  - **models**: Mongoose models for MongoDB.
  - **routes**: API endpoints.


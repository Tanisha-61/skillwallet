🌱 AgriTech – Smart Farming, Better Future

About the Project

AgriTech is a web-based application designed to help farmers access useful farming information through a simple and user-friendly interface.

Features

- Farmer Registration and Login
- Weather Information
- Crop Guidance
- React-based User Interface
- Node.js and Express Backend
- MongoDB Database Integration

Tech Stack

- Frontend: React, Vite, JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB
- Version Control: Git and GitHub

Project Structure

- "client/" – Frontend application
- "server/" – Backend application

How to Run Locally

1. Clone the Repository

git clone https://github.com/Tanisha-61/skillwallet.git
cd skillwallet

2. Start the Backend

cd server
npm install

Create a ".env" file inside the "server" folder and configure your local MongoDB connection and JWT secret. Do not upload this file to GitHub.

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/skillwallet
JWT_SECRET=your_local_secret

Then run:

node server.js

3. Start the Frontend

Open another terminal:

cd client
npm install
npm run dev

Open the local URL shown in the terminal.

Note

Weather and crop guidance functionality may require additional configuration depending on the implemented features.

Author

AgriTech Project

<h1 align="center">
  Agile Scrum Poker Web Application
</h1>

<p align="center">
  <a href="https://app.netlify.com/sites/planningpokeragile/deploys" target="_blank">
    <img src="https://api.netlify.com/api/v1/badges/1963b488-7b78-48c9-9e2d-6fb5e47ab3af/deploy-status" alt="Netlify Status" />
  </a>
</p>

Welcome to this Planning Poker Application repository ! This project showcases a full-stack application designed to facilatate planning poker sessions for agile teams. The application is built using modern web technologies and follows best practices for both client-side and server-side development.

# Application Design Overview
## Home Page
![image](https://github.com/aymankahya/poker-planning/assets/63832251/b50f96f9-4a87-4060-ac40-ce317488281f)

## Voting Session
![image](https://github.com/aymankahya/poker-planning/assets/63832251/b56ae41f-b294-4e75-b0b2-4473f2f09eb6)


# Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Getting Started](#getting-started)
5. [Installation](#installation)
6. [Directory Structure](#directory-structure)
7. [Configuration](#configuration)
8. [Running the application](#running-the-application)
9. [Contributing](#contributing)

## Project Overview

The Planning Poker Application is a tool for agile teams to estimate the effort required for various tasks. It allows users to create sessions, invite team memebers and vote on issues using planning poker approach. The application consists of a React-based client and Node/Express-based server with real-time communication facilitated through Socket.IO.

## Features

- User authentication and authorization
- Session mangement (create, join and leave session aswell as real-time updates)
- CRUD management of voted issues
- Real-time voting on issues
- Customizable voting systems
- Comprehensive validation and error handling
- Responsive design

# Technologies Used

### Client-Side

- React
- TypeScript
- TailwindCSS
- React-Router
- Shadcn/UI component library
- React Hook Form
- Zod
- ESLint
- Prettier
- Husky

### Server-Side

- Express
- MongoDB (Mongoose ODM)
- Passport.js (JWT Startegy)
- Socket.IO
- Express-validator
- Docker

## Getting Started

### Prerequisites

- Node.js (14.x or above)
- MongoDB
- Docker (optional, for containerized deployment)

## Installation

1. Clone the repository :

```bash
    git clone https://github.com/aymankahya/poker-planning.git
    cd poker-planning
```

2. Install dependencies for both client and server :

```bash
    cd client
    npm install
    cd ../server
    npm install
```

## Directory Structure

### Client

- `/client`: Contains the client-side code.
  - `/public`: Static assets served to the client.
  - `/src`: Source code for the client application.
    - `/assets`: Static assets like images and fonts.
    - `/components`: Reusable React components.
    - `/context`: React context providers.
    - `/hooks`: Custom React hooks.
    - `/layouts`: Layout components.
    - `/pages`: Page components.
    - `/routes`: Route definitions.
    - `/styles`: CSS and PostCSS files.
    - `/types`: TypeScript type definitions.
    - `/utils`: Utility functions.

### Server

- `/server`: Contains the server-side code.
  - `/config`: Configuration files for database and authentication.
  - `/controllers`: Handles user authentication, session management, and requests.
  - `/event`: Functions for managing planning poker sessions an real-time updates.
  - `/models`: Mongoose models and schemas.
  - `/routes`: Express router objects for handling HTTP requests.
  - `/sockets`: Socket.IO setup for real-time communication.
  - `/utils`: Utility functions for session data, JWTs, and RSA key pairs generation.
  - `/validation`: Middleware functions for user input validation and sanitization.

## Configuration

### Environment Variables

1. Create a `.env` file in the `/server` directory with the following variables:

```env
PORT= server_running_port
CLIENT = client_side_url
ENV = "prod" or "dev"
DB_PROD = production_database_name
DB_DEV = development_database_name
DB_USERNAME = mongodb_database_username
DB_PASSWORD = mongodb_database_password
```

2. Create a `.env` file in the `/client` directory with the following variables:

```env
VITE_SERVER_URL= server_side_url
VITE_CLIENT= client_side_url
```

## Running the application

### Development

1. Start the client :

```bash
cd client
npm run dev
```

2. Start the server :

```bash
cd ../server
npm run dev
```

### Production

1. Build the client :

```bash
cd client
npm run build
```

2. Build and Start the server :

```bash
cd ../server
npm run tsc
npm start
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch `git checkout -b feature/your-feature`
3. Commit your changes `git commit -m "your-commit-message"`
4. Push to the branch `git push origin feature/your-feature`
5. Open a pull request

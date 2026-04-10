# EventHub - Community Events Platform

A modern, clean, mobile-first full-stack application for discovering and hosting community events.

## Features
- **OTP-based Authentication**: Secure login via email OTP.
- **User Onboarding**: Complete profile with name, phone, and location.
- **Event Management**: Create and view events with categories.
- **ChatBuddy**: AI-powered mock chat for event assistance.
- **Modern UI**: Orange-to-peach gradient theme with smooth animations.

## Tech Stack
- **Frontend**: React.js (Create React App), Axios, Framer Motion, Lucide-React.
- **Backend**: Node.js, Express.js, Nodemailer.
- **Database**: SQLite (SQL).

## Getting Started

### Prerequisites
- Node.js installed.
- Gmail account for SMTP (if using real email).

### Setup

1. **Backend**:
   ```bash
   cd Backend
   npm install
   ```
   Create a `.env` file in `Backend/` with:
   ```
   PORT=5000
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

2. **Frontend**:
   ```bash
   cd Frontend
   npm install
   ```

### Running the App

1. **Start Backend**:
   ```bash
   cd Backend
   npm start
   ```

2. **Start Frontend**:
   ```bash
   cd Frontend
   npm start
   ```

The app will be available at `http://localhost:3000`.

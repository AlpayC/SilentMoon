**Silentmoon - Yoga & Meditation App**

<div style="display: flex; justify-content: center;">
  <img src="./screenshots/applogo.jpg" alt="Silentmoon Logo" height="500">
</div>
Welcome to the Silentmoon Full Stack MERN (MongoDB, Express, React, Node.js) App repository! Silentmoon is a comprehensive meditation companion that provides users with a tranquil and enriching yoga and meditation experience. Users can register, explore a variety of yoga videos and meditation playlists, track their meditation progress with detailed analytics, build meditation streaks, and immerse themselves in soothing meditation music sourced from the Deezer API. This README file will guide you through the installation, features, and technologies used in the app.

## Table of Contents 📑

- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Database](#database)
- [Authentication](#authentication)
- [Backend Routes](#backend-routes)
- [Design](#design)
- [Deployment](#deployment)
- [Third-Party Libraries & Tools](#third-party-libraries--tools)
- [Contributors](#contributors)

## Demo

You can view a live demo of the Silentmoon app at https://silentmoon.alpaycelik.dev.

## Features

The Silentmoon app has the following features:

### 🧘‍♀️ **Core Meditation Experience**
- **User Registration**: Users can create accounts to personalize their meditation journey.
- **Video & Playlist Exploration**: Users can browse a curated collection of yoga videos and meditation playlists.
- **Deezer Integration**: The app features high-quality meditation music and ambient sounds from the Deezer API.
- **High Quality Videos**: Yoga videos are hosted on Cloudinary in HD quality.
- **Mobile-Responsive**: Optimized for mobile devices with full functionality.

### 📊 **Progress Analytics & Tracking**
- **Real-Time Session Tracking**: Automatically logs meditation sessions with duration, type, and completion.
- **Meditation Streaks**: Build and maintain daily meditation streaks to stay motivated.
- **Progress Dashboard**: Visual analytics showing weekly/monthly meditation statistics.
- **Personal Insights**: Track total meditation minutes, average session length, and favorite meditation types.
- **Goal Tracking**: Weekly progress bars with 150-minute meditation goals.
- **Session History**: View recent meditation sessions with dates and details.

### 🎯 **Personalization Features**
- **Favorites Management**: Save favorite yoga videos and meditation playlists.
- **Custom Reminders**: Set personalized reminders for meditation sessions.
- **Search & Filter**: Find content by title, mood, and categories.
- **User Profile**: Comprehensive profile with real progress data and achievements.

### 🔒 **Security & Performance**
- **Optimized Performance**: Single-request profile loading (reduced from 6 to 1 API call).
- **Secure Content Delivery**: Content Security Policy for safe media streaming.
- **Rate Limiting**: Protection against API abuse with intelligent rate limiting.
- **Input Validation**: Server-side validation for all user inputs.

<div style="display: flex; justify-content: center;">
  <img src="./screenshots/mockups.jpg" alt="Silentmoon Logo" height="500">
</div>

## Tech Stack

The Silentmoon app uses the following technologies:

### **Frontend**
- **React**: Modern UI with hooks and context API
- **HTML5 & CSS3**: Responsive design and animations
- **React Router**: Single-page application routing
- **Axios**: HTTP client for API communication

### **Backend**
- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web application framework
- **Helmet**: Security middleware with CSP configuration
- **Express Rate Limit**: API rate limiting and abuse protection
- **Express Validator**: Input validation and sanitization

### **Database & Authentication**
- **MongoDB**: NoSQL database with Mongoose ODM
- **JWT**: JSON Web Token authentication
- **Crypto**: Password hashing and secure token generation

### **API Integrations**
- **Deezer API**: Meditation music and ambient sound streaming
- **Cloudinary**: High-quality video hosting and delivery

### **Development & Deployment**
- **Render.com**: Cloud hosting platform
- **Git**: Version control with feature branch workflow
- **Cross-env**: Environment variable management
- **Nodemon**: Development server with hot reload

### **Security & Performance**
- **Content Security Policy**: Media source whitelisting
- **CORS**: Cross-origin resource sharing configuration
- **Rate Limiting**: Request throttling and abuse prevention
- **Input Validation**: Server-side data sanitization

<div style="display: flex; justify-content: center;">
  <img src="./screenshots/techstack.jpg" alt="Silentmoon Logo" height="400">
</div>

## Getting Started

To run Silentmoon on your local machine, follow these steps:

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/AlpayC/Fullstack_Abschlussprojekt_SilentMoon.git
   ```

2. Navigate to the project directory:

   ```bash
   cd silentmoon
   ```

3. Install frontend and backend dependencies:

   ```bash
   npm install
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

## Usage

1. Start the app:

   ```bash
   npm run dev
   ```

   The frontend server will run on http://localhost:3000 and the backend server will run on http://localhost:3001.

2. Open the app in your browser at http://localhost:3000.

3. Register a new account or log in with the following credentials:

   ```bash
   email:
    password:
   ```

4. Explore the app!

5. To stop the server, press `Ctrl + C`.

## API Integration & Environment Setup

The Silentmoon app integrates with multiple APIs to provide a comprehensive meditation experience:

### **Environment Variables**

Create a `.env` file in the root directory with the following variables:

#### **Database & Authentication**
```env
# MongoDB connection
DB=your_mongodb_connection_string
PORT=3002

# JWT Authentication
TOKEN_SECRET=your_jwt_secret_key
```

#### **API Integrations**
```env
# Deezer API (primary music source)
DEEZER_APP_ID=your_deezer_app_id
DEEZER_SECRET=your_deezer_secret

# Spotify API (legacy support)
SPOTIFY_ID=your_spotify_client_id
SPOTIFY_SECRET=your_spotify_client_secret
```

#### **Deployment Configuration**
```env
# Environment mode (development/production)
NODE_ENV=production

# Render.com deployment
VITE_BACKEND_URL=your_backend_url
RENDER_EXTERNAL_URL=your_render_url
```

### **API Setup Instructions**

1. **MongoDB**: Create a database cluster on [MongoDB Atlas](https://cloud.mongodb.com/)
2. **JWT Secret**: Generate with `require("crypto").randomBytes(64).toString("hex")`
3. **Deezer API**: Register at [Deezer Developers](https://developers.deezer.com/)
4. **Cloudinary**: Set up account for video hosting (configured separately)

## Database

The Silentmoon app uses MongoDB to store comprehensive user data including:

- **User profiles** with authentication credentials
- **Meditation sessions** with tracking data (duration, type, completion)
- **Progress analytics** including streaks and total minutes
- **Favorite content** (yoga videos and meditation playlists)
- **User preferences** and reminder settings

The database is hosted on MongoDB Atlas with Mongoose ODM for data modeling. Videos are stored on Cloudinary for optimized delivery.

## Performance & Security Enhancements

### **Performance Optimizations** ⚡
- **Request Reduction**: Profile page optimized from 6 API calls to 1 comprehensive request
- **Infinite Loop Prevention**: Fixed React context dependency loops that caused excessive re-renders
- **Smart Caching**: Utilizes session storage for offline data availability
- **Optimized Components**: React.memo, useCallback, and useMemo for efficient rendering

### **Security Features** 🔒
- **Content Security Policy**: Configured CSP headers allowing trusted media sources only
- **Rate Limiting**: Intelligent API rate limiting with development mode bypass
- **Input Validation**: Server-side validation using express-validator
- **Authentication**: JWT tokens with secure cookie storage
- **Password Security**: Crypto-based password hashing with salt
- **CORS Protection**: Configured cross-origin resource sharing policies

## Authentication

The Silentmoon app uses JWT authentication. The app generates a JWT token when a user registers or logs in. The token is stored in local storage and is used to authenticate the user for protected routes. The token is valid for 24 hours. The app uses the `jsonwebtoken` library to generate and verify tokens. The app uses the `bcrypt` library to hash passwords. The app uses the `axios` library to make HTTP requests.

## Backend Routes

The Silentmoon app uses the following API endpoints:

### **User Management**
- `GET /api/user` - Get all users
- `POST /api/user/getUserData` - Fetch authenticated user data
- `POST /api/user/signup` - User registration
- `POST /api/user/login` - User authentication
- `GET /api/user/logout` - User logout
- `GET /api/user/secure` - Verify authentication token

### **Progress Analytics** 🆕
- `POST /api/user/logsession` - Log meditation session with duration and type
- `GET /api/user/analytics/:id` - Get comprehensive user analytics and insights
- `GET /api/user/stats/:id` - Get basic user statistics
- `GET /api/user/profile/:id` - Get complete profile data (single optimized request)

### **Favorites Management**
- `PUT /api/user/addexercise` - Add yoga video to favorites
- `PUT /api/user/deleteexercise` - Remove yoga video from favorites
- `PUT /api/user/addplaylist` - Add meditation playlist to favorites
- `PUT /api/user/deleteplaylist` - Remove meditation playlist from favorites

### **User Settings**
- `PUT /api/user/updatereminder` - Update meditation reminder preferences

### **Music & Meditation Content**
- `GET /api/deezer/playlist` - Get meditation playlists from Deezer
- `POST /api/deezer/tracks` - Get tracks from specific playlist
- `GET /api/deezer/onetrack/:id` - Get single track details
- `POST /api/deezer/getPlaylistDetails` - Get detailed playlist information

### **Yoga Videos**
- `GET /api/exercises` - Get all yoga videos
- `GET /api/exercises/details/:id` - Get specific video details
- `GET /api/exercises/filter` - Filter videos by category and mood

### **System**
- `GET /api/status` - Server health check

## Design

The app's UI/UX was designed and Figma The app's wireframes were designed using Figma

## Deployment

The app is deployed using Render.com with continuous deployment from the `main` branch.

**Live Demo**: https://silentmoon.alpaycelik.dev

### **Production Environment Variables**
```env
# Database & Auth
DB=mongodb_atlas_connection_string
TOKEN_SECRET=production_jwt_secret
PORT=3002

# API Keys
DEEZER_APP_ID=production_deezer_id
SPOTIFY_ID=production_spotify_id
SPOTIFY_SECRET=production_spotify_secret

# Deployment
NODE_ENV=production
VITE_BACKEND_URL=https://your-backend.onrender.com
RENDER_EXTERNAL_URL=https://your-app.onrender.com
```

### **Build Process**
1. Frontend built with Vite for optimized production bundle
2. Backend serves static files from `frontend/dist`
3. Security headers and CSP automatically applied in production
4. Rate limiting enabled for production environment

## Third-Party Libraries & Tools

### **Frontend Dependencies**
- `react` - Modern UI library with hooks and context
- `react-router-dom` - Client-side routing for single-page application
- `axios` - Promise-based HTTP client for API communication
- `react-ios-time-picker` - iOS-style time picker component

### **Backend Dependencies**
- `express` - Fast, minimalist web framework for Node.js
- `mongoose` - MongoDB object modeling tool with validation
- `jsonwebtoken` - JWT implementation for authentication
- `helmet` - Security middleware with CSP configuration
- `express-rate-limit` - Rate limiting middleware for API protection
- `express-validator` - Input validation and sanitization middleware
- `cookie-parser` - Parse HTTP request cookies
- `cors` - Cross-Origin Resource Sharing middleware
- `dotenv` - Environment variable management
- `multer` - Multipart form data handling

### **Development Tools**
- `nodemon` - Development server with automatic restart
- `cross-env` - Cross-platform environment variable setting
- `vite` - Fast build tool and development server

### **External Services**
- `cloudinary` - Video hosting and delivery optimization
- `mongodb atlas` - Cloud database hosting
- `deezer api` - Meditation music streaming
- `render.com` - Application hosting and deployment

## Contributors

Special thanks to the following contributors for their hard work on this project:

- [Elisaatnam](https://github.com/Elisaatnam) - Frontend Developer & Ui/Ux Designer
- [Lis-art](https://github.com/Lis-art) - Trellomaster & Frontend Developer
- [mirzakomic](https://github.com/mirzakomic) - CSS Master & Frontend Developer
- [AlpayC](https://github.com/AlpayC) - Backend Developer & Git Master

Feel free to reach out with any questions or feedback. Happy coding and meditating with Silentmoon! 🧘‍♀️🌙

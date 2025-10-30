# ✈️ Airport Management System

A modern full-stack web application for managing airport operations with flight bookings, user management, and powerful admin controls.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)

---

## � About This Project

This is a comprehensive, production-ready airport management system designed to streamline airline operations and enhance the passenger experience. The platform enables users to effortlessly search for flights across multiple destinations, book tickets with real-time seat availability, manage their reservations, and access their complete booking history through an intuitive user interface.

For administrators, the system provides powerful management tools including a sophisticated dashboard to oversee all flight operations, add or modify flight schedules, monitor passenger lists, track booking trends, and analyze revenue metrics. The admin panel offers complete control over the system, making it easy to manage the entire airport ecosystem from a single centralized platform.

Built with modern web technologies following industry best practices, this application leverages the MERN stack (MongoDB, Express.js, React, Node.js) to deliver a robust and scalable solution. The frontend features a responsive, mobile-friendly design with professional airline branding that adapts seamlessly across all devices—from desktop computers to smartphones. The user interface incorporates contemporary design principles including glassmorphism effects and a corporate color scheme that provides a premium, enterprise-grade look and feel.

Security is a top priority, with enterprise-level JWT (JSON Web Token) authentication ensuring secure user sessions, bcrypt password hashing protecting sensitive credentials, and role-based access control (RBAC) differentiating between regular users and administrators. The system implements comprehensive input validation, CORS protection, and follows OWASP security guidelines to safeguard user data.

Real-time data synchronization ensures that flight information, seat availability, and booking statuses are always up-to-date across all user sessions. The RESTful API architecture makes the backend easily extensible for future features like payment gateway integration, email notifications, or mobile applications.

Whether you're a developer looking to learn full-stack development, a student working on a capstone project, or an entrepreneur seeking a foundation for a real-world airline booking platform, this system provides a solid, well-documented starting point with room for customization and expansion.

---

## �📸 What You'll Get

✅ **User Portal** - Book flights, manage bookings, view history  
✅ **Admin Dashboard** - Manage flights, view passengers, track revenue  
✅ **Modern UI** - Professional corporate airline design  
✅ **Secure Login** - JWT authentication with role-based access  
✅ **Real-time Updates** - Live flight status and availability  

---

## � Quick Start (3 Simple Steps)

### Step 1️⃣: Install Requirements

Make sure you have these installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) free tier)

### Step 2️⃣: Clone & Install

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/airport-management-system.git
cd airport-management-system

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 3️⃣: Configure & Run

**Backend Setup:**
```bash
# Go to backend folder
cd backend

# Create .env file with these settings:
# Copy and paste this into backend/.env file:
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/airport_management
JWT_SECRET=your_super_secret_key_change_this_in_production
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:3000

# Start backend (runs on http://localhost:5000)
npm run dev
```

**Frontend Setup:**
```bash
# Open a new terminal and go to frontend folder
cd frontend

# Start frontend (runs on http://localhost:3000)
npm start
```

**That's it! 🎉** Your browser will automatically open to `http://localhost:3000`

---

## 🎯 Quick Access

| **What** | **Where** |
|----------|-----------|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000 |
| Admin Login | Email: `admin@airport.com` Password: `password123` |
| MongoDB | mongodb://localhost:27017/airport_management |

---

## 📚 What Can Users Do?

### 👤 Regular Users
- ✈️ Search and book flights
- 📋 View booking history
- ❌ Cancel bookings
- 👤 Manage profile

### 👨‍💼 Admin Users
- ➕ Add/Edit/Delete flights
- 👥 View all passengers
- 📊 Track bookings and revenue
- 🔧 Manage system data

---

## 🗄️ MongoDB Setup Options

### Option 1: Local MongoDB (Recommended for Development)
```bash
# Make sure MongoDB is installed and running
# Windows: MongoDB runs as a service automatically
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongodb
```

### Option 2: MongoDB Atlas (Free Cloud Database)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a free account
3. Create a cluster (free tier)
4. Get your connection string
5. Update `MONGODB_URI` in `backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/airport_management
   ```

---

## 🛠️ Built With

- **Frontend:** React.js, React Router, Axios, CSS3
- **Backend:** Node.js, Express.js, JWT Authentication
- **Database:** MongoDB with Mongoose ODM
- **Security:** bcryptjs password hashing, CORS protection

## 🔧 Troubleshooting

### Common Issues & Solutions

**Problem:** `Cannot connect to MongoDB`
```bash
# Solution: Make sure MongoDB is running
# Windows: Check Services app for MongoDB
# Mac/Linux: Run 'sudo systemctl status mongodb'
```

**Problem:** `Port 3000 or 5000 already in use`
```bash
# Solution: Kill the process or change port
# Windows: netstat -ano | findstr :3000
# Then: taskkill /PID <process-id> /F
```

**Problem:** `npm install fails`
```bash
# Solution: Clear npm cache and try again
npm cache clean --force
npm install
```

**Problem:** `Admin login not working`
```bash
# Solution: Run the seed script to create admin user
cd backend
npm run seed
# Admin credentials: admin@airport.com / password123
```

---

## 📦 Easy Deployment Guide

### Deploy Backend (Railway.app - Free & Easy)

1. Go to [Railway.app](https://railway.app) and sign in with GitHub
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your `airport-management-system` repository
4. Railway will auto-detect Node.js and deploy backend
5. Add environment variables in Railway dashboard:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=<your-mongodb-atlas-uri>
   JWT_SECRET=<your-secret-key>
   JWT_EXPIRE=30d
   CLIENT_URL=<your-frontend-url>
   ```
6. Get your backend URL (e.g., `https://your-app.railway.app`)

### Deploy Frontend (Vercel - Free & Easy)

1. Go to [Vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"New Project"** → Select your repository
3. Configure:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Create React App
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
4. Add environment variable:
   ```
   REACT_APP_API_URL=<your-railway-backend-url>
   ```
5. Click **"Deploy"** and you're live! 🎉

### Deploy Database (MongoDB Atlas - Free Tier)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a **FREE M0 Cluster**
3. Click **"Connect"** → **"Connect your application"**
4. Copy connection string and update in Railway environment variables

**Total Cost:** $0 (All free tiers) 💰

---

## 📖 API Documentation

<details>
<summary><b>Click to view API endpoints</b></summary>

### 🔐 Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Register new user |
| POST | `/api/users/login` | Login user |
| GET | `/api/users/profile` | Get user profile |

### ✈️ Flights
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/flights` | Get all flights | Public |
| GET | `/api/flights/search` | Search flights | Public |
| POST | `/api/flights` | Create flight | Admin |
| PUT | `/api/flights/:id` | Update flight | Admin |
| DELETE | `/api/flights/:id` | Delete flight | Admin |

### 🎫 Bookings
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/bookings` | Create booking | User |
| GET | `/api/bookings/my-bookings` | Get user bookings | User |
| GET | `/api/bookings` | Get all bookings | Admin |
| PUT | `/api/bookings/:id/cancel` | Cancel booking | User |

</details>

---

## 🎨 Project Structure

```
airport-management-system/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth & validation
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   └── server.js        # Entry point
├── frontend/
│   ├── public/          # Static files
│   └── src/
│       ├── components/  # React components
│       ├── App.js       # Main app component
│       └── index.js     # Entry point
└── README.md
```

## 🤝 Contributing

Want to improve this project? Contributions are welcome!

1. **Fork** this repository
2. **Create** a new branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## � License

This project is open source and available under the [MIT License](LICENSE).

---

## 💬 Support & Contact

Having issues? Need help?

- 🐛 **Report bugs:** [Create an issue](https://github.com/YOUR_USERNAME/airport-management-system/issues)
- 💡 **Feature requests:** [Start a discussion](https://github.com/YOUR_USERNAME/airport-management-system/discussions)
- 📧 **Email:** your-email@example.com

---

## ⭐ Show Your Support

If you found this project helpful, please give it a ⭐️!

---

## 📸 Screenshots

<details>
<summary><b>Click to view screenshots</b></summary>

### Login Page
![Login](screenshots/login.png)

### Flight Search
![Flights](screenshots/flights.png)

### Admin Dashboard
![Admin](screenshots/admin.png)

### Booking Page
![Booking](screenshots/booking.png)

</details>

---

## � Quick Commands Reference

```bash
# Start backend
cd backend && npm run dev

# Start frontend
cd frontend && npm start

# Seed database with sample data
cd backend && npm run seed

# Build frontend for production
cd frontend && npm run build

# Install all dependencies (run from root)
cd backend && npm install && cd ../frontend && npm install
```

---

## 🚀 Future Enhancements

- [ ] Email notifications for bookings
- [ ] Payment gateway integration
- [ ] Real-time flight tracking
- [ ] Seat selection interface
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] PDF ticket generation
- [ ] Advanced analytics dashboard

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)
- LinkedIn: [Your Profile](https://linkedin.com/in/your-profile)

---

<div align="center">

### ✈️ Happy Flying! ✈️

Made with ❤️ by developers, for developers

**[⬆ Back to Top](#-airport-management-system)**

</div>A comprehensive, production-ready airport management system that enables users to search and book flights, manage their bookings, and provides administrators with powerful tools to manage flights, passengers, and revenue analytics. 

Built with modern web technologies and best practices, featuring a responsive UI with professional airline branding, secure JWT authentication, role-based access control, and real-time data updates.

Perfect for learning full-stack development or as a foundation for a real-world airline booking platform.

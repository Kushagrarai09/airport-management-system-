# Airport Management System

A comprehensive full-stack web application for managing airport operations, including flight bookings, user management, and admin controls.

## 🚀 Features

### User Module

- **User Registration & Login**: Secure authentication system
- **Profile Management**: Users can view and update their profiles
- **View Personal Bookings**: Track all flight bookings and their status

### Admin Module

- **Flight Management**: Add, edit, and delete flights
- **Booking Management**: View all bookings across the system
- **Passenger Lists**: View passenger details for specific flights
- **User Management**: View and manage user accounts

### Flight Module

- **Flight Search**: Search flights by destination, date, and other criteria
- **Flight Listings**: Browse all available flights
- **Real-time Updates**: Flight status and availability updates

### Booking Module

- **Flight Booking**: Book tickets for available flights
- **Multiple Passengers**: Support for booking multiple passengers
- **Seat Class Selection**: Choose from Economy, Business, or First Class
- **Booking Cancellation**: Cancel bookings with proper validation
- **Booking History**: Complete booking history with details

## 🛠️ Technology Stack

### Backend

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **JWT**: Authentication
- **bcryptjs**: Password hashing
- **CORS**: Cross-origin resource sharing

### Frontend

- **React.js**: Frontend library
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **React Toastify**: Notifications
- **CSS3**: Styling

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **MongoDB** (local installation or MongoDB Atlas)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd airport-management-system
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment variables
# Copy .env.example to .env and update the values
cp .env.example .env

# Update the .env file with your configurations:
# NODE_ENV=development
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/airport_management
# JWT_SECRET=your_jwt_secret_key_here_make_it_very_long_and_secure
# JWT_EXPIRE=30d
# CLIENT_URL=http://localhost:3000

# Start the backend server
npm run dev
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

### 4. Database Setup

Make sure MongoDB is running on your system:

```bash
# If using local MongoDB
mongod

# Or if using MongoDB as a service
sudo systemctl start mongodb
```

The application will automatically create the necessary collections when you start using it.

## 🔧 Configuration

### Environment Variables (Backend)

Create a `.env` file in the backend directory with the following variables:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/airport_management
JWT_SECRET=your_jwt_secret_key_here_make_it_very_long_and_secure
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:3000
```

### MongoDB Connection

- **Local MongoDB**: Use `mongodb://localhost:27017/airport_management`
- **MongoDB Atlas**: Use your Atlas connection string

## 🌐 API Endpoints

### Authentication

- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile (Protected)
- `PUT /api/users/profile` - Update user profile (Protected)

### Flights

- `GET /api/flights` - Get all flights
- `GET /api/flights/search` - Search flights
- `GET /api/flights/:id` - Get single flight
- `POST /api/flights` - Create flight (Admin only)
- `PUT /api/flights/:id` - Update flight (Admin only)
- `DELETE /api/flights/:id` - Delete flight (Admin only)

### Bookings

- `POST /api/bookings` - Create booking (Protected)
- `GET /api/bookings/my-bookings` - Get user bookings (Protected)
- `GET /api/bookings` - Get all bookings (Admin only)
- `GET /api/bookings/:id` - Get single booking (Protected)
- `PUT /api/bookings/:id/cancel` - Cancel booking (Protected)
- `GET /api/bookings/flight/:flightId/passengers` - Get flight passengers (Admin only)

## 👤 Default Admin Account

For testing purposes, you can create an admin account by registering a user and then manually updating their role in the database:

```javascript
// Connect to MongoDB and run:
db.users.updateOne({ email: "admin@airport.com" }, { $set: { role: "admin" } });
```

## 🎯 Usage

1. **Start the application**: Follow the installation steps above
2. **Register/Login**: Create a new account or login with existing credentials
3. **Search Flights**: Use the search functionality to find flights
4. **Book Flights**: Select a flight and complete the booking process
5. **Manage Bookings**: View and manage your bookings from the dashboard
6. **Admin Features**: If you're an admin, access additional management features

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Passwords are hashed using bcryptjs
- **Input Validation**: Comprehensive input validation on both frontend and backend
- **CORS Protection**: Configured CORS for secure cross-origin requests
- **Role-based Access**: Different access levels for users and admins

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:

- Desktop computers
- Tablets
- Mobile phones

## 🚧 Development

### Adding New Features

1. **Backend**: Add new routes in `/routes`, controllers in `/controllers`, and models in `/models`
2. **Frontend**: Add new components in `/src/components` and update routing in `App.js`

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📦 Deployment

### Backend Deployment

1. Set environment variables on your hosting platform
2. Update MONGODB_URI for production database
3. Set NODE_ENV=production
4. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment

1. Build the production version:

```bash
npm run build
```

2. Deploy the `build` folder to platforms like Netlify, Vercel, or AWS S3

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-username/airport-management-system/issues) page
2. Create a new issue if your problem isn't already listed
3. Provide detailed information about the problem and your environment

## 🙏 Acknowledgments

- React team for the amazing frontend library
- Express.js team for the robust backend framework
- MongoDB team for the flexible database solution
- All contributors who help improve this project

---

**Happy Coding! ✈️**

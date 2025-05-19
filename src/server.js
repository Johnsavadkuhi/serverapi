const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const http = require('http');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const validateReoutes = require("./routes/validateRoutes")
const projectRoutes = require("./routes/projectRoutes")
const userRoutes = require("./routes/userRoutes")
const notificationRoutes = require("./routes/notificationRoutes")
const owaspRoutes = require("./routes/owaspRoutes")
const initializeSocket = require('./socket/');
const connectDB = require('./config/dbConfig');
const cors = require("cors");
const { verifyToken } = require('./middleware/verifyToken');
const app = express();
const PORT = process.env.PORT || 5000;
// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

connectDB() 
 
// REST API routes
app.use('/api/auth', authRoutes);
app.use('/api/validate' , validateReoutes)
app.use("/api/projects" , verifyToken , projectRoutes )
app.use("/api/users" , verifyToken , userRoutes)
app.use("/api/notification"  ,notificationRoutes )
app.use('/api/owasp' , owaspRoutes)
// Create HTTP server
const server = http.createServer(app);

// Integrate Socket.IO
initializeSocket(server);

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

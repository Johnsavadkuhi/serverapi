const mongoose = require('mongoose');

let isConnected = false; // Global flag

const connectDB = async () => {
  if (isConnected) {
    console.log('📡 Using existing MongoDB connection');
    return mongoose.connection;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

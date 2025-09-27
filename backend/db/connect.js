const mongoose = require("mongoose");

module.exports.connectdb = async () => {
  try {
    // Remove extra slash and use correct db name: 'assesemnt'
    await mongoose.connect(process.env.URL);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // Optional: exit if DB fails
  }
};


// shivamkumarshah1210_db_user


// wins-faster-loyal-nifty

// INB8Hvw8U8mazg8N
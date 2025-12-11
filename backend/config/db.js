import mongoose from "mongoose";

const connectDb = async () => {
  try {
    // Connection options for better reliability
    const options = {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000, // Explicit connection timeout
      // family: 4, // Removed to allow both IPv4 and IPv6 which fixes some DNS lookup issues
    };

    console.log("🔄 Attempting to connect to MongoDB...");

    // Try connecting with the provided URI
    await mongoose.connect(process.env.MONGO_URI, options);

    console.log(`✅ Database is Connected Successfully`);
    console.log(`📊 Connected to: ${mongoose.connection.name}`);
    console.log(`🌐 Host: ${mongoose.connection.host}`);

  } catch (error) {
    console.error("❌ MongoDB Connection Failed!");
    console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.error("Error Type:", error.name);
    console.error("Error Message:", error.message);

    // Provide helpful diagnostics based on error type
    if (error.message.includes("queryTxt") || error.message.includes("ENOTFOUND")) {
      console.error("\n🔍 DNS Resolution Issue Detected!");
      console.error("Possible causes:");
      console.error("  1. Internet connection issues");
      console.error("  2. DNS server problems");
      console.error("  3. Firewall blocking MongoDB connections");
      console.error("  4. VPN interference");
      console.error("\n💡 Solutions:");
      console.error("  - Check your internet connection");
      console.error("  - Try disabling VPN if active");
      console.error("  - Check Windows Firewall settings");
    }

    if (error.message.includes("Authentication failed") || error.message.includes("auth")) {
      console.error("\n🔐 Authentication Issue Detected!");
      console.error("💡 Solutions:");
      console.error("  - Verify username and password in MONGO_URI");
      console.error("  - Check if database user exists in MongoDB Atlas");
    }

    if (error.message.includes("bad auth") || error.message.includes("IP") ||
      error.message.includes("not authorized") || error.name === "MongoServerSelectionError") {
      console.error("\n🌐 Connection/IP Whitelist Issue Possible!");
      console.error("💡 Solutions:");
      console.error("  - Add your IP to MongoDB Atlas Network Access");
      console.error("  - Or allow all IPs (0.0.0.0/0) for development");
      console.error("  - Check if MongoDB cluster is active (not paused)");
      console.error("\n📍 To fix:");
      console.error("  1. Go to https://cloud.mongodb.com");
      console.error("  2. Select your project");
      console.error("  3. Go to 'Network Access' in left sidebar");
      console.error("  4. Click 'Add IP Address'");
      console.error("  5. Add current IP or 0.0.0.0/0");
    }

    console.error("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.error("⚠️  Server will continue running but database features won't work!");
    console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  }
};

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('🔗 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️  Mongoose disconnected from MongoDB');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed due to app termination');
  process.exit(0);
});

export default connectDb;
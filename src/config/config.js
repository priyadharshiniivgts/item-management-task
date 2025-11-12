const mongoose = require("mongoose");

const connectDB = (mongoUri) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(mongoUri)
      .then(() => {
        console.log("Connected to MongoDB successfully");
        resolve();
      })
      .catch((error) => {
        console.error("MongoDB connection error:", error.message);
        reject(error);
      });
  });
};

const setupDBEventHandlers = () => {
  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected");
  });
};

const setupShutdown = () => {
  process.on("SIGINT", async () => {
    console.log("\nShutting down gracefully...");
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
    process.exit(0);
  });
};

const getDBStatus = () => {
  return mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";
};

module.exports = {
  connectDB,
  setupDBEventHandlers,
  setupShutdown,
  getDBStatus,
};

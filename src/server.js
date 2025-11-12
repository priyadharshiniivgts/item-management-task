require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");

const itemsRoutes = require("./routes/item.route");
const errorHandler = require("./middleware/errorHandler");
const swaggerSpec = require("./config/swagger");
const {
  connectDB,
  setupDBEventHandlers,
  setupShutdown,
  getDBStatus,
} = require("./config/config");

const app = express();

const PORT = process.env.PORT || 3000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/itemsdb";

const startTime = Date.now();

setupDBEventHandlers();

setupShutdown();

connectDB(MONGODB_URI)
  .then(() => {
    setupExpressApp();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Health check available at http://localhost:${PORT}/health`);
      console.log(
        `API endpoints available at http://localhost:${PORT}/api/items`
      );
      console.log(
        `Swagger API docs available at http://localhost:${PORT}/api-docs`
      );
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  });

function setupExpressApp() {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("dev"));

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get("/health", async (req, res) => {
    try {
      const dbStatus = getDBStatus();
      const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);

      res.status(200).json({
        status: "Servser is working",
        dbStatus: dbStatus,
        uptime: `${uptimeSeconds}s`,
      });
    } catch (error) {
      res.status(503).json({
        status: "Server is Down...",
        dbStatus: "Error",
        uptime: `${Math.floor((Date.now() - startTime) / 1000)}s`,
      });
    }
  });

  app.use("/api/items", itemsRoutes);

  app.get("/", (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome to Items.... API. Use /api/items for CRUD operations.",
      data: null,
    });
  });

  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: "Route not found",
      data: null,
    });
  });

  app.use(errorHandler);
}

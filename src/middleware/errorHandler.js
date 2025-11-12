const { ZodError } = require("zod");

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err instanceof ZodError && err.issues && Array.isArray(err.issues)) {
    statusCode = 400;
    const errors = err.issues.map((e) => {
      const path = Array.isArray(e.path) ? e.path.join(".") : "unknown";
      return `${path}: ${e.message}`;
    });
    message = `Validation Error: ${errors.join(", ")}`;
  }

  if (err.name === "ValidationError" && err.errors) {
    statusCode = 400;
    const errors = Object.values(err.errors).map((e) => e.message);
    message = `Validation Error: ${errors.join(", ")}`;
  }

  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
  }

  if (err.code === 11000) {
    statusCode = 409;
    message = "Duplicate entry: This item already exists";
  }

  console.error("Error:", {
    statusCode,
    message,
    errorName: err.name,
    errorCode: err.code,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });

  res.status(statusCode).json({
    success: false,
    message,
    data: null,
  });
};

module.exports = errorHandler;

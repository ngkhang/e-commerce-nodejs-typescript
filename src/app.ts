import express from "express";
import logger from "morgan";
import helmet from "helmet";
import compression from "compression";

const app = express();

// Initialize middlewares
app.use(logger("dev"));
app.use(helmet());
app.use(compression());

// Initialize router
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Initialized Router",
  });
});

export default app;

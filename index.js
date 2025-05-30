const express = require("express");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const cityRoute = require("./routes/city");
const specialtyRoute = require("./routes/specialty");
const subjectRoute = require("./routes/subject");
const universityRoute = require("./routes/university");
const { logger, logEvents } = require("./middleware/logger");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const port = 3300;

dotenv.config();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your API",
      version: "1.0.0",
    },
  },
  apis: ["routes/*.js"],
};

mongoose
  .connect(
    "mongodb+srv://nurrs:data@cluster0.njpnsaj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

app.use(logger);
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(
  cors({
    origin: "*", // or your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser());
const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/city", cityRoute);
app.use("/api/specialty", specialtyRoute);
app.use("/api/subject", subjectRoute);
app.use("/api/university", universityRoute);
app.get("/", (req, res) => {
  res.send("Hello from HelpAI backend");
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log("Backend server is running at:", port);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});

app.use(function (req, res) {
  return res.status(404).json({ message: "Endpoint not found" });
});

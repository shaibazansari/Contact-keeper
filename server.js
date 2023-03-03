const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const app = express();

dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 9001;

// connect database
connectDB();

// init middleware
app.use(express.json({ extended: false }));

// Define routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "client", "build", "index.html")));
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

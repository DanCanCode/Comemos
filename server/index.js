require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Body parsing middleware
app.use(bodyParser.json({ limit: "100mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(cors());

// Include our routes!
app.use("/api/users", require("./routes/users"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/recipes", require("./routes/recipes"));

app.use(express.static("./"));

// Send index.html for any other requests
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const error = new Error("Not found");
    res.status(404);
    next(error);
  } else {
    next();
  }
});

// Error handling endware
app.use((err, req, res, next) => {
  console.error(err, typeof next);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

// Server port and Mongoose DB connection
const PORT = process.env.PORT || 1337;
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on port: http://localhost:${PORT}`);
    })
  )
  .catch((error) => console.log(error.message));

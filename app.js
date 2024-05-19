const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const expensesRouter = require("./routes/expenses");
const userRouter = require("./routes/user");

dotenv.config({ path: "./config.env" });
const app = express();
const PORT = process.env.PORT || 3000;
const { Expense, Budget, User } = require("./models/model");
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.CONN_STR, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });
app.use("/api", expensesRouter);
app.use("/register", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

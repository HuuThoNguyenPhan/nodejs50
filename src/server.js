require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/mysql");
const app = express();
const apiRoutes = require("./routes/api");
app.use(express.json());
app.use("/api", apiRoutes);

connectDB();
const port = process.env.PORT || 3000;
app.listen(port, async () => {
  console.log(`Server run at http://localhost:${port}`);
});

const { DataSource } = require("typeorm");
const food = require("../models/food");
const food_type = require("../models/food_type");
const user = require("../models/user");
const order = require("../models/order");
const restaurent = require("../models/restaurent");
const like_res = require("../models/like_res");
const rate_res = require("../models/rate_res");

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT || "3306", 10),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  synchronize: false,
  logging: false,
  entities: [food, food_type, user, order, like_res, restaurent, rate_res],
  migrations: [],
  subscribers: [],
});

async function connectDB() {
  try {
    await AppDataSource.initialize();
    console.log("Database Connected");
  } catch (error) {
    console.error("Database Connection Error:", error);
  }
}

module.exports = { AppDataSource, connectDB };

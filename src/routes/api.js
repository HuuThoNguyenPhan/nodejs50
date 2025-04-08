const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");
const LikeController = require("../controllers/LikeController");
const RateController = require("../controllers/RateController");

router.post("/orders", (req, res) => OrderController.CreateOrderAsync(req, res));
router.post("/like/like-restaurent", (req, res) => LikeController.LikeRestaurentAsync(req, res));
router.get("/like/get-by-res-id", (req, res) => LikeController.GetLikesByResIdAsync(req, res));
router.get("/like/get-by-user-id", (req, res) => LikeController.GetLikesByUserIdAsync(req, res));

router.post("/rate/rate-restaurent", (req, res) => RateController.RateRestaurentAsync(req, res));
router.post("/rate/un-rate-restaurent", (req, res) => RateController.UnRateRestaurentAsync(req, res));
router.get("/rate/get-by-res-id", (req, res) => RateController.GetRatesByResIdAsync(req, res));
router.get("/rate/get-by-user-id", (req, res) => RateController.GetRatesByUserIdAsync(req, res));

module.exports = router;

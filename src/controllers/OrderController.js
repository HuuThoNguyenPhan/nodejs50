const { AppDataSource } = require("../config/mysql");
const { checkMissingField } = require('../utils/utils'); 

class OrderController {
  constructor() {
    this.foodRepository = AppDataSource.getRepository("Order");
  }

  async CreateOrderAsync(req, res) {
    try {
      if (!checkMissingField(res, req.body, ["user_id", "food_id"])) return;

      const orderData = { ...req.body, code: Date.now() };
      this.foodRepository.create(orderData);
      await this.foodRepository.save(orderData);
      return res.status(201).json({ data: true });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new OrderController();

const { AppDataSource } = require("../config/mysql");
const { checkMissingField } = require("../utils/utils");

class RateController {
  constructor() {
    this.rateResRepository = AppDataSource.getRepository("RateRes");
    this.userRepository = AppDataSource.getRepository("User");
    this.restaurentRepository = AppDataSource.getRepository("Restaurant");
  }

  async RateRestaurentAsync(req, res) {
    try {
      checkMissingField(res, req.body, ["user_id", "res_id", "amount"]);

      const inputData = req.body;
      if (inputData.amount <= 0) {
        return res.status(400).json({
          message: "amount value must be > 0!",
        });
      }

      if (
        !(await this.userRepository.findOne({
          where: { user_id: inputData.user_id },
        }))
      ) {
        return res.status(400).json({
          message: `Can not Found user with user_id = ${inputData.user_id}!`,
        });
      }

      if (
        !(await this.restaurentRepository.findOne({
          where: { res_id: inputData.res_id },
        }))
      ) {
        return res.status(400).json({
          message: `Can not Found restaurent with res_id = ${inputData.res_id}!`,
        });
      }

      let ratedData = await this.rateResRepository.findOne({
        where: {
          user_id: inputData.user_id,
          res_id: inputData.res_id,
        },
      });

      if (ratedData) {
        await this.rateResRepository.update(
          { user_id: ratedData.user_id, res_id: ratedData.res_id },
          { amount: inputData.amount, date_rate: new Date(), is_active: true }
        );
      } else {
        const newrate = this.rateResRepository.create(inputData);
        await this.rateResRepository.save(newrate);
      }

      return res.status(201).json({
        data: {
          message: `Rated restaurent with res_id = ${inputData.res_id}, amount = ${inputData.amount} successfull`,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async UnRateRestaurentAsync(req, res) {
    try {
      if (!checkMissingField(res, req.body, ["user_id", "res_id"])) return;

      const inputData = req.body;
      if (
        !(await this.userRepository.findOne({
          where: { user_id: inputData.user_id },
        }))
      ) {
        return res.status(400).json({
          message: `Can not Found user with user_id = ${inputData.user_id}!`,
        });
      }

      if (
        !(await this.restaurentRepository.findOne({
          where: { res_id: inputData.res_id },
        }))
      ) {
        return res.status(400).json({
          message: `Can not Found restaurent with res_id = ${inputData.res_id}!`,
        });
      }

      let ratedData = await this.rateResRepository.findOne({
        where: {
          user_id: inputData.user_id,
          res_id: inputData.res_id,
          is_active: true,
        },
      });

      if (ratedData) {
        await this.rateResRepository.update(
          { user_id: ratedData.user_id, res_id: ratedData.res_id },
          { is_active: false, date_rate: new Date() }
        );
      } else {
        return res.status(404).json({
          message: `Can not found data to Un rate!`,
        });
      }

      return res.status(200).json({
        data: {
          message: `Un Rated restaurent with res_id = ${inputData.res_id} successfull`,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async GetRatesByResIdAsync(req, res) {
    try {
      if (!checkMissingField(res, req.query, ["res_id"])) return;
      const res_id = req.query.res_id;
      let listRateRes = await this.rateResRepository.find({
        where: { res_id, is_active: true },
      });

      if (!listRateRes.length) {
        return res.status(200).json({ data: [] });
      }

      const restaurant = listRateRes[0].restaurant;
      const users = listRateRes.map((item) => ({
        date_rate: item.date_rate,
        user_id: item.user.user_id,
        full_name: item.user.full_name,
        amount: item.amount,
      }));

      return res.status(200).json({
        data: {
          ...restaurant,
          users,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async GetRatesByUserIdAsync(req, res) {
    try {
      if (!checkMissingField(res, req.query, ["user_id"])) return;
      const user_id = req.query.user_id;
      let listRateRes = await this.rateResRepository.find({
        where: { user_id, is_active: true },
      });

      if (!listRateRes.length) {
        return res.status(200).json({ data: [] });
      }

      const user = listRateRes[0].user;
      const users = listRateRes.map((item) => ({
        date_like: item.date_like,
        res_id: item.restaurant.res_id,
        res_name: item.restaurant.res_name,
        image: item.restaurant.image,
      }));

      return res.status(200).json({
        data: {
          ...{
            user_id: user.user_id,
            full_name: user.full_name,
            email: user.email,
          },
          users,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new RateController();

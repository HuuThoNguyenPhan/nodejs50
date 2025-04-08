const { AppDataSource } = require("../config/mysql");
const { checkMissingField } = require("../utils/utils");

class LikeController {
  constructor() {
    this.likeResRepository = AppDataSource.getRepository("LikeRes");
    this.userRepository = AppDataSource.getRepository("User");
    this.restaurentRepository = AppDataSource.getRepository("Restaurant");
  }

  async LikeRestaurentAsync(req, res) {
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

      let likedData = await this.likeResRepository.findOne({
        where: req.body,
      });

      let message = "";
      if (likedData) {
        let is_active = !likedData.is_active;
        await this.likeResRepository.update(
          {
            like_res_id: likedData.like_res_id,
          },
          { is_active, date_rate: new Date() }
        );
        is_active
          ? (message = `Liked restaurent with res_id = ${inputData.res_id} successfull`)
          : (message = `Un liked restaurent with res_id = ${inputData.res_id} successfull`);
      } else {
        const newLike = this.likeResRepository.create(inputData);
        await this.likeResRepository.save(newLike);
        message = `Liked restaurent with res_id = ${inputData.res_id} successfull`;
      }

      return res.status(200).json({
        data: {
          message,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async GetLikesByResIdAsync(req, res) {
    try {
      if (!checkMissingField(res, req.query, ["res_id"])) return;

      const res_id = req.query.res_id;
      let listLikeRes = await this.likeResRepository.find({
        where: { res_id, is_active: true },
      });

      if (!listLikeRes.length) {
        return res.status(200).json({ data: [] });
      }

      const restaurant = listLikeRes[0].restaurant;
      const users = listLikeRes.map((item) => ({
        date_like: item.date_like,
        user_id: item.user.user_id,
        full_name: item.user.full_name,
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

  async GetLikesByUserIdAsync(req, res) {
    try {
      if (!checkMissingField(res, req.query, ["user_id"])) return;

      const user_id = req.query.user_id;
      let listLikeRes = await this.likeResRepository.find({
        where: { user_id, is_active: true },
      });

      if (!listLikeRes.length) {
        return res.status(200).json({ data: [] });
      }

      const user = listLikeRes[0].user;
      const restaurents = listLikeRes.map((item) => ({
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
          restaurents,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new LikeController();

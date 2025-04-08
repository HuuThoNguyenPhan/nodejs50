const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "LikeRes",
  tableName: "like_res",
  columns: {
    user_id: {
      type: "int",
      primary: true,
    },
    res_id: {
      type: "int",
      primary: true,
    },
    date_like: {
      type: "datetime",
      default: () => "CURRENT_TIMESTAMP",
    },
    is_active: {
      type: "bool",
      default: true,
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: { name: "user_id" },
      eager: true,
    },
    restaurant: {
      type: "many-to-one",
      target: "Restaurant",
      joinColumn: { name: "res_id" },
      eager: true,
    },
  },
});

const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "RateRes",
  tableName: "rate_res",
  columns: {
    user_id: {
      type: Number,
      primary: true,
    },
    res_id: {
      type: Number,
      primary: true,
    },
    amount: {
      type: Number,
      nullable: false,
    },
    date_rate: {
      type: "datetime",
      createDate: true,
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

const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Order",
  tableName: "order",
  columns: {
    order_id: {
      type: "int",
      primary: true,
      generated: true,
    },
    user_id: {
      type: "int",
      nullable: false,
    },
    food_id: {
      type: "int",
      nullable: false,
    },
    amount: {
      type: "int",
      nullable: false,
    },
    code: {
      type: "varchar",
      length: 50,
      nullable: false,
    },
    arr_sub_id: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: { name: "user_id" },
      eager: true,
    },
    food: {
      type: "many-to-one",
      target: "Food",
      joinColumn: { name: "food_id" },
      eager: true,
    },
  },
});
const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "FoodType",
  tableName: "food_type",
  columns: {
    type_id: {
      type: "int",
      primary: true,
      generated: true,
    },
    type_name: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
  },
});
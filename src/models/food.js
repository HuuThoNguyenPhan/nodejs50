const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Food",
  tableName: "food",
  columns: {
    food_id: {
      type: "int",
      primary: true,
      generated: true,
    },
    food_name: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    image: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    price: {
      type: "float",
      nullable: false,
    },
    desc: {
      type: "varchar",
      length: 500,
      nullable: false,
    },
    type_id: {
      type: "int",
      nullable: false,
    },
  },
  relations: {
    food_type: {
      type: "many-to-one",
      target: "FoodType",
      joinColumn: { name: "type_id" },
      eager: true,
    },
  },
});
const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Restaurant",
  tableName: "restaurant",
  columns: {
    res_id: {
      type: "int",
      primary: true,
      generated: true,
    },
    res_name: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    image: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    desc: {
      type: "varchar",
      length: 500,
      nullable: false,
    },
  },
});

import { Sequelize } from "sequelize";

const db = new Sequelize("cahaya_db", "root", "FaridaRV(90)", {
  host: "127.0.0.1",
  dialect: "mysql",
  logging: false,
});

export default db;

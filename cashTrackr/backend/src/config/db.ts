import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config({ path: process.env.NODE_ENV === "test" ? ".env.test" : ".env" });

export const db = new Sequelize(process.env.DATABASE_URL, {
  models: [__dirname + "/../models/**/*"],
  dialectOptions:
    process.env.NODE_ENV === "test"
      ? {}
      : {
          ssl: {
            require: false,
          },
        },
});

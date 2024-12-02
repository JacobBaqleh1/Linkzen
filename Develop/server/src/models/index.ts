import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";
import { UserFactory } from "./user.js";
import { CardFactory } from "./cards.js";

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(
      process.env.DB_NAME || "",
      process.env.DB_USER || "",
      process.env.DB_PASSWORD,
      {
        host: "localhost",
        dialect: "postgres",
        dialectOptions: {
          decimalNumbers: true,
        },
      }
    );

const User = UserFactory(sequelize);
const Card = CardFactory(sequelize);

User.hasMany(Card, { foreignKey: "userId", as: "assignedCards" });
Card.belongsTo(User, { as: "assignedUser", foreignKey: "userId" });
export { sequelize, User, Card };

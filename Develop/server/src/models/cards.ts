import { DataTypes, Sequelize, Model, Optional } from "sequelize";
// import { User } from "./user";

interface CardAttributes {
  id: number;
  username: string;
  links: Array<{ url: string; description: string }>;
  userId?: number; // Foreign key
}

interface CardCreationAttributes extends Optional<CardAttributes, "id"> {}

export class Card
  extends Model<CardAttributes, CardCreationAttributes>
  implements CardAttributes
{
  public id!: number;
  public username!: string;
  public links!: Array<{ url: string; description: string }>;
  public userId?: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function CardFactory(sequelize: Sequelize): typeof Card {
  Card.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      links: {
        type: DataTypes.JSONB, // Use JSONB for storing array of objects
        allowNull: false,
        defaultValue: [],
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      tableName: "cards",
    }
  );
  return Card;
}

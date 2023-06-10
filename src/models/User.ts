import connection from "../db/conn";

import { Model, DataTypes } from "sequelize";

export interface UserInstance extends Model {
  id: number;
  name: string;
  email: string;
  password: string;
}

export const User = connection.define<UserInstance>(
  "Users",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },

    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "Users",
  }
);

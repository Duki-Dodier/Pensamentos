import connection from "../db/conn";

import { Model, DataTypes } from "sequelize";

export interface PensaInstance extends Model {
  title: string;
}

export const Pensamentos = connection.define<PensaInstance>(
  "Pensamentos",
  {
    title: {
      type: DataTypes.STRING,
    }
  },
  {
    tableName: "Pensamentos"  }
);

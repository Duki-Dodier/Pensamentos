import {
  Sequelize,
  ConnectionError,
  ValidationError,
  UniqueConstraintError,
  ForeignKeyConstraintError,
} from "sequelize";

const connection = new Sequelize("db_pensamentos", "root", "1234", {
  host: "localhost",
  dialect: "mariadb",
});

try {
  connection.authenticate();
  console.log("connexao Banco de Dados OK ✅");
} catch (err) {
  if (err instanceof ConnectionError) {
    console.error("Erro na conexão com o Banco de Dados:", err.message);
  } else if (err instanceof ValidationError) {
    console.error("Erro de validação do modelo:", err.message);
  } else if (err instanceof UniqueConstraintError) {
    console.error("Erro de violação de restrição única:", err.message);
  } else if (err instanceof ForeignKeyConstraintError) {
    console.error("Erro de violação de chave estrangeira:", err.message);
  }
}
export default connection
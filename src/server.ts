import express from "express";
import dotenv from "dotenv";
import path from "path";
import mustache from "mustache-express";
import mainRoutes from "./routes/mainRoutes";
import connection from "./db/conn";

dotenv.config();

const server = express();

//configurando mustache
server.set("view engine", "mustache");
server.set("views", path.join(__dirname, "views"));
server.engine("mustache", mustache());

//processar dados enviados por meio de formulários HTML com o método POST
server.use(express.urlencoded({ extended: true }));

//rotas
server.use(mainRoutes);
connection

server.listen(process.env.PORT, () => {
  console.log("✅server listening on port " + process.env.PORT);
});

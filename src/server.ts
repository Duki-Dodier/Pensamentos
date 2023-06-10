import express from "express";
import dotenv from "dotenv";
import path, { dirname } from "path";
import mustache from "mustache-express";
import mainRoutes from "./routes/mainRoutes";
import session from "express-session";
import FileStore from "session-file-store";
import bodyParser from "body-parser";

dotenv.config();

const FileStoreInstance = FileStore(session);

const server = express();

//configurando mustache
server.set("view engine", "mustache");
server.set("views", path.join(__dirname, "views"));
server.engine("mustache", mustache());

server.use(bodyParser.urlencoded({ extended: true }));

//session
server.use(
  session({
    name: "session",
    secret: "senhasecreta",
    resave: false,
    saveUninitialized: false,
    store: new FileStoreInstance({
      logFn: function () {},
      path: path.join(__dirname, "sessions"),
    }),
    cookie: {
      secure: false,
      maxAge: 3600,
      expires: new Date(Date.now() + 36000),
      httpOnly:true
    },
  })
);

// Configuração do middleware para servir arquivos estáticos da pasta 'public'
server.use(express.static("public"));

//processar dados enviados por meio de formulários HTML com o método POST
server.use(express.urlencoded({ extended: true }));

server.use(express.json());

//rotas
server.use(mainRoutes);

server.listen(process.env.PORT, () => {
  console.log("✅server listening on port " + process.env.PORT);
});

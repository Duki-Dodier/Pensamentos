import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import JWT from "jsonwebtoken";
import { SessionData } from "express-session";

// Definir uma interface personalizada para a sessão
declare module "express-session" {
  interface SessionData {
    authenticated?: boolean;
    user?: string;
  }
}

export const login = async (
  request: Request<SessionData>,
  response: Response
) => {
  //   const { email } = request.body;
  //   const senha = request.body.password;

  //   const salt = bcrypt.genSaltSync(8);
  //   const password = bcrypt.hashSync(senha, salt);

  const email = "dodier_duki@protonmail.com";
  const password =
    "$2a$08$xE8VhqfpF.XtC9tR86ZmgOqnWELTsw4J9QXn9nRhTI5fjKbVhaS36";

  const usuario = await User.findOne({ where: { email, password } });

  if (usuario) {
    request.session.authenticated = true;
    request.session.user = usuario.name;
    request.session.save(() => response.redirect("/priv"));
    return response.status(200);
  }

  return response.json({ mensagem: "email ou senha incorretos" });
};

export const home = async (
  request: Request<SessionData>,
  response: Response
) => {
  const name = request.session.user;
  return response.render("home", { name });
};

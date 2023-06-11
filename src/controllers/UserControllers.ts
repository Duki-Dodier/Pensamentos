import dotenv from "dotenv";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import { Pensamentos } from "../models/Pensamentos";
import JWT from "jsonwebtoken";
import { SessionData } from "express-session";

// Definir uma interface personalizada para a sessão
declare module "express-session" {
  interface SessionData {
    authenticated?: boolean;
    userid?: number;
  }
}

export const loginPage = async (
  request: Request<SessionData>,
  response: Response
) => {
  response.render("login");
};

export const login = async (
  request: Request<SessionData>,
  response: Response
) => {
  const { email } = request.body;
  const senha = request.body.password;

  const usuario = await User.findOne({ where: { email } });

  if (usuario) {
    const passwordMatch = await bcrypt.compare(
      senha,
      usuario?.password as string
    );

    if (passwordMatch) {
      request.session.authenticated = true;
      request.session.userid = usuario?.id;
      console.log("USERCONTROLLER.LOGIN" + request.session);
      request.session.save(() => response.redirect("/priv"));
      return response.status(200);
    } else {
      return response.redirect("/login");
    }
  }

  return response.redirect("/login");
};

export const home = async (
  request: Request<SessionData>,
  response: Response
) => {
  const data = await Pensamentos.findAll({ include: User });

  const pensamento2 = data.map((pensamento) => pensamento.get({ plain: true }));
  console.log(pensamento2);
  return response.render("home", { pensamento2 });
};

export const PageRegister = async (
  request: Request<SessionData>,
  response: Response
) => {
  response.render("register");
};

export const register = async (
  request: Request<SessionData>,
  response: Response
) => {
  const name = request.body.name;
  const email = request.body.email;
  const password = request.body.password;

  const salt = bcrypt.genSaltSync(8);
  const passwordHash = bcrypt.hashSync(password, salt);

  const usuario = await User.create({ name, email, password: passwordHash });

  request.session.authenticated = true;
  request.session.userid = usuario?.id;
  request.session.save(() => response.redirect("/priv"));
  return response.status(200);
};

export const pensamento = async (
  request: Request<SessionData>,
  response: Response
) => {
  const pensamento = request.body.pensamento;
  const usuario_id = request.session.userid;
  console.log("USERCONTROLLER.PENSAMENTO " + pensamento, usuario_id);

  const new_pensamento = await Pensamentos.create({
    title: pensamento,
    UserId: usuario_id,
  });
  return response.redirect("priv");
};

export const logout = async (
  request: Request<SessionData>,
  response: Response
) => {
  request.session.destroy((err) => {});
  return response.redirect("/login");
};

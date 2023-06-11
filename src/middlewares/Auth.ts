import { Response, Request, response, NextFunction } from "express";

import jwt, { JwtPayload, VerifyErrors, VerifyOptions } from "jsonwebtoken";
import { login } from "../controllers/UserControllers";
import { SessionData } from "express-session";

namespace Express {
  interface Request {
    email?: string;
  }
}

const secretKey = "1234";

export const Auth = (
  request: Request<SessionData>,
  response: Response,
  next: NextFunction
) => {
  console.log("AUTH"+request.session.authenticated)
  if (request.session.authenticated) {
    next();
  } else {
    response.render("login");
  }
};

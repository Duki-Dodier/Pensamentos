import { Router } from "express";

import * as UserControllers from "../controllers/UserControllers";
import {Auth} from "../middlewares/Auth";

const router = Router();

router.get("/login", UserControllers.loginPage);
router.post("/login", UserControllers.login);
router.get("/register", UserControllers.PageRegister);
router.post("/register", UserControllers.register);
router.get("/priv",Auth, UserControllers.home);

router.post("/pensamento",Auth, UserControllers.pensamento);

router.get("/logout",Auth,UserControllers.logout);

export default router;

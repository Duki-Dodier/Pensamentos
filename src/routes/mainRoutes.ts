import { Router } from "express";

import * as UserControllers from "../controllers/UserControllers";
import {Auth} from "../middlewares/Auth";

const router = Router();

router.get("/", UserControllers.login);
router.get("/priv", Auth, UserControllers.home);

export default router;

import { Router } from "express";

const router = Router();

router.get("/", (request, response) => {
  response.render("home");
});

export default router;

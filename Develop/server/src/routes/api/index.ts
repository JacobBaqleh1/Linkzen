import { Router } from "express";
import { userRouter } from "./user-routes.js";
import { cardRouter } from "./card-routes.js";

const router = Router();

router.use("/card", cardRouter);
router.use("/users", userRouter);

export default router;

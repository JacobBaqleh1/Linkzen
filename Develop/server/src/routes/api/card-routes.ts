import express from "express";
import { createCard, getCard } from "../../controllers/card-controller.js";
import { authenticateToken } from "../../middleware/auth.js";
const router = express.Router();

//GET /card
router.get("/", authenticateToken, getCard);

//Post /card - create a new ticket
router.post("/", createCard);

export { router as cardRouter };

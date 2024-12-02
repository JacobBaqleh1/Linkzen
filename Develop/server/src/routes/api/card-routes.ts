import express from "express";
import {
  createCard,
  getCard,
  getCardById,
  updateCard,
} from "../../controllers/card-controller.js";
import { authenticateToken } from "../../middleware/auth.js";
const router = express.Router();

//GET /card
router.get("/", authenticateToken, getCard);

// PUT /card - update an existing card
router.put("/:id", authenticateToken, updateCard);
router.get("/:id", authenticateToken, getCardById);
//Post /card - create a new ticket
router.post("/", createCard);

export { router as cardRouter };

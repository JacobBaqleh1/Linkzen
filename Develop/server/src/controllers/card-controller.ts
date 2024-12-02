import { Request, Response } from "express";
import { Card } from "../models/cards.js";
// import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
//GET
export const getCard = async (req: Request, res: Response) => {
  try {
    // Extract token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as {
        id: number;
      };
    } catch (error: any) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const userId = decoded.id;

    // Fetch the most recent card for the user using userId
    const card = await Card.findOne({
      where: { userId }, // Use userId to find the card
      order: [["createdAt", "DESC"]],
      attributes: ["id", "username", "links"],
    });

    return res.json(card);
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
// PUT
export const updateCard = async (req: Request, res: Response) => {
  const { username, links } = req.body;
  try {
    // Extract the user ID from the token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as {
      id: number;
    };
    const userId = decoded.id;

    // Find the card by userId and update it
    const card = await Card.findOne({ where: { userId } });
    if (!card) {
      return res.status(404).json({ message: "No card found for this user" });
    }

    card.username = username;
    card.links = links;
    await card.save();

    return res.json(card);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

//POST
export const createCard = async (req: Request, res: Response) => {
  const { username, links } = req.body;
  try {
    // Extract the user ID from the token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as {
      id: number;
    };

    const userId = decoded.id;
    const newCard = await Card.create({ username, links, userId });
    return res.status(201).json(newCard);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

// GET /card/:id - Fetch a specific card by ID
export const getCardById = async (req: Request, res: Response) => {
  const { id } = req.params; // Extract the card ID from the request parameters
  try {
    // Extract token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as {
        id: number;
      };
    } catch (error: any) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const userId = decoded.id;

    // Fetch the card by ID and ensure it belongs to the user
    const card = await Card.findOne({
      where: { id, userId }, // Ensure the card belongs to the user
      attributes: ["id", "username", "links"],
    });

    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    return res.json(card);
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

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
    console.log("Token received:", token);
    console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as {
        id: number;
      };
    } catch (error: any) {
      console.error("JWT Verification Error:", error.message);
      return res.status(401).json({ message: "Invalid token" });
    }

    const userId = decoded.id;

    // Fetch the most recent card for the user
    const card = await Card.findOne({
      where: { id: userId },
      order: [["createdAt", "DESC"]], // Sort by creation date in descending order
      attributes: ["id", "username", "links"], // Select only specific attributes
    });

    if (!card) {
      return res.status(404).json({ message: "No card found for this user" });
    }

    return res.json(card);
  } catch (error: any) {
    console.error("Error in getCard:", error.message);
    return res.status(500).json({ message: "Internal server error" });
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
    console.log("Decoded JWT:", decoded);
    const userId = decoded.id;
    const newCard = await Card.create({ username, links, userId });
    return res.status(201).json(newCard);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

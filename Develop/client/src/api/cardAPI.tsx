import { CardData } from "../interfaces/CardData";
// import { ApiMessage } from "../interfaces/ApiMessage";
import auth from "../utils/auth";

const createCard = async (body: CardData) => {
  try {
    const response = await fetch("api/card", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.getToken()}`,
      },
      body: JSON.stringify(body),
    });
    const data = response.json();

    if (!response.ok) {
      throw new Error("invalid API response, check network tab!");
    }
    return data;
  } catch (err) {
    console.log("Error from Ticket Creation: ", err);
    return Promise.reject("Could not create ticket");
  }
};

//get card
const retrieveCard = async (): Promise<CardData> => {
  try {
    const response = await fetch(`/api/card`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.getToken()}`,
      },
    });

    const data = await response.json();
    console.log("Response from API:", data);
    if (!response.ok) {
      throw new Error("Could not invalid API response, check network tab!");
    }
    return data;
  } catch (err) {
    console.log("Error from data retrieval: ", err);
    return Promise.reject("Could not fetch singular ticket");
  }
};
// Retrieve a card by ID
const getCardById = async (id: number): Promise<CardData> => {
  try {
    const response = await fetch(`/api/card/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.getToken()}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Invalid API response, check network tab!");
    }
    return data;
  } catch (err) {
    console.log("Error fetching card by ID: ", err);
    return Promise.reject("Could not fetch card by ID");
  }
};
const updateCard = async (id: number, body: CardData) => {
  try {
    const response = await fetch(`/api/card/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.getToken()}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Invalid API response, check network tab!");
    }
    return data;
  } catch (err) {
    console.log("Error from Card Update: ", err);
    return Promise.reject("Could not update card");
  }
};

export { createCard, retrieveCard, updateCard, getCardById };

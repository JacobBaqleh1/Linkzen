import { Card } from "../models/cards.js";
import { User } from "../models/user.js";

export const seedCards = async () => {
  try {
    const users = await User.findAll();
    const [user1] = users;

    //seed card
    await Card.bulkCreate([
      {
        username: "johnnykarate",
        links: [
          { url: "https://facebook.com", description: "Facebook" },
          { url: "https://google.com", description: "google" },
        ],
        userId: user1.id,
      },
    ]);

    console.log("card seeded successfully");
  } catch (error) {
    console.error("Error seeding cards:", error);
  }
};

import { seedUsers } from "./user-seeds.js";
import { sequelize } from "../models/index.js";
import { seedCards } from "./card-seeds.js";

const seedAll = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: true });
    console.log("\n----- DATABASE SYNCED -----\n");

    await seedUsers();
    console.log("\n----- USERS SEEDED -----\n");

    console.log("Seeding cards...");
    await seedCards();
    console.log("\n----- CARD SEEDED -----\n");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedAll();

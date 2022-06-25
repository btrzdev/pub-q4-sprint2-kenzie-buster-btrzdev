import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";

require("dotenv").config();

const databaseUrl: string = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("Missing DATABASE_URL env var");
}

export const AppDataSource = new DataSource({
  type: "postgres",
  url: databaseUrl,
  logging: true,
  entities: [path.join(__dirname, "/entities/**/*.{ts, js}")],
  migrations: [path.join(__dirname, "/migrations/**/*.{ts, js}")],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source Initialized");
  })
  .catch((err) => {
    console.log("Error during Data Source Initialization", err);
  });

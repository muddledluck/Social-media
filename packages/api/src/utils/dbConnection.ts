import mongoose from "mongoose";
import logger from "./logger";

export class Database {
  private mongoURI: string;
  constructor(uri: string) {
    this.mongoURI = uri;
  }
  connect() {
    mongoose
      .connect(this.mongoURI)
      .then(() => {
        logger.info("Database connection successful");
      })
      .catch((err) => {
        logger.error("Database connection error", err);
      });
  }
}

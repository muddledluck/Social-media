import mongoose from "mongoose";

export class Database {
  private mongoURI: string;
  constructor(uri: string) {
    this.mongoURI = uri;
  }
  connect() {
    mongoose
      .connect(this.mongoURI)
      .then(() => {
        console.log("Database connection successful");
      })
      .catch((err) => {
        console.log("Database connection error", err);
      });
  }
}

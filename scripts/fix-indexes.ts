import mongoose from "mongoose";
import { connectDB } from "../lib/db";

async function fixIndexes() {
  try {
    await connectDB();
    
    // Get the User collection
    const userCollection = mongoose.connection.collection("users");
    
    // Drop all existing indexes
    await userCollection.dropIndexes();
    
    // Create the correct indexes
    await userCollection.createIndex({ email: 1 }, { unique: true });
    await userCollection.createIndex({ company: 1 });
    
    console.log("Indexes have been reset successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error fixing indexes:", error);
    process.exit(1);
  }
}

fixIndexes();
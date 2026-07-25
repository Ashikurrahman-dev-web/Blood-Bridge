import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
const client = new MongoClient(process.env.MONGODB_URI,)
const db = client.db(process.env.MONGODB_DB_NAME);

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL, 
  database: mongodbAdapter(db), 
  
  emailAndPassword: { 
    enabled: true, 
  }, 
   user: {
    additionalFields: {
      bloodGroup: {
        type: "string",
      },
      district: {
        type: "string",
      },
      upazila: {
        type: "string",
      },
      role: {
        type: "string",
        defaultValue: "donor",
      },
      status: {
        type: "string",
        defaultValue: "active",
      },
    },
  },
});
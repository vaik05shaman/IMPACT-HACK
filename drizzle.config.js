import "dotenv/config"; // Ensure environment variables are loaded
import { defineConfig } from "drizzle-kit";


export default defineConfig({
  out: "./drizzle",
  schema: "./configs/schema.jsx", // Ensure correct path
  dialect: "postgresql",
  dbCredentials: {
    url: 'postgresql://AI-GEN_owner:npg_P8lDXy6HQjgc@ep-round-mouse-a50jzbeq.us-east-2.aws.neon.tech/AI-GEN?sslmode=require'|| (() => { 
      throw new Error(" DATABASE_URL is missing. Check your .env.local file.");
    })(),
  },
});

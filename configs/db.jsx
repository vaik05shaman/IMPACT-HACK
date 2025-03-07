import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon('postgresql://AI-GEN_owner:npg_P8lDXy6HQjgc@ep-round-mouse-a50jzbeq.us-east-2.aws.neon.tech/AI-GEN?sslmode=require');
export const db = drizzle(sql);

import { MongoClient, Db } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is not defined in .env.local ❌");
}

let cachedClient: MongoClient | null = null;

// ✅ Connect to MongoDB
export async function connectToDatabase(): Promise<Db> {
  if (cachedClient) return cachedClient.db("customatoDB");

  const client = new MongoClient(MONGODB_URI as string); // ✅ Ensure it's a string
  await client.connect();
  cachedClient = client;

  return client.db("customatoDB");
}

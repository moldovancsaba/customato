import { MongoClient, ObjectId, Db, Document, WithId, UpdateResult } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in .env.local");
}

let cachedClient: MongoClient | null = null;

export async function connectToDatabase(): Promise<Db> {
  if (cachedClient) return cachedClient.db("customatoDB");

  const client = new MongoClient(MONGODB_URI as string);
  await client.connect();
  cachedClient = client;

  return client.db("customatoDB");
}

// ✅ Define strict types for Card
type CardType = {
  id: string;
  text: string;
  column: string;
  order: number;
  updatedAt: string;
};

// ✅ Ensure all cards have `id`
async function normalizeCards(cards: WithId<Document>[], db: Db): Promise<CardType[]> {
  const updates: Promise<UpdateResult>[] = [];  // ✅ Explicitly define the type of `updates`

  const normalizedCards: CardType[] = cards.map((card) => {
    let isUpdated = false;

    // ✅ Ensure `id` exists, using MongoDB's `_id`
    const id = card.id ? String(card.id) : card._id.toString();
    if (!card.id) isUpdated = true;

    // ✅ Ensure `text`, `column`, `order`, `updatedAt` exist
    const text = card.text ? String(card.text) : "Untitled Card";
    const column = card.column ? String(card.column) : "To Do";
    const order = typeof card.order === "number" ? card.order : 0;
    const updatedAt = card.updatedAt ? new Date(card.updatedAt).toISOString() : new Date().toISOString();

    if (!card.updatedAt) isUpdated = true;

    if (isUpdated) {
      updates.push(
        db.collection("cards").updateOne(
          { _id: card._id },
          { $set: { id, text, column, order, updatedAt } }
        )
      );
    }

    return { id, text, column, order, updatedAt };
  });

  if (updates.length > 0) await Promise.all(updates);

  return normalizedCards;
}

// ✅ GET /api/cards - Fetch all cards and normalize data
export async function loadCards(): Promise<CardType[]> {
  try {
    const db = await connectToDatabase();
    const cards = await db.collection("cards").find().toArray();

    return await normalizeCards(cards, db);
  } catch (error: unknown) {
    throw new Error("Error fetching cards: " + error);
  }
}

// ✅ POST /api/cards - Add a new card
export async function addCardToDB(text: string, column: string): Promise<{ message: string; id: string }> {
  try {
    const db = await connectToDatabase();
    const newCard: CardType = {
      id: new ObjectId().toString(), // ✅ Generate a new ObjectId
      text,
      column,
      order: 0,
      updatedAt: new Date().toISOString(),
    };

    await db.collection("cards").insertOne(newCard);
    return { message: "Card created successfully", id: newCard.id };
  } catch (error: unknown) {
    throw new Error("Error adding card: " + error);
  }
}

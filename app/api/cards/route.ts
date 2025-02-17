import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

// GET /api/cards - Fetch all cards
export async function GET() {
  try {
    const db = await connectToDatabase();
    const cards = await db.collection("cards").find().toArray();
    return NextResponse.json(cards);
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ message: "Error fetching cards", error: err.message }, { status: 500 });
  }
}

// POST /api/cards - Add a new card
export async function POST(req: Request) {
  try {
    const { text, column } = await req.json();
    if (!text || !column) return NextResponse.json({ message: "Invalid input" }, { status: 400 });

    const db = await connectToDatabase();
    const result = await db.collection("cards").insertOne({
      text,
      column,
      updatedAt: new Date().toISOString() // ✅ Ensure `updatedAt` is set
    });

    return NextResponse.json({ message: "Card created successfully", id: result.insertedId });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ message: "Error adding card", error: err.message }, { status: 500 });
  }
}

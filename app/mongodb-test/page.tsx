"use client";

import { useState, useEffect } from "react";

// ✅ Define CardType
type CardType = {
  id: string;
  text: string;
  column: string;
  order: number;
  updatedAt: string;
};

export default function MongoDBTest() {
  const [cards, setCards] = useState<CardType[]>([]);

  useEffect(() => {
    fetch("/api/cards")
      .then((res) => res.json())
      .then((data: CardType[]) => {
        setCards(
          data.map((card: CardType) => ({
            ...card,
            updatedAt: card.updatedAt ? new Date(card.updatedAt).toLocaleString() : "No Date",
          }))
        );
      })
      .catch((err) => console.error("⚠ Failed to load MongoDB data:", err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">MongoDB Test Page</h1>
      <ul className="mt-4">
        {cards.length === 0 ? (
          <p>No data found in MongoDB.</p>
        ) : (
          cards.map((card) => (
            <li key={card.id} className="border p-2 my-2">
              <p><strong>{card.text}</strong></p>
              <p>ID: {card.id}</p>
              <p>Column: {card.column}</p>
              <p>Order: {card.order}</p>
              <p>Last Updated: {card.updatedAt}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

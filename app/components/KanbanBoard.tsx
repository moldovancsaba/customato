"use client";

import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useRouter } from "next/navigation"; // ✅ Add router for navigation
import Column from "./Column";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import generateUniqueId from "../../lib/generateUniqueId"; // ✅ Ensure correct import

type CardType = { id: string; text: string; column: string; updatedAt: string };

const initialColumns = ["To Do", "In Progress", "Review", "Done"];

const KanbanBoard = () => {
  const router = useRouter(); // ✅ Use router to navigate
  const [cards, setCards] = useState<CardType[]>([]);

  const addCard = () => {
    const newCard = {
      id: generateUniqueId(),
      text: "New Card",
      column: "To Do",
      updatedAt: new Date().toISOString(),
    };
    setCards([...cards, newCard]);
  };

  const moveCard = (id: string, fromColumn: string, toColumn: string) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, column: toColumn, updatedAt: new Date().toISOString() } : card
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4 flex gap-4">
        <Button variant="contained" startIcon={<Add />} onClick={addCard}>
          Add Card
        </Button>
        <Button variant="outlined" onClick={() => router.push("/mongodb-test")}>
          Test MongoDB
        </Button> 
      </div>
      <div className="flex justify-between p-4">
        {initialColumns.map((col) => (
          <Column key={col} title={col} cards={cards.filter((card) => card.column === col)} moveCard={moveCard} />
        ))}
      </div>
    </DndProvider>
  );
};

export default KanbanBoard;

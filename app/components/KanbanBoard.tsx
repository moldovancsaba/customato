"use client";

import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "./Column";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";

type CardType = { id: string; text: string; column: string };

const initialColumns = ["To Do", "In Progress", "Review", "Done"];

const KanbanBoard = () => {
  const [cards, setCards] = useState<CardType[]>([]);

  const addCard = () => {
    setCards([...cards, { id: Date.now().toString(), text: "New Task", column: "To Do" }]);
  };

  const moveCard = (id: string, fromColumn: string, toColumn: string) => {
    setCards((prevCards) =>
      prevCards.map((card) => (card.id === id ? { ...card, column: toColumn } : card))
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4">
        <Button variant="contained" startIcon={<Add />} onClick={addCard}>
          Add Task
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

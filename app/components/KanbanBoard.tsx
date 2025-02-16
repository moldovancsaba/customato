"use client";
import "../styles/KanbanBoard.css";

import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import Column from "./Column";

const initialColumns = ["To Do", "In Progress", "Review", "Done"];

const KanbanBoard = () => {
  const [cards, setCards] = useState([]);

  const addCard = () => {
    const newCard = {
      id: Date.now(),
      text: `Task ${cards.length + 1}`,
      column: "To Do",
    };
    setCards([...cards, newCard]);
  };

  const moveCard = (cardId, fromColumn, toColumn) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, column: toColumn } : card
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="kanban-board">
        <div className="kanban-header">
          <Button variant="contained" startIcon={<Add />} onClick={addCard}>
            Add Task
          </Button>
        </div>
        <div className="kanban-columns">
          {initialColumns.map((title) => (
            <Column
              key={title}
              title={title}
              cards={cards.filter((card) => card.column === title)}
              moveCard={moveCard}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default KanbanBoard;

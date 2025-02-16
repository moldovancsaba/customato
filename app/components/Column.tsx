"use client";

import { useDrop } from "react-dnd";
import Card from "./Card";

const Column = ({ title, cards, moveCard }) => {
  const [, drop] = useDrop({
    accept: "CARD",
    drop: (item) => moveCard(item.id, item.column, title),
  });

  return (
    <div ref={drop} className="kanban-column">
      <h2>{title}</h2>
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};

export default Column;

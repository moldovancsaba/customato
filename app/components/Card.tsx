"use client";

import { useDrag } from "react-dnd";

const Card = ({ card }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { id: card.id, text: card.text, column: card.column },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className="kanban-card"
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
      }}
    >
      {card.text}
    </div>
  );
};

export default Card;

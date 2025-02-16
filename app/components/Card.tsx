"use client";

import { useDrag } from "react-dnd";
import { FC, useRef } from "react";

type CardProps = {
  card: { id: string; text: string; column: string };
};

const Card: FC<CardProps> = ({ card }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "CARD",
    item: { id: card.id, text: card.text, column: card.column },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  drag(ref);

  return (
    <div
      ref={ref}
      className="bg-white p-2 my-2 shadow-md cursor-pointer rounded"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {card.text}
    </div>
  );
};

export default Card;

"use client";

import { useDrag } from "react-dnd";
import { FC, useRef } from "react";

type CardProps = {
  card: { id: string; text: string; column: string; updatedAt: string };
};

const Card: FC<CardProps> = ({ card }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "CARD",
    item: { id: card.id, text: card.text, column: card.column, updatedAt: card.updatedAt },
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
      <p className="font-bold">{card.text}</p>  {/* ✅ Display Card Name */}
      <p className="text-xs text-gray-500">{card.id}</p>  {/* ✅ Display Unique ID */}
      <p className="text-xs text-gray-400">
        last updated on {new Date(card.updatedAt).toLocaleString("en-US", { dateStyle: "long", timeStyle: "short" })}
      </p> {/* ✅ Display Formatted Timestamp */}
    </div>
  );
};

export default Card;

"use client";

import { FC, useRef } from "react";
import { useDrop } from "react-dnd";
import Card from "./Card";

type ColumnProps = {
  title: string;
  cards: { id: string; text: string; column: string }[];
  moveCard: (id: string, fromColumn: string, toColumn: string) => void;
};

const Column: FC<ColumnProps> = ({ title, cards, moveCard }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: "CARD",
    drop: (item: { id: string; text: string; column: string }) => {
      if (item.column !== title) {
        moveCard(item.id, item.column, title);
      }
    },
  });

  drop(ref); // Attach drop function to the ref

  return (
    <div ref={ref} className="flex flex-col w-1/4 bg-gray-200 p-2 rounded">
      <h2 className="font-bold text-lg">{title}</h2>
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};

export default Column;

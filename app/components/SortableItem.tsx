"use client";

import { useDraggable } from "@dnd-kit/core";

type CardType = {
  id: string;
  text: string;
  column: string;
};

export default function SortableItem({ card }: { card: CardType }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: card.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-white p-2 my-2 shadow-md cursor-pointer rounded"
    >
      {card.text}
    </div>
  );
}

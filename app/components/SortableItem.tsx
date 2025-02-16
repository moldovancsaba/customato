"use client";

import { Card, CardContent } from "@mui/material";
import { useDraggable } from "@dnd-kit/core";

export default function SortableItem({ card }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: card.id,
  });

  return (
    <Card
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="kanban-card"
      style={{ transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : "" }}
    >
      <CardContent>{card.content}</CardContent>
    </Card>
  );
}

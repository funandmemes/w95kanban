import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";

import SortableItem from "./SortableItem";

import "./Droppable.css";

const Droppable = ({
  id,
  items,
  onMoveNext,
  onMoveBack,
  onDelete,
  containerId }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
      <ul className="droppable" ref={setNodeRef}>
        {items.map((item) => (
          <SortableItem key={item}
            id={item}
            onMoveNext={onMoveNext}
            onMoveBack={onMoveBack} 
            onDelete={onDelete}
            containerId={containerId}
          />
        ))}
      </ul>
    </SortableContext>
  );
};

export default Droppable;

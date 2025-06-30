import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import Item from "./Item";

const SortableItem = ({ id, onMoveNext, onMoveBack, onDelete, containerId }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  return (
    <li style={style} ref={setNodeRef}>
      <Item id={id}
      dragOverlay={isDragging}
      listeners={listeners}
      attributes={attributes}
      onMoveNext={onMoveNext}
      onMoveBack={onMoveBack}
      onDelete={onDelete}
      containerId={containerId}/>
    </li>
  );
};

export default SortableItem;

import React from "react";

import "./Item.css"

const Item = ({
  id,
  dragOverlay,
  listeners, attributes,
  onMoveNext,
  onMoveBack,
  onDelete,
  containerId
}) => {
  const style = {
    cursor: dragOverlay ? "grabbing" : "grab",
  };

  const handleButtonMouseDown = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <div className="item">
        <div className="title"  {...listeners} {...attributes}>
          <img id="itemicon" src="/assets/info.ico"/>
          <button
            id="closebtn"
            onClick={() => onDelete(containerId, id)}
            onMouseDown={handleButtonMouseDown}
            onTouchStart={handleButtonMouseDown}
          ><label>X</label></button>
        </div>
        <div className="content">{id}</div>
        <div className="button-container">
          <button onClick={() => onMoveBack(containerId, id)}>&lt; Voltar</button>
          <button onClick={() => onMoveNext(containerId, id)}>Próximo &gt;</button>
        </div>
      </div>
    </>
  );
};

export default Item;

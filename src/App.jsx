import React, { useState, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import Droppable from "./components/Droppable";
import Item from "./components/Item";
import Board from "./components/Board";
import { arrayMove, insertAtIndex, removeAtIndex } from "./utils/array";
import Desktop from "./components/Desktop"
import Footer from "./components/Footer"


import "./App.css"

export function App() {
  const [itemGroups, setItemGroups] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/1");
        const data = await response.json();
        setItemGroups(data);
      } catch (error) {
        console.error("Erro ao carregar:", error);
      }
    };

    fetchData();
  }, []);

  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleSaveClick = () => saveToDatabase(itemGroups);

  const saveToDatabase = async (state) => {
    try {
      const state2 = await fetch("http://localhost:3001/1");
      const data = await state2.json();
      console.log("Enviando estado:", data);
      setItemGroups(data);
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragCancel = () => setActiveId(null);

  const handleDragOver = ({ active, over }) => {
    const overId = over?.id;

    if (!overId) {
      return;
    }


    const activeContainer = active.data.current.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || over.id;

    if (activeContainer !== overContainer) {
      setItemGroups((itemGroups) => {
        const activeIndex = active.data.current.sortable.index;
        const overIndex =
          over.id in itemGroups
            ? itemGroups[overContainer].length + 1
            : over.data.current.sortable.index;

        return moveBetweenContainers(
          itemGroups,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          active.id
        );
      });
    }
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over) {
      setActiveId(null);
      return;
    }

    if (active.id !== over.id) {
      const activeContainer = active.data.current.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;
      const activeIndex = active.data.current.sortable.index;
      const overIndex =
        over.id in itemGroups
          ? itemGroups[overContainer].length + 1
          : over.data.current.sortable.index;

      setItemGroups((itemGroups) => {
        let newItems;
        if (activeContainer === overContainer) {
          newItems = {
            ...itemGroups,
            [overContainer]: arrayMove(
              itemGroups[overContainer],
              activeIndex,
              overIndex
            ),
          };
        } else {
          newItems = moveBetweenContainers(
            itemGroups,
            activeContainer,
            activeIndex,
            overContainer,
            overIndex,
            active.id
          );
        }

        return newItems;
      });
    }

    setActiveId(null);
  };

  const handleDelete = (activeContainer, activeId) => {
    const activeIndex = itemGroups[activeContainer].indexOf(activeId);

    setItemGroups((itemGroups) => {
      return {
        ...itemGroups,
        [activeContainer]: removeAtIndex(itemGroups[activeContainer], activeIndex)
      };
    });
  };

  const handleMoveNext = (
    activeContainer,
    activeId
  ) => {
    const keys = Object.keys(itemGroups);
    const activeContainerIndex = keys.indexOf(activeContainer)
    const nextContainer =
      activeContainerIndex < keys.length - 1
        ? keys[activeContainerIndex + 1]
        : activeContainer
    if (activeContainer == nextContainer) return;
    const activeIndex = itemGroups[activeContainer].indexOf(activeId)
    const nextIndex = itemGroups[nextContainer].length

    setItemGroups((itemGroups) =>
      moveBetweenContainers(itemGroups, activeContainer, activeIndex, nextContainer, nextIndex, activeId)
    );
  }

  const handleMoveBack = (
    activeContainer,
    activeId
  ) => {
    const keys = Object.keys(itemGroups);
    const activeContainerIndex = keys.indexOf(activeContainer)
    const previousContainer =
      activeContainerIndex > 0
        ? keys[activeContainerIndex - 1]
        : activeContainer
    if (activeContainer == previousContainer) return;
    const activeIndex = itemGroups[activeContainer].indexOf(activeId)
    const previousIndex = itemGroups[previousContainer].length

    setItemGroups((itemGroups) =>
      moveBetweenContainers(itemGroups, activeContainer, activeIndex, previousContainer, previousIndex, activeId)
    );
  }

  const moveBetweenContainers = (
    items,
    activeContainer,
    activeIndex,
    overContainer,
    overIndex,
    item
  ) => {
    return {
      ...items,
      [activeContainer]: removeAtIndex(items[activeContainer], activeIndex),
      [overContainer]: insertAtIndex(items[overContainer], overIndex, item),
    };
  };

  return (
    <div className="page">
        <Desktop></Desktop>
          
          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragCancel={handleDragCancel}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            <div className="container">
              {Object.keys(itemGroups).map((group) => (
                <div className={`group-wrapper ${group}`}>
                  <label>{group}</label>
                  <Droppable
                    id={group}
                    items={itemGroups[group]}
                    activeId={activeId}
                    onMoveNext={handleMoveNext}
                    onMoveBack={handleMoveBack}
                    onDelete={handleDelete}
                    key={group}
                    containerId={group}
                  />
                </div>
              ))}
            </div>
            <DragOverlay>
              {activeId ? <Item id={activeId} dragOverlay /> : null}
            </DragOverlay>
          </DndContext> 
          
      
      <div className="button-wrapper">
            
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;

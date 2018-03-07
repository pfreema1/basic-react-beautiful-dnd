import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CardDraggable from './CardDraggable';

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightyellow' : 'lightgrey',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '8px',
  overflow: 'auto',
  height: '30vh'
});

const CardSelectorDroppable = ({ cards }) => {
  return (
    <Droppable
      isDropDisabled="true" //can't be dropped on but has draggables
      droppableId="droppable"
      direction="horizontal"
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
          {...provided.droppableProps}
        >
          {cards.map((card, index) => (
            <CardDraggable key={index} card={card} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default CardSelectorDroppable;

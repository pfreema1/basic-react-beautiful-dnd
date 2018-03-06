import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Card from '../Containers/Card';

const getItemStyle = (isDragging, draggableStyle) => ({
  // change background colour if dragging
  background: isDragging ? 'lightyellow' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle
});

const CardDraggable = ({ card, index }) => {
  return (
    <Draggable key={card.name} draggableId={card.name} index={index}>
      {(provided, snapshot) => (
        <div>
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            // style={getItemStyle(
            //   snapshot.isDragging,
            //   provided.draggableProps.style
            // )}
          >
            <Card
              isDragging={snapshot.isDragging}
              key={index}
              cardIndex={index}
            />
          </div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
};

export default CardDraggable;

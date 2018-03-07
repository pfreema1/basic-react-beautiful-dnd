import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CardView from './CardView';

const getItemStyle = (isDragging, draggableStyle) => ({
  // change background colour if dragging
  background: isDragging ? 'lightyellow' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle
});

const BuilderCardDraggable = ({ card, index }) => {
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
            <CardView
              name={card.name}
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

export default BuilderCardDraggable;

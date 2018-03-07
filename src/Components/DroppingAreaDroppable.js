import React from 'react';
import ColorPalette from '../ColorPalette';
import BuilderCardDraggable from './BuilderCardDraggable';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const styling = {
  width: '80vw',
  height: '150px',
  borderRadius: '10px',

  background: ColorPalette.third,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  color: 'white',
  transition: 'all 0.5s'
};

const getStyling = isDraggingOver => ({
  ...styling,
  border: isDraggingOver ? '8px solid white' : '5px dashed white'
});

const DroppingAreaDroppable = ({ droppedCards }) => (
  <Droppable droppableId="builderDroppable" direction="horizontal">
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        style={getStyling(snapshot.isDraggingOver)}
        {...provided.droppableProps}
      >
        {droppedCards.map((droppedCard, index) => (
          <BuilderCardDraggable key={index} index={index} card={droppedCard} />
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

export default DroppingAreaDroppable;

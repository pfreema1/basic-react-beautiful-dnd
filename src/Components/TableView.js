import React from 'react';
import ColorPalette from '../ColorPalette';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const styling = {
  width: '100vw',
  height: '70vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: ColorPalette.first
};

const TableView = props => <div style={styling}>{props.children}</div>;

export default TableView;

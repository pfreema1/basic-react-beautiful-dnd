import React from 'react';
import ColorPalette from '../ColorPalette';

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

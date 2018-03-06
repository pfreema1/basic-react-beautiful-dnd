import React from 'react';
import ColorPalette from '../ColorPalette';

const styling = {
  width: '200px',
  height: '70px',
  background: ColorPalette.fourth,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  // position: "absolute",
  borderRadius: '5px',
  color: 'white',
  cursor: 'move',
  border: '1px solid skyblue'
};

const CardView = ({ name }) => <div style={{ ...styling }}>name: {name}</div>;

export default CardView;

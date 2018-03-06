import React from "react";
import ColorPalette from "../ColorPalette";
import CardView from "./CardView";

const styling = {
  width: "80vw",
  height: "150px",
  borderRadius: "10px",
  border: "5px dashed white",
  background: ColorPalette.third,
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  color: "white",
  transition: "all 0.5s"
};

const DroppingAreaView = ({ droppedCards }) => (
  <div style={styling}>
    {droppedCards.map((droppedCard, index) => (
      <CardView key={index} name={droppedCard.name} />
    ))}
  </div>
);

export default DroppingAreaView;

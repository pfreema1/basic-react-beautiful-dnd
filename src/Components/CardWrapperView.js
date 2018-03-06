import React from "react";

const styling = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  top: "0",
  width: "100vw",
  height: "100px"
};

const CardWrapperView = props => {
  return <div style={styling}>{props.children}</div>;
};

export default CardWrapperView;

import React from "react";
import animate from "./animation.css";

function Circle({ x, y, diameter, color, delay }) {
  const style = {
    position: "absolute",
    backgroundColor: color,
    height: diameter,
    width: diameter,
    border: "1px solid",
    top: y,
    left: x,
    borderRadius: "50%",
    opacity: 0,
    animation: `goLeft 2s linear ${delay}`,
    animationFillMode: "forwards",
  };

  return <div style={style}></div>;
}

export default Circle;

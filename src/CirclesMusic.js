import React from "react";
import Circle from "./Circle";
import { getRandomInt } from "./functions";

function CirclesMusic({ circles }) {
  // const circles = Array(500)
  //   .fill(null)
  //   .map(() => {
  //     return {
  //       x: "70vw",
  //       y: `${getRandomInt(50, 900)}px`,
  //       diameter: `${getRandomInt(20, 150)}px`,
  //       color: `rgb(${getRandomInt(0, 255)},${getRandomInt(
  //         0,
  //         255
  //       )},${getRandomInt(0, 255)})`,
  //     };
  //   });

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        backgroundColor: "#FFF9CD",
      }}
    >
      {circles.map((circleArray, mainIndex) =>
        circleArray.map((circle, index) => (
          <Circle key={index * mainIndex + Math.random()} {...circle} />
        ))
      )}
    </div>
  );
}

export default CirclesMusic;

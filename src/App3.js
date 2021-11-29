import React, { useState } from "react";
import { arrayBufferToBase64, getRandomInt } from "./functions";
import CirclesMusic from "./CirclesMusic";

const App3 = () => {
  const [startPlayer, setstartPlayer] = useState(false);
  const [circles, setCircles] = useState([[]]);
  const [fl, setFile] = useState(undefined);

  const deltaToMiliseconds = (deltaTime, tempo) => {
    // const MICROSECONDS_PER_MINUTE = 60000000;
    // const ms =
    //   deltaTime *
    //   (1000.0 * (60.0 / ((MICROSECONDS_PER_MINUTE / tempo) * 0.05)));
    return deltaTime;
  };

  const readMidi = (e) => {
    const file = e.target.files[0];
    let midiParser = require("midi-parser-js");
    let reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function (evt) {
      const base64 = arrayBufferToBase64(evt.target.result);
      var midiArray = midiParser.parse(base64);

      console.log(midiArray);

      const timeDivision = midiArray.timeDivision;

      const tracksWithAvailableNotes = midiArray.track.map((track) =>
        track.event.filter((e) => e.type === 8 || e.type === 9)
      );

      const trackCircles = tracksWithAvailableNotes.map((track, index) => {
        let elapsedTime = 2000;
        return track.map((event) => {
          elapsedTime +=
            deltaToMiliseconds(event.deltaTime, timeDivision) * 1.035;
          return {
            x: "70vw",
            y: `${800 - event.data[0] * 12}px`, //`${100 * index}px`, //`${getRandomInt(50, 900)}px`,
            diameter: `${event.data[1] * 2}px`, //"80px", //`${getRandomInt(20, 150)}px`,
            color: `rgb(${getRandomInt(0, 255)},${getRandomInt(
              0,
              255
            )},${getRandomInt(0, 255)})`,
            delay: `${elapsedTime}ms`,
          };
        });
      });

      console.log(trackCircles);
      //MIDIjs.play("C:/Users/jose.gomes/Documents/MIDI_sample.mid");

      setCircles(trackCircles);
      setFile(file);
      setstartPlayer(true);
    };
  };

  const element = startPlayer ? (
    <CirclesMusic circles={circles} />
  ) : (
    <form>
      <input onChange={readMidi} type="file" accept=".mid" />
    </form>
  );
  return element;
};

export default App3;

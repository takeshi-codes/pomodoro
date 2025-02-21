import { useState, useEffect } from "react";
import useSound from "use-sound";
import tomato from "/tomato.svg";
import tamato from "/tamato.png";
import "./App.css";

function App() {
  const [time, setTime] = useState(1500);
  const [workCycles, setWorkCyles] = useState(0);
  const [breakCycles, setBreakCycles] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isFirstTimer, setIsFirstTimer] = useState(true);

  const [playBreakFx] = useSound("/break.wav", {
    volume: 0.25,
  });

  const [playWorkFx] = useSound("/work.wav", {
    volume: 0.25,
  });

  const [playBigBreakFx] = useSound("/big_break.wav", {
    volume: 0.25,
  });

  useEffect(() => {
    if (!isRunning) return;
    if (time === 0) {
      if (isFirstTimer) {
        setWorkCyles((workCycles) => workCycles + 1);
        if (breakCycles % 3 === 0 && breakCycles !== 0) {
          playBigBreakFx();
        } else {
          playBreakFx();
        }
      } else {
        setBreakCycles((breakCycles) => breakCycles + 1);
        playWorkFx();
      }

      if (breakCycles % 3 === 0 && breakCycles !== 0) {
        setIsFirstTimer((prev) => !prev);
        setTime(1800);
      } else {
        setIsFirstTimer((prev) => !prev);
        setTime(isFirstTimer ? 300 : 1500);
      }
    }

    const interval = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : prevTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [time, isRunning, isFirstTimer]);

  return (
    <>
      <div>
        <img src={tamato} className="logo" alt="Vite logo" />
      </div>
      <h1>
        {`${Math.floor(time / 60)}`.padStart(2, 0)}:
        {`${time % 60}`.padStart(2, 0)}
      </h1>
      <div className="card">
        <button onClick={() => setIsRunning((prev) => !prev)}>
          {isRunning ? "Pause" : "Start"} Timer
        </button>
      </div>
      <p>Works: {workCycles}</p>
      <p>Breaks: {breakCycles}</p>
    </>
  );
}

export default App;

import { useEffect, useState } from "react";

function Timer({ quastionNumber, setStop, setDangerTime }) {
  const [timer, setTimer] = useState(30);
  useEffect(() => {
    timer < 10 ? setDangerTime(true) : setDangerTime(false);
    if (timer === 0) return setStop(true);
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, [1000]);
    return () => clearInterval(interval);
  }, [setStop, timer, setDangerTime]);

  useEffect(() => {
    setTimer(30);
  }, [quastionNumber]);
  return timer;
}

export default Timer;

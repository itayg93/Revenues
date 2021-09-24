import {useState, useRef} from 'react';

const useTimer = (initialState = 0) => {
  const [timer, setTimer] = useState(initialState);
  const [active, setActive] = useState(false);
  const [paused, setPaused] = useState(false);
  const countRef = useRef(null);

  const handleStart = () => {
    setActive(true);
    setPaused(true);
    countRef.current = setInterval(() => {
      setTimer(timer => timer + 1);
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(countRef.current);
    setPaused(false);
  };

  const handleResume = () => {
    setPaused(true);
    countRef.current = setInterval(() => {
      setTimer(timer => timer + 1);
    }, 1000);
  };

  const handleReset = () => {
    clearInterval(countRef.current);
    setActive(false);
    setPaused(false);
    setTimer(0);
  };

  return {
    timer,
    active,
    paused,
    handleStart,
    handlePause,
    handleResume,
    handleReset,
  };
};

export default useTimer;

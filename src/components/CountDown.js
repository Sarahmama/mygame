import React, { useState, useEffect } from 'react';

const CountDown = ({ initialSeconds, onTimeUp }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    // Exit early if countdown is finished
    if (seconds <= 0) {
      if (onTimeUp) {
        onTimeUp(); // Trigger the callback when time is up
      }
      return;
    }

    // Set up the timer
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    // Clean up the timer
    return () => clearInterval(timer);
  }, [seconds, onTimeUp]);

  // Format the remaining time (e.g., “00:05” for 5 minutes and 0 seconds)
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div>
      <h3>{formatTime(seconds)}</h3>
    </div>
  );
};

export default CountDown;

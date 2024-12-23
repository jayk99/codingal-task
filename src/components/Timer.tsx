import React, { useState, useEffect } from "react";

interface TimerProps {
  initialMinutes: number;
  isRunning: boolean;
}

const Timer: React.FC<TimerProps> = ({ initialMinutes, isRunning }) => {
  const validInitialMinutes = Math.max(0, Math.min(initialMinutes, 120));
  const [seconds, setSeconds] = useState(validInitialMinutes * 60);

  useEffect(() => {
    if (!isRunning || seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, seconds]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div className="text-gray-700">
      {mins.toString().padStart(2, "0")}:{secs.toString().padStart(2, "0")}
    </div>
  );
};

export default Timer;

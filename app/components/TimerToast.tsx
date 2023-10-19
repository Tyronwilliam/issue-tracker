"use client";
import { useStopwatch } from "react-timer-hook";
import { useTimerContext } from "../hooks/useTimerContext";

export const CustomTimerToast = ({ task }: { task: any }) => {
  const { seconds, minutes, hours, pause, start, isRunning } = useStopwatch();

  const handleStart = () => {
    start();
  };

  const handlePause = () => {
    pause();
  };

  return (
    <div className=" w-64 border-2 h-fit py-5 border-red-600 top-[1%] left-[99%] z-50 bg-white rounded-md">
      <h2>{task.title}</h2>
      <p>
        Temps écoulé: {hours}:{minutes}:{seconds}
      </p>
      {isRunning ? (
        <button onClick={handlePause}>Pause</button>
      ) : (
        <button onClick={handleStart}>Démarrer</button>
      )}
    </div>
  );
};

export function TaskList() {
  const { timers } = useTimerContext();

  return timers?.length === 0 ? null : (
    <div
      style={{ transform: "translateX(-100%)" }}
      className="absolute flex flex-col w-64 gap-5 h-fit  top-[1%] left-[99%] z-50 bg-blue-200 rounded-md"
    >
      {timers.map((task) => (
        <CustomTimerToast key={task.id} task={task} />
      ))}
    </div>
  );
}

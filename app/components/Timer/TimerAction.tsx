import { PlayIcon, StopIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";

type PropsTimerAction = {
  isRunning: boolean;
  handlePause: () => void;
  handleStart: () => void;
};
const TimerAction = ({
  isRunning,
  handlePause,
  handleStart,
}: PropsTimerAction) => {
  return isRunning ? (
    <Button onClick={handlePause}>
      <StopIcon style={{ color: "var(--accent-11)" }} />
      Pause
    </Button>
  ) : (
    <Button
      onClick={handleStart}
      className="flex items-center border-[1px] p-2 rounded-mb"
      style={{ backgroundColor: "var(--accent-9)" }}
    >
      <PlayIcon />
      Démarrer
    </Button>
  );
};
export default TimerAction;

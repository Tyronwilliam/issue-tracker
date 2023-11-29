"use client";
import { useTimerContext } from "@/app/hooks/useTimerContext";
import { updateTimeOnPause } from "@/app/utils/service/timeFunction";
import { Card, Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useStopwatch } from "react-timer-hook";
import TimerAction from "./TimerAction";
import { TimerContent } from "./TimerContent";
import { IssueWithTime } from "@/app/issues/list/IssueCells";
import classNames from "classnames";

export const CustomTimerToast = ({
  timer,
  showToast,
  setShowToast,
  timers,
  setTimers,
}: {
  timers: IssueWithTime[];
  timer: IssueWithTime;
  showToast: boolean;
  setTimers: (arg: any) => void;
  setShowToast: (showToast: boolean) => void;
}) => {
  // Conversion totalseconds BDD en Date
  const router = useRouter();
  const { currentTimer, setCurrentTimer } = useTimerContext();

  const stopwatchOffset = new Date();
  stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + timer.timer);
  const { seconds, minutes, hours, pause, start, isRunning, totalSeconds } =
    useStopwatch({ offsetTimestamp: stopwatchOffset });

  const handleStart = async () => {
    setCurrentTimer(timer?.id);
    start();
  };

  const handlePause = async () => {
    pause();
    const res = await updateTimeOnPause(totalSeconds, timer);
    if (res?.status === 200) {
      router.refresh();
    }

    setShowToast(false);
  };
  useEffect(() => {
    if (currentTimer !== timer?.id) {
      pause();
    }
  }, [timer?.id, currentTimer]);

  useEffect(() => {
    // Recherchez le bon timer dans le tableau en fonction de son ID
    const updatedTimers = timers.map((t) => {
      if (t.id === timer.id) {
        // Mettez à jour les valeurs du timer avec les nouvelles valeurs
        return {
          ...t,
          seconds: seconds !== undefined ? seconds : t.seconds,
          minutes: minutes !== undefined ? minutes : t.minutes,
          hours: hours !== undefined ? hours : t.hours,
        };
      } else {
        return t;
      }
    });
    // Mettez à jour le tableau des timers avec les timers mis à jour
    setTimers(updatedTimers);
  }, [totalSeconds, seconds, minutes, hours, timer?.id]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isRunning) {
        // If the timer is running, show a confirmation message
        const message =
          "Un timer est en cours, êtes-vous sûr de vouloir quitter la page ?";
        event.returnValue = message; // Standard for most browsers
        return message; // For some older browsers
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isRunning]);
  return (
    <Card
      className={classNames({
        "z-50  max-w-xs bg-white hidden":
          currentTimer !== timer?.id || !showToast,
        "z-50  max-w-xs bg-white slide-top":
          currentTimer === timer?.id && showToast,
      })}
      variant="classic"
      style={{ backgroundColor: "white" }}
    >
      <Flex direction={"column"} gap={"2"}>
        <TimerContent
          timer={timer}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          isToast={true}
        />
        <TimerAction
          isRunning={isRunning}
          handlePause={handlePause}
          handleStart={handleStart}
        />
      </Flex>
    </Card>
  );
};

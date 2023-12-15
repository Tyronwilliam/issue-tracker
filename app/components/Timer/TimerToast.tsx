"use client";
import { IssueWithTime } from "@/app/issues/list/IssueCells";
import {
  convertTotalSecondToUnit,
  updateTimeOnPause,
} from "@/app/utils/service/timeFunction";
import { Issue } from "@prisma/client";
import { Card, Flex } from "@radix-ui/themes";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useStopwatch } from "react-timer-hook";
import TimerAction from "./TimerAction";
import { TimerContent } from "./TimerContent";

export const CustomTimerToast = ({
  showToast,
  setShowToast,
  currentTimer,
  setCurrentTimer,
  setTimerRunning,
}: {
  showToast: boolean;
  setShowToast: (showToast: boolean) => void;
  currentTimer: IssueWithTime;
  setCurrentTimer: (arg: IssueWithTime | null | Issue) => void | IssueWithTime;
  setTimerRunning: (isRunning: boolean) => void;
}) => {
  const router = useRouter();

  const stopwatchOffset = new Date();
  stopwatchOffset.setSeconds(
    stopwatchOffset.getSeconds() + currentTimer?.timer
  );

  const { seconds, minutes, hours, pause, start, isRunning, totalSeconds } =
    useStopwatch({ offsetTimestamp: stopwatchOffset });

  const handleStart = async () => {
    setTimerRunning(true);
    start();
  };

  const handlePause = async () => {
    pause();
    setTimerRunning(false);
    const res = await updateTimeOnPause(totalSeconds, currentTimer);
    if (res?.status === 200) {
      setShowToast(false);
      router.refresh();
    }
  };

  useEffect(() => {
    if (currentTimer) {
      // Calculate the formatted time units
      const { seconds, minutes, hours } = convertTotalSecondToUnit(
        currentTimer?.timer || 0
      );
      const newCurrentTimer: any = {
        ...(currentTimer as IssueWithTime),
        seconds: seconds !== undefined ? seconds : currentTimer.seconds,
        minutes: minutes !== undefined ? minutes : currentTimer.minutes,
        hours: hours !== undefined ? hours : currentTimer.hours,
      };
      // Update the currentTimer object
      setCurrentTimer(newCurrentTimer);
    }
  }, [totalSeconds, currentTimer?.id, currentTimer?.timer]);

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
        "z-50  max-w-xs bg-white hidden": currentTimer === null || !showToast,
        "z-50  max-w-xs bg-white slide-top": currentTimer !== null && showToast,
      })}
      variant="classic"
      style={{ backgroundColor: "white" }}
    >
      <Flex direction={"column"} gap={"2"}>
        {isRunning ? (
          <TimerContent
            timer={currentTimer}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
            totalSeconds={totalSeconds}
            isToast={true}
          />
        ) : (
          <TimerContent
            timer={currentTimer as IssueWithTime}
            totalSeconds={currentTimer?.timer}
            isToast={true}
          />
        )}

        <TimerAction
          isRunning={isRunning}
          handlePause={handlePause}
          handleStart={handleStart}
        />
      </Flex>
    </Card>
  );
};

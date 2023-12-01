"use client";
import { useTimerContext } from "@/app/hooks/useTimerContext";
import { Flex } from "@radix-ui/themes";
import classNames from "classnames";
import { CustomTimerToast } from "./TimerToast";

function TaskList() {
  const {
    showToast,
    setShowToast,
    currentTimer,
    setCurrentTimer,
    setTimerRunning,
  } = useTimerContext();

  return (
    <Flex
      direction={"column"}
      className={classNames({
        "hidden absolute top-[2%] left-[99%] gap-5 p-5 w-64 z-0": !showToast,
        "block absolute w-64 h-fit z-50 top-[2%] left-[99%] gap-5 p-5":
          showToast === true && currentTimer !== null,
      })}
      style={{ transform: `translateX(-100%)` }}
    >
      {currentTimer !== null && (
        <CustomTimerToast
          key={currentTimer?.id}
          showToast={showToast}
          setShowToast={setShowToast}
          currentTimer={currentTimer}
          setCurrentTimer={setCurrentTimer}
          setTimerRunning={setTimerRunning}
        />
      )}
    </Flex>
  );
}
export default TaskList;

"use client";
import { useTimerContext } from "@/app/hooks/useTimerContext";
import { Flex } from "@radix-ui/themes";
import classNames from "classnames";
import { CustomTimerToast } from "./TimerToast";
import { IssueWithTime } from "@/app/issues/list/IssueCells";

function TaskList() {
  const { timers, showToast, setShowToast, setTimers, currentTimer } =
    useTimerContext();

  return (
    <Flex
      direction={"column"}
      className={classNames({
        "hidden absolute top-[2%] left-[99%] gap-5 p-5 w-64 z-0": true,
        "block absolute w-64 h-fit z-50 top-[2%] left-[99%] gap-5 p-5":
          showToast === true || currentTimer !== null,
      })}
      style={{ transform: `translateX(-100%)` }}
    >
      {timers?.map((timer: IssueWithTime) => {
        return (
          <CustomTimerToast
            key={timer?.id}
            timers={timers}
            timer={timer}
            showToast={showToast}
            setShowToast={setShowToast}
            setTimers={setTimers}
          />
        );
      })}
    </Flex>
  );
}
export default TaskList;

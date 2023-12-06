"use client";
import { TimerContent } from "@/app/components/Timer/TimerContent";
import { useTimerContext } from "@/app/hooks/useTimerContext";
import { Issue } from "@prisma/client";
import { PlayIcon } from "@radix-ui/react-icons";
import { Tooltip } from "@radix-ui/themes";
import { AxiosResponse } from "axios";
import React from "react";
import TimeEdit from "../_components/TimeEdit";
import { IssueWithTime } from "./IssueCells";
type IconeTimerProps = {
  createTimer: (issue: Issue) => void;
  issue: IssueWithTime;
  timerRunning: boolean;
  currentTimer: Issue | null | IssueWithTime;
  setCurrentTimer: (arg: Issue | null | IssueWithTime) => void;
  setShowToast: (arg: boolean) => void;
  toggle: (arg: number | null) => void;
  open: boolean;
  itemId: number | null;
  issueTime: string | undefined | number;
  handleTimeChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    isLayout: boolean,
    issueId?: number
  ) => Promise<AxiosResponse | null>;
  setIssueTime: (issueTime: string | undefined | number) => void;
};
export const IconeTimer = ({
  createTimer,
  issue,
  setCurrentTimer,
  setShowToast,
  toggle,
  open,
  itemId,
  issueTime,
  handleTimeChange,
  setIssueTime,
  currentTimer,
  timerRunning,
}: IconeTimerProps) => {
  return issue?.timer > 0 ? (
    <React.Fragment key={issue?.id}>
      {open && itemId === issue?.id ? (
        <TimeEdit
          toggle={toggle}
          isLayout={false}
          handleTimeChange={handleTimeChange}
          issueTime={issueTime}
          setIssueTime={setIssueTime}
          setCurrentTimer={setCurrentTimer}
          issueId={issue?.id}
        />
      ) : (
        <TimerContent
          timer={issue}
          // hours={issue?.hours}
          // minutes={issue?.minutes}
          // seconds={issue?.seconds}
          totalSeconds={issue?.timer}
          isToast={false}
          toggle={toggle}
          setCurrentTimer={setCurrentTimer}
        />
      )}

      <ResumeTimer
        setCurrentTimer={setCurrentTimer}
        setShowToast={setShowToast}
        issue={issue}
        timerRunning={timerRunning}
        currentTimer={currentTimer}
      />
    </React.Fragment>
  ) : (
    <ResumeTimer
      createTimer={createTimer}
      issue={issue}
      timerRunning={timerRunning}
      currentTimer={currentTimer}
    />
  );
};

const ResumeTimer = ({
  createTimer,
  issue,
  setCurrentTimer,
  setShowToast,
  timerRunning,
  currentTimer,
}: {
  createTimer?: (arg: Issue) => void;
  issue: Issue;
  setCurrentTimer?: (arg: Issue | null | IssueWithTime) => void;
  setShowToast?: (arg: boolean) => void;
  timerRunning: boolean;
  currentTimer: Issue | null | IssueWithTime;
}) => {
  const { setShowAlert } = useTimerContext();
  return (
    <Tooltip content="Start" style={{ backgroundColor: "var(--accent-9)" }}>
      <PlayIcon
        style={{ color: "var(--accent-11)" }}
        className="cursor-pointer"
        onClick={() => {
          if (createTimer) {
            if (currentTimer !== null && timerRunning === true) {
              setShowAlert(true);
              return;
            } else {
              createTimer(issue);
            }
          }
          if (setCurrentTimer && setShowToast) {
            if (currentTimer !== null && timerRunning === true) {
              setShowAlert(true);
              return;
            } else {
              setCurrentTimer(issue);
              setShowToast(true);
            }
          }
        }}
      />
    </Tooltip>
  );
};

"use client";
import { IssueStatusBadge, Link } from "@/app/components";
import { TimerContent } from "@/app/components/Timer/TimerContent";
import { useIssueContext } from "@/app/hooks/useIssueContext";
import { useTimerContext } from "@/app/hooks/useTimerContext";
import useToggle from "@/app/hooks/useToggle";
import { Time, options } from "@/app/utils/service/timeFunction";
import { Issue } from "@prisma/client";
import { PlayIcon } from "@radix-ui/react-icons";
import { Flex, Table, Tooltip } from "@radix-ui/themes";
import { AxiosResponse } from "axios";
import React from "react";
import AssignStatus from "../[id]/AssignStatus";
import TimeEdit from "../_components/TimeEdit";
import { IssueWithProject } from "./IssueTable";
import AlertCurrentTimer from "@/app/components/Timer/AlertCurrentTimer";
interface Props {
  issues?: IssueWithProject[];
}
const IssueCells = ({ issues }: Props) => {
  const {
    setShowToast,
    setCurrentTimer,
    currentTimer,
    createTimer,
    timerRunning,
  } = useTimerContext();
  const { open, toggle, itemId } = useToggle();
  const { issueTime, handleTimeChange, setIssueTime } = useIssueContext();

  return issues?.map((issue) => {
    const date = new Date(issue?.createdAt);
    const formatDate = date.toLocaleDateString(undefined, options);

    return (
      <Table.Row key={issue?.id}>
        <Table.RowHeaderCell className="h-fit">
          <Flex
            width={"100%"}
            height={"100%"}
            gap={"3"}
            className="flex flex-col	item-start md:flex-row	 md:items-center"
          >
            <Link href={`/issues/${issue?.id}`}>{issue?.title}</Link>{" "}
            <div className="block md:hidden">
              <IssueStatusBadge status={issue?.status} />
            </div>
          </Flex>
        </Table.RowHeaderCell>
        <Table.Cell className="hidden md:table-cell">
          <Flex align={"center"} height={"100%"} className="w-24">
            <AssignStatus issue={issue} isFromCeil={true} />{" "}
          </Flex>
        </Table.Cell>
        <Table.Cell className="hidden md:table-cell mx-auto">
          <Flex gap={"2"} align={"center"} width={"100%"} height={"100%"}>
            <IconeTimer
              createTimer={createTimer}
              issue={issue}
              setCurrentTimer={setCurrentTimer}
              setShowToast={setShowToast}
              toggle={toggle}
              open={open}
              itemId={itemId}
              issueTime={issueTime}
              handleTimeChange={handleTimeChange}
              setIssueTime={setIssueTime}
              timerRunning={timerRunning}
              currentTimer={currentTimer}
            />
          </Flex>
        </Table.Cell>
        <Table.Cell className="hidden md:table-cell">
          <Flex align={"center"} width={"100%"} height={"100%"}>
            {issue?.Project && issue?.Project.title}
          </Flex>
        </Table.Cell>
        <Table.Cell className="hidden md:table-cell">
          <Flex align={"center"} width={"100%"} height={"100%"}>
            {formatDate}{" "}
          </Flex>
        </Table.Cell>
      </Table.Row>
    );
  });
};

export default IssueCells;

type IconeTimerProps = {
  createTimer: (issue: Issue) => void;
  issue: IssueWithProject | IssueWithTime;
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
export type IssueWithTime = Issue & Time;
const IconeTimer = ({
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

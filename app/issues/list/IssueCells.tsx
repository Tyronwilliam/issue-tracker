"use client";
import { IssueStatusBadge, Link } from "@/app/components";
import { useTimerContext } from "@/app/hooks/useTimerContext";
import { PlayIcon } from "@radix-ui/react-icons";
import { Flex, Table, Tooltip } from "@radix-ui/themes";
import { IssueWithProject } from "./IssueTable";
import { TimerContent } from "@/app/components/Timer/TimerToast";
import axios from "axios";
import { useEffect } from "react";
import AssignStatus from "../[id]/AssignStatus";
interface Props {
  issues?: IssueWithProject[];
}
const IssueCells = ({ issues }: Props) => {
  const { timers, setTimers, setShowToast, setCurrentTimer } =
    useTimerContext();

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  useEffect(() => {
    if (issues) {
      const updatedTimers = issues
        .filter((issue) => issue.timer > 0)
        .map((issue) => issue);
      setTimers(updatedTimers);
    }
  }, [issues]);
  const createTimer = async (issue: any) => {
    const res = await axios.get("/api/issues/" + issue.id);
    const id = res.data.id;
    const freshIssue = res.data;
    const exist = timers.some((el) => el.id === id);
    if (exist) return;
    setCurrentTimer(id);
    setTimers((prevTimers) => [...prevTimers, freshIssue]);
    setShowToast(true);
  };
  return issues?.map((issue) => {
    const date = new Date(issue?.createdAt);
    const formatDate = date.toLocaleDateString(undefined, options);
    const timerExists = timers?.some((timer) => timer.id === issue?.id);

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
              timerExists={timerExists}
              createTimer={createTimer}
              issue={issue}
              timers={timers}
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
  timerExists: boolean;
  createTimer: (issue: any) => void;
  issue: IssueWithProject;
  timers: any[];
};

const IconeTimer = ({
  timerExists,
  createTimer,
  issue,
  timers,
}: IconeTimerProps) => {
  return timerExists ? (
    <>
      {timers.map((timer) => {
        return timer?.id === issue?.id ? (
          <TimerContent
            key={timer?.id}
            timer={timer}
            hours={timer?.hours}
            minutes={timer?.minutes}
            seconds={timer?.seconds}
            totalSeconds={timer?.timer}
            isToast={false}
          />
        ) : null;
      })}
    </>
  ) : (
    <Tooltip content="Start" style={{ backgroundColor: "var(--accent-9)" }}>
      <PlayIcon
        style={{ color: "var(--accent-11)" }}
        className="cursor-pointer"
        onClick={() => createTimer(issue)}
      />
    </Tooltip>
  );
};

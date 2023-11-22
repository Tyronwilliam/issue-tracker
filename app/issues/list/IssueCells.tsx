"use client";
import { IssueStatusBadge, Link } from "@/app/components";
import { useTimerContext } from "@/app/hooks/useTimerContext";
import { PlayIcon } from "@radix-ui/react-icons";
import { Flex, Table, Tooltip } from "@radix-ui/themes";
import { IssueWithProject } from "./IssueTable";
import { TimerContent } from "@/app/components/Timer/TimerToast";
import axios from "axios";
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
    const date = new Date(issue.createdAt);
    const formatDate = date.toLocaleDateString(undefined, options);
    const timerExists = timers.some((timer) => timer.id === issue.id);

    return (
      <Table.Row key={issue.id}>
        <Table.RowHeaderCell>
          <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
          <div className="block md:hidden">
            <IssueStatusBadge status={issue.status} />
          </div>
        </Table.RowHeaderCell>
        <Table.Cell className="hidden md:table-cell">
          <IssueStatusBadge status={issue.status} />
        </Table.Cell>
        <Table.Cell className="hidden md:table-cell">{formatDate}</Table.Cell>
        <Table.Cell className="hidden md:table-cell">
          {issue.Project && issue.Project.title}
        </Table.Cell>
        <Table.Cell className="hidden md:table-cell mx-auto">
          <Flex gap={"2"} align={"center"}>
            <IconeTimer
              timerExists={timerExists}
              createTimer={createTimer}
              issue={issue}
              timers={timers}
            />
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
            hours={timer.hours}
            minutes={timer.minutes}
            seconds={timer.seconds}
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

"use client";
import { IssueStatusBadge, Link } from "@/app/components";
import { useTimerContext } from "@/app/hooks/useTimerContext";
import { PlayIcon, StopIcon } from "@radix-ui/react-icons";
import { Flex, Table, Tooltip } from "@radix-ui/themes";
import React from "react";
import { IssueWithProject } from "./IssueTable";
interface Props {
  issues?: IssueWithProject[];
}
const IssueCells = ({ issues }: Props) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const { timers, setTimers } = useTimerContext();

  const createTimer = (issue: any) => {
    const exist = timers.includes(issue);
    if (exist) return;
    setTimers((prevTimers) => [...prevTimers, issue]);
  };
  
  return issues?.map((issue) => {
    const date = new Date(issue.createdAt);
    const formatDate = date.toLocaleDateString(undefined, options);
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
            TEMPS
            <Tooltip
              content="Start"
              style={{ backgroundColor: "var(--accent-9)" }}
            >
              <PlayIcon
                style={{ color: "var(--accent-11)" }}
                onClick={() => createTimer(issue)}
              />
            </Tooltip>
            <Tooltip
              content="Stop"
              style={{ backgroundColor: "var(--accent-9)" }}
            >
              <StopIcon style={{ color: "var(--accent-11)" }} />
            </Tooltip>
          </Flex>
        </Table.Cell>
      </Table.Row>
    );
  });
};

export default IssueCells;

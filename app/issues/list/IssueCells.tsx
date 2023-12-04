"use client";
import { IssueStatusBadge, Link } from "@/app/components";
import { useIssueContext } from "@/app/hooks/useIssueContext";
import { useTimerContext } from "@/app/hooks/useTimerContext";
import useToggle from "@/app/hooks/useToggle";
import { Time, options } from "@/app/utils/service/timeFunction";
import { CategorieCustom, Issue } from "@prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import AssignStatus from "../[id]/AssignStatus";
import { IconeTimer } from "./IconeTimer";
import { IssueWithProject } from "./IssueTable";
import CustomCategorie from "../_components/CustomCategorie";
interface Props {
  issues?: IssueWithProject[];
  allCategorie: CategorieCustom[];
}
const IssueCells = ({ issues, allCategorie }: Props) => {
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
            <div className="max-w-[180px]  overflow-hidden text-ellipsis whitespace-nowrap">
              <Link href={`/issues/${issue?.id}`}>{issue?.title}</Link>{" "}
            </div>
            <div className="block md:hidden">
              <IssueStatusBadge status={issue?.status} />
            </div>
            {/* couleur de background custom */}
            <CustomCategorie allCategorie={allCategorie} />
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

export type IssueWithTime = Issue & Time;

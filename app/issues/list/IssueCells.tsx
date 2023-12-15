"use client";
import { IssueStatusBadge } from "@/app/components";
import { useIssueContext } from "@/app/hooks/useIssueContext";
import { useTimerContext } from "@/app/hooks/useTimerContext";
import useToggle from "@/app/hooks/useToggle";
import { Time, options } from "@/app/utils/service/timeFunction";
import { CategorieCustom, Issue } from "@prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import AssignStatus from "../[id]/AssignStatus";
import CustomCategorie from "../_components/CategorieComponent/CustomCategorie";
import { IconeTimer } from "./IconeTimer";
import QuickEditTitle from "./QuickEditTitle";
import { IssueWithProjectAndCategory } from "./page";
import useQuickEditTitle from "./hook/useQuickEditTitle";
interface Props {
  issues: IssueWithProjectAndCategory[];
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
  const {
    toggleQuickEdit,
    handlePressKey,
    handlePatchIsue,
    openQuickEdit,
    selectId,
    title,
  } = useQuickEditTitle();
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
            <div className="flex gap-2 items-center">
              <QuickEditTitle
                openQuickEdit={openQuickEdit}
                toggleQuickEdit={toggleQuickEdit}
                title={title}
                isssueTitle={issue?.title}
                issueId={issue?.id}
                selectId={selectId}
                handlePressKey={handlePressKey}
                handlePatchIsue={handlePatchIsue}
              />
            </div>
            <div className="block md:hidden">
              <IssueStatusBadge status={issue?.status} />
            </div>
            {/* couleur de background custom */}
            <CustomCategorie
              allCategorie={allCategorie}
              issueId={issue?.id}
              issue={issue}
            />
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

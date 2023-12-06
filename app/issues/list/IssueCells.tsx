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
import CustomCategorie from "../_components/CategorieComponent/CustomCategorie";
import { IssueWithProjectAndCategory } from "./page";
import QuickEditTitle from "./QuickEditTitle";
import { useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
interface Props {
  issues: IssueWithProjectAndCategory[];
  allCategorie: CategorieCustom[];
}
const IssueCells = ({ issues, allCategorie }: Props) => {
  const router = useRouter();
  const {
    setShowToast,
    setCurrentTimer,
    currentTimer,
    createTimer,
    timerRunning,
  } = useTimerContext();
  const { open, toggle, itemId } = useToggle();
  const { issueTime, handleTimeChange, setIssueTime } = useIssueContext();
  const title = useRef<HTMLInputElement>(null);
  const [openQuickEdit, setOpenQuickEdit] = useState(false);
  const [selectId, setSelectId] = useState<number | null>(null);
  const toggleQuickEdit = (id: number) => {
    setOpenQuickEdit(!openQuickEdit);
    setSelectId(id);
  };

  const handlePatchIsue = async (issueId: number) => {
    let data = {
      title: title.current?.value,
    };
    const response = await axios
      .patch("/api/issues/" + issueId, data)
      .then((res) => res)
      .catch((err) => err);
    if (response?.status === 200) {
      toast.success("C'est fait !");

      setOpenQuickEdit(!openQuickEdit);
      router.refresh();
    } else {
      const error = response?.response?.data?.title?._errors[0];
      toast.error(error);
    }
  };
  const handlePressKey = async (
    e: React.KeyboardEvent<HTMLInputElement>,
    issueId: number
  ) => {
    if (e.key === "Enter") {
      handlePatchIsue(issueId);
    }
  };
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

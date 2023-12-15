"use client";
import { Project } from "@prisma/client";
import React from "react";
import AssignSelectProject from "./AssignSelectProject";
import { Box, Flex } from "@radix-ui/themes";
import TimeEdit from "../_components/TimeEdit";
import IssueFormSkeleton from "./loading";
import dynamic from "next/dynamic";
import { useIssueContext } from "../../hooks/useIssueContext";
const IssueForm = dynamic(() => import("../_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});
const LayoutNewIssue = ({
  projectsAssociatedWithUser,
}: {
  projectsAssociatedWithUser: Project[];
}) => {
  const { issueTime, handleTimeChange, setIssueTime } = useIssueContext();
  return (
    <React.Fragment>
      <IssueForm />
      <Flex direction={"column"} gap={"3"} width={"min-content"}>
        <Box>
          <AssignSelectProject projects={projectsAssociatedWithUser} />
        </Box>
        <Box>
          <TimeEdit
            handleTimeChange={handleTimeChange}
            issueTime={issueTime}
            setIssueTime={setIssueTime}
            isLayout={true}
          />
        </Box>
      </Flex>
    </React.Fragment>
  );
};

export default LayoutNewIssue;

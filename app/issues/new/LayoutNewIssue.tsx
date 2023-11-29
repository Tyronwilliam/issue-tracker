"use client";
import { Project } from "@prisma/client";
import React from "react";
import AssignSelectProject from "./AssignSelectProject";
import { Box, Flex } from "@radix-ui/themes";
import IssueForm from "../_components/IssueForm";
import TimeEdit from "../_components/TimeEdit";
import { useIssueContext } from "@/app/hooks/useIssueContext";

const LayoutNewIssue = ({
  projectsAssociatedWithUser,
}: {
  projectsAssociatedWithUser: Project[];
}) => {
  const { issueTime, handleTimeChange } = useIssueContext();
  return (
    <>
      <IssueForm />
      <Flex direction={"column"} gap={"3"} width={"min-content"}>
        <Box>
          <AssignSelectProject projects={projectsAssociatedWithUser} />
        </Box>
        <Box>
          <TimeEdit
            handleTimeChange={handleTimeChange}
            issueTime={issueTime}
          />
        </Box>
      </Flex>
    </>
  );
};

export default LayoutNewIssue;

"use client";
import { Project } from "@prisma/client";
import React from "react";
import AssignSelectProject from "./AssignSelectProject";
import { Box } from "@radix-ui/themes";
import IssueForm from "../_components/IssueForm";

const LayoutNewIssue = ({
  projectsAssociatedWithUser,
}: {
  projectsAssociatedWithUser: Project[];
}) => {
  return (
    <>
      <IssueForm />
      <Box className="w-fit">
        <AssignSelectProject projects={projectsAssociatedWithUser} />
      </Box>
    </>
  );
};

export default LayoutNewIssue;

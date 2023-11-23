import React from "react";
import { getProjectsAssociatedWithUser } from "../utils/service/userRelation";
import { CreateProject, DialogProject } from "./projects/[id]/CreateProject";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import ProjectsTable from "./ProjectsTable";
import { Flex, Heading } from "@radix-ui/themes";

const ProjectsRecapPage = async () => {
  const session = await getServerSession(authOptions);

  const projectsAssociatedWithUser = await getProjectsAssociatedWithUser(
    session
  );
  if (projectsAssociatedWithUser?.length === 0)
    return <CreateProject session={session} />;

  const totalTimeArray = projectsAssociatedWithUser.map((project) => {
    const projectTime = project?.issueId?.reduce((projectAcc, issue) => {
      const time = issue?.timer || 0;
      return projectAcc + time;
    }, 0);

    return {
      projectId: project.id,
      totalTime: projectTime,
    };
  });


  return (
    <>
      <Flex
        gap={"2"}
        direction={{ initial: "column", xs: "row" }}
        justify={"between"}
        mb={"5"}
      >
        <Heading>Projets</Heading>
        <DialogProject session={session} />
      </Flex>
      <ProjectsTable
        projects={projectsAssociatedWithUser}
        totalTimeArray={totalTimeArray}
      />
    </>
  );
};

export default ProjectsRecapPage;

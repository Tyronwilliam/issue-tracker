import React from "react";
import { getProjectsAssociatedWithUser } from "../utils/service/userRelation";
import { CreateProject } from "./projects/[id]/CreateProject";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import ProjectsTable from "./ProjectsTable";
import { Flex, Heading } from "@radix-ui/themes";
import { getRandomColor } from "../utils/service/styleFunction";
import DialogProject from "./projects/[id]/DialogProject";
import prisma from "@/prisma/client";

const ProjectsRecapPage = async () => {
  const session = await getServerSession(authOptions);

  const projectsAssociatedWithUser = await getProjectsAssociatedWithUser(
    session
  );
  if (projectsAssociatedWithUser?.length === 0)
    return <CreateProject session={session} />;
//////////////////////////////////// GET PROJECT ASSSOCIATED WITH ADMI//////////////
  // const projectsWhereUserIsAdmin = await prisma.admin.findMany({
  //   where: {
  //     users: { some: { id: session?.user?.id } },
  //   },
  //   select: {
  //     project: true,
  //   },
  // });
  // console.log(projectsWhereUserIsAdmin, "PROJECT ADMIN");
  /////////////////////////////////////////////////////////
  const totalTimeArray = projectsAssociatedWithUser?.map((project) => {
    const projectTime = project?.issueId?.reduce((projectAcc, issue) => {
      const time = issue?.timer || 0;
      return projectAcc + time;
    }, 0);

    return {
      projectId: project.id,
      totalTime: projectTime,
    };
  });

  const avancementArray = projectsAssociatedWithUser?.map((project) => {
    // Compter le nombre total d'issues et le nombre d'issues "CLOSED"
    let totalIssues = 0;
    let closedIssues = 0;

    project?.issueId?.forEach((issue) => {
      totalIssues++;
      if (issue.status === "CLOSED") {
        closedIssues++;
      }
    });

    // Calculer le pourcentage d'avancement
    const avancement = totalIssues > 0 ? (closedIssues / totalIssues) * 100 : 0;
    const bgColor = getRandomColor();
    return {
      projectId: project.id,
      avancement: Math.round(avancement),
      bgColor: bgColor,
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
        avancement={avancementArray}
      />
    </>
  );
};

export default ProjectsRecapPage;

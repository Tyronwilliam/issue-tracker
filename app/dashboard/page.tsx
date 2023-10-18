import prisma from "@/prisma/client";
import { Flex, Grid, Heading } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import LatestIssue from "./LatestIssue";
import ProjectFilter from "./ProjectFilter";

interface Props {
  searchParams: { project: string };
}
const Dashboard = async ({ searchParams }: Props) => {
  const session = await getServerSession(authOptions);

  const projectsAssociatedWithUser = await prisma.project.findMany({
    where: {
      user: {
        some: {
          email: session?.user?.email,
        },
      },
    },
  });
  const paramsToId = parseInt(searchParams.project);

  const lastProjectId = projectsAssociatedWithUser.indexOf(
    projectsAssociatedWithUser[projectsAssociatedWithUser.length - 1]
  );
  const projectId = searchParams.project
    ? projectsAssociatedWithUser[paramsToId].id
    : projectsAssociatedWithUser[projectsAssociatedWithUser.length - 1].id;

  const isIndexValid = projectsAssociatedWithUser[paramsToId] !== undefined;

  const titleProject = isIndexValid
    ? projectsAssociatedWithUser[paramsToId]?.title
    : projectsAssociatedWithUser[projectsAssociatedWithUser.length - 1].title;

  const open = await prisma.issue.count({
    where: {
      status: "OPEN",
      projectId: projectId,
    },
  });
  const closed = await prisma.issue.count({
    where: {
      status: "CLOSED",
      projectId: projectId,
    },
  });
  const inProgress = await prisma.issue.count({
    where: {
      status: "IN_PROGRESS",
      projectId: projectId,
    },
  });
  return (
    <>
      <Flex justify="between" align={"center"} mb={"5"}>
        <Heading>{titleProject}</Heading>
        <ProjectFilter
          projects={projectsAssociatedWithUser}
          lastProject={lastProjectId}
        />
      </Flex>
      <Grid columns={{ initial: "1", md: "2" }} gap={"5"}>
        <Flex direction="column" gap={"5"}>
          <IssueSummary closed={closed} open={open} inProgress={inProgress} />
          <IssueChart closed={closed} open={open} inProgress={inProgress} />
        </Flex>
        <LatestIssue projectId={projectId} />
      </Grid>
    </>
  );
};

export default Dashboard;

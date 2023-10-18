import prisma from "@/prisma/client";
import { Box, Flex, Grid, Heading } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import LatestIssue from "./LatestIssue";
import ProjectFilter from "./ProjectFilter";
import { IssueStatusBadge } from "../components";
import { getProjectsAssociatedWithUser } from "../utils/service/userRelation";

interface Props {
  searchParams: { project: string };
}
const Dashboard = async ({ searchParams }: Props) => {
  const session = await getServerSession(authOptions);

  const projectsAssociatedWithUser = await getProjectsAssociatedWithUser(
    session
  );
  const paramsToId = parseInt(searchParams.project);

  const isIndexValid = projectsAssociatedWithUser[paramsToId] !== undefined;

  const lastProjectId = isIndexValid
    ? paramsToId
    : projectsAssociatedWithUser.indexOf(
        projectsAssociatedWithUser[projectsAssociatedWithUser.length - 1]
      );
  const projectId = isIndexValid
    ? projectsAssociatedWithUser[paramsToId].id
    : projectsAssociatedWithUser[projectsAssociatedWithUser.length - 1].id;

  const titleProject = isIndexValid
    ? projectsAssociatedWithUser[paramsToId]?.title
    : projectsAssociatedWithUser[projectsAssociatedWithUser.length - 1].title;

  const status = isIndexValid
    ? projectsAssociatedWithUser[paramsToId]?.status
    : projectsAssociatedWithUser[projectsAssociatedWithUser.length - 1].status;
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
        <Box>
          <Heading>{titleProject}</Heading>
          <IssueStatusBadge status={status} />
        </Box>
        <ProjectFilter
          projects={projectsAssociatedWithUser}
          lastProject={lastProjectId}
          selectAll={false}
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

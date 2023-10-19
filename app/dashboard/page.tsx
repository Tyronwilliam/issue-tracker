import prisma from "@/prisma/client";
import { Box, Flex, Grid, Heading } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { IssueStatusBadge } from "../components";
import { getProjectsAssociatedWithUser } from "../utils/service/userRelation";
import { CreateProject, DialogProject } from "./CreateProject";
import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import LatestIssue from "./LatestIssue";
import ProjectFilter from "./ProjectFilter";

interface Props {
  searchParams: { project: string };
}
const Dashboard = async ({ searchParams }: Props) => {
  const session = await getServerSession(authOptions);

  const projectsAssociatedWithUser = await getProjectsAssociatedWithUser(
    session
  );
  if (projectsAssociatedWithUser?.length === 0)
    return <CreateProject session={session} />;

  const realProjectId = parseInt(searchParams.project);

  const projectIndex = projectsAssociatedWithUser.findIndex(
    (project) => project.id === realProjectId
  );

  const isProjectValid = projectIndex !== -1;
  const projectId = isProjectValid
    ? realProjectId
    : projectsAssociatedWithUser[projectsAssociatedWithUser.length - 1].id;

  const lastProjectId =
    projectsAssociatedWithUser[projectsAssociatedWithUser.length - 1].id;

  const titleProject = isProjectValid
    ? projectsAssociatedWithUser[projectIndex]?.title
    : projectsAssociatedWithUser[projectsAssociatedWithUser.length - 1].title;

  const status = isProjectValid
    ? projectsAssociatedWithUser[projectIndex]?.status
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
      <Flex
        justify="between"
        align={{ xs: "center" }}
        mb={"5"}
        direction={{ initial: "column", xs: "row" }}
        gap={"5"}
      >
        <Box>
          <Heading>{titleProject}</Heading>
          <IssueStatusBadge status={status} />
        </Box>
        <Flex gap={"2"} direction={{ initial: "column", xs: "row" }}>
          <DialogProject session={session} />
          <ProjectFilter
            key={lastProjectId}
            projects={projectsAssociatedWithUser}
            lastProject={lastProjectId}
            selectAll={false}
          />
        </Flex>
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

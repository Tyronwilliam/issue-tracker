import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import { Box, Flex, Grid, Heading } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { IssueStatusBadge } from "../../../components";
import Invitation from "../../Invitation";
import { CreateProject } from "./CreateProject";
import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import LatestIssue from "./LatestIssue";

interface Props {
  params: { id: string };
}
const DashboardSingleProject = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  if (!params || isNaN(parseInt(params.id))) {
    return <CreateProject session={session} />;
  }

  const paramId = parseInt(params.id);
  const project = await prisma.project.findUnique({
    where: {
      id: paramId,
    },
  });

  const projectId = project?.id;

  const titleProject = project?.title;

  const status = project?.status;

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
        <Invitation />
      </Flex>
      <Grid columns={{ initial: "1", md: "2" }} gap={"5"}>
        <IssueChart closed={closed} open={open} inProgress={inProgress} />{" "}
        <Flex direction="column" gap={"5"}>
          <IssueSummary closed={closed} open={open} inProgress={inProgress} />
          <LatestIssue projectId={projectId} />
        </Flex>
      </Grid>
    </>
  );
};

export default DashboardSingleProject;

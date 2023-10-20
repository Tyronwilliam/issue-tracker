import prisma from "@/prisma/client";
import { Box, Flex, Grid, Heading } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import { IssueStatusBadge } from "../../../components";
import {
  getProjectById,
  getProjectsAssociatedWithUser,
} from "../../../utils/service/userRelation";
import { CreateProject, DialogProject } from "./CreateProject";
import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import LatestIssue from "./LatestIssue";
import ProjectFilter from "./ProjectFilter";

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
        {/* <Flex gap={"2"} direction={{ initial: "column", xs: "row" }}>
          <DialogProject session={session} />
        </Flex> */}
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

export default DashboardSingleProject;

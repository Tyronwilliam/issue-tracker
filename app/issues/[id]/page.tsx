import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetail from "./IssueDetail";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AssignSelect, { IssueWithUsers } from "./AssignSelect";
import AssignStatus from "./AssignStatus";
import AssignSelectProject from "../new/AssignSelectProject";
import { getProjectsAssociatedWithUser } from "@/app/utils/service/userRelation";

interface Props {
  params: { id: string };
}
const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const projectsAssociatedWithUser = await getProjectsAssociatedWithUser(
    session
  );
  const issue = (await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      users: { include: { projectId: true } },
      Project: true,
    },
  })) as IssueWithUsers;

  if (!issue) {
    notFound();
  }

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetail issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssignSelectProject
              projects={projectsAssociatedWithUser}
              issueId={parseInt(params?.id)}
            />
            <AssignSelect issue={issue} />
            <AssignStatus issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;

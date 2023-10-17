import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import LatestIssue from "./LatestIssue";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const Dashboard = async () => {
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
  console.log(projectsAssociatedWithUser);
  const open = await prisma.issue.count({
    where: { status: "OPEN" },
  });
  const closed = await prisma.issue.count({
    where: { status: "CLOSED" },
  });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap={"5"}>
      <Flex direction="column" gap={"5"}>
        <IssueSummary closed={closed} open={open} inProgress={inProgress} />
        <IssueChart closed={closed} open={open} inProgress={inProgress} />
      </Flex>
      <LatestIssue />
    </Grid>
  );
};

export default Dashboard;

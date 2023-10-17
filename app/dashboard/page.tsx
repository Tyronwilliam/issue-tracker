import { Container, Flex, Grid } from "@radix-ui/themes";
import React from "react";
import LatestIssue from "./LatestIssue";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const Dashboard = async () => {
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

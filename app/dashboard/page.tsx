import { Container } from "@radix-ui/themes";
import React from "react";
import LatestIssue from "./LatestIssue";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";

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
    <Container>
      {/* <LatestIssue /> */}
      <IssueChart closed={closed} open={open} inProgress={inProgress} />
      <IssueSummary closed={closed} open={open} inProgress={inProgress} />
    </Container>
  );
};

export default Dashboard;

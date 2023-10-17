import { Container } from "@radix-ui/themes";
import React from "react";
import LatestIssue from "./LatestIssue";

const Dashboard = () => {
  return (
    <Container>
      <LatestIssue />
    </Container>
  );
};

export default Dashboard;

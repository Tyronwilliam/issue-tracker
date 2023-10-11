import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkDown from "react-markdown";
import delay from "delay";

interface Props {
  params: { id: string };
}
const IssueDetailPage = async ({ params }: Props) => {
  //   if (typeof params.id !== "number") notFound();
  await delay(2000);
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    notFound();
  }
  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" align="center" my="2">
        <Text as="p"> {issue.createdAt.toDateString()}</Text>
        <IssueStatusBadge status={issue.status} />
      </Flex>
      <Card className="prose" mt="4">
        <ReactMarkDown>{issue.description}</ReactMarkDown>
      </Card>
    </div>
  );
};

export default IssueDetailPage;

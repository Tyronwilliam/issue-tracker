import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import { IssueStatusBadge } from "@/app/components";
import React from "react";
import NextLink from "next/link";
const LatestIssue = async () => {
  const latestIssue = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { assignedToUser: true },
  });
  return (
    <Card>
      <Heading size="4" mb="5" ml="2">
        Dernière Tâches
      </Heading>
      <Table.Root>
        <Table.Body>
          {latestIssue?.map((issue) => {
            return (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Flex justify="between">
                    <Flex direction="column" align="start" gap="2">
                      <NextLink
                        href={`/issues/${issue.id}`}
                        className="hover:text-violet-600"
                      >
                        {issue.title}
                      </NextLink>
                      <IssueStatusBadge status={issue.status} />
                    </Flex>
                    {issue.assignToUserId && (
                      <Avatar
                        src={issue.assignedToUser?.image || undefined}
                        fallback="?"
                        radius="full"
                        size="2"
                      />
                    )}
                  </Flex>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssue;

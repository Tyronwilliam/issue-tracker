import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import { IssueStatusBadge } from "@/app/components";
import React from "react";
import NextLink from "next/link";
const LatestIssue = async ({ projectId }: { projectId: number }) => {
  const latestIssues = await prisma.issue.findMany({
    where: { projectId: projectId },

    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignees: {
        include: {
          user: true, // Inclure toutes les propriétés de l'utilisateur
        },
      },
    },
  });

  return (
    <Card>
      <Heading size="4" mb="5" ml="2">
        Dernière Tâches
      </Heading>
      <Table.Root>
        <Table.Body>
          {latestIssues?.map((issue) => {
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
                    <Flex gap={"2"}>
                      {issue.assignees.map((assignee) => {
                        return (
                          assignee.user.image && (
                            <Avatar
                              key={assignee.user.id}
                              src={assignee.user.image || undefined}
                              fallback="?"
                              radius="full"
                              size="2"
                            />
                          )
                        );
                      })}
                    </Flex>
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

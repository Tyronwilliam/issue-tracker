import { IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import NextLink from "next/link";
import CreateIssueUI from "../components/CreateIssueUI";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
const LatestIssue = async ({ projectId }: { projectId: number }) => {
  const session = await getServerSession(authOptions);
  const latestIssues = await prisma.issue.findMany({
    where: { projectId: projectId },
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      users: true,
    },
  });

  return (
    <Card>
      <Heading size="4" mb="5" ml="2">
        Dernière Tâches
      </Heading>

      {latestIssues.length > 0 ? (
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
                        {issue.users.map((user) => {
                          return (
                            user.image && (
                              <Avatar
                                key={user.id}
                                src={user.image || undefined}
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
      ) : (
        <CreateIssueUI />
      )}
    </Card>
  );
};

export default LatestIssue;

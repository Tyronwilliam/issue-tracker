import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import IssueAction from "./IssueAction";
import IssueFilterStatut from "./IssueFilterStatut";
import IssueFilterUser from "./IssueFilterUser";
import IssueTable, { IssueQuery, columnName } from "./IssueTable";
const IssuesPage = async ({ searchParams }: { searchParams: IssueQuery }) => {
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const userId = searchParams.user;
  const orderBy = columnName.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status,
      assignToUserId: userId,
    },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const users = await prisma.user.findMany({ orderBy: { name: "asc" } });

  const issueCount = await prisma.issue.count({
    where: {
      status,
      assignToUserId: userId,
    },
  });
  return (
    <Flex direction="column" gap="5">
      <Flex
        justify="between"
        direction={{ initial: "column", sm: "row" }}
        gap={"2"}
      >
        <Flex
          gap={"2"}
          direction={{ initial: "column", sm: "row" }}
          align={"start"}
        >
          <IssueFilterStatut />
          <IssueFilterUser users={users} />
        </Flex>
        <IssueAction />
      </Flex>
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";
export default IssuesPage;

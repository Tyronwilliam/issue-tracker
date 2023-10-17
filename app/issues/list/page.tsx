import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import IssueAction from "./IssueAction";
import IssueFilter from "./IssueFilter";
import IssueTable, { IssueQuery, columnName } from "./IssueTable";
const IssuesPage = async ({ searchParams }: { searchParams: IssueQuery }) => {
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = { status };

  const orderBy = columnName.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });
  return (
    <Flex direction="column" gap="5">
      <Flex justify="between">
        <IssueFilter />
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

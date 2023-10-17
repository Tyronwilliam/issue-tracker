import { IssueStatusBadge, Link } from "@/app/components";
import prisma from "@/prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import IssueAction from "./IssueAction";
import IssueFilter from "./IssueFilter";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import { CaretSortIcon } from "@radix-ui/react-icons";
import Pagination from "@/app/components/Pagination";
const IssuesPage = async ({
  searchParams,
}: {
  searchParams: { status: Status; orderBy: keyof Issue; page: string };
}) => {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Tache", value: "title" },
    { label: "Statut", value: "status", className: "hidden md:table-cell" },
    {
      label: "Créer le",
      value: "createdAt",
      className: "hidden md:table-cell",
    },
  ];

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = { status };

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
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
    <div>
      <Flex mb="5" justify="between">
        <IssueFilter />
        <IssueAction />
      </Flex>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns?.map((column) => {
              return (
                <Table.ColumnHeaderCell
                  key={column.value}
                  className={column?.className}
                >
                  <NextLink
                    href={{
                      query: { ...searchParams, orderBy: column.value },
                    }}
                  >
                    {column.label}
                  </NextLink>
                  {column.value === searchParams.orderBy && (
                    <CaretSortIcon className="inline" />
                  )}
                </Table.ColumnHeaderCell>
              );
            })}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues?.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.RowHeaderCell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.RowHeaderCell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  );
};

export const dynamic = "force-dynamic";
export default IssuesPage;

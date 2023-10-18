import { IssueStatusBadge, Link } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
  user: string;
}
interface Props {
  searchParams: IssueQuery;
  issues?: Issue[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <>
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
          {issues?.map((issue) => {
            const date = new Date(issue.createdAt);
            const formatDate = date.toLocaleDateString(undefined, options);
            return (
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
                  {formatDate}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </>
  );
};
const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Tache", value: "title" },
  { label: "Statut", value: "status", className: "hidden md:table-cell" },
  {
    label: "Créer le",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
];

export const columnName = columns.map((colum) => colum.value);
export default IssueTable;

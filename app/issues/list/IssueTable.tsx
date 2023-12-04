import { CategorieCustom, Issue, Project, Status } from "@prisma/client";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Box, Flex, Table } from "@radix-ui/themes";
import NextLink from "next/link";
import FastCreationIssue from "./FastCreationIssue";
import IssueCells from "./IssueCells";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
  user: string;
  projectId: string;
}
export type IssueWithProject = Omit<Issue, "Project"> & { Project?: Project };

interface Props {
  searchParams: IssueQuery;
  issues?: IssueWithProject[];
  projectsAssociatedWithUser: Project[];
  allCategorie: CategorieCustom[];
}

const IssueTable = ({
  searchParams,
  issues,
  projectsAssociatedWithUser,
  allCategorie,
}: Props) => {
  return (
    <Flex
      align={"center"}
      gap={"4"}
      direction={"column"}
      width={"100%"}
      height={"100%"}
    >
      <Box width={"100%"}>
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
            <IssueCells issues={issues} allCategorie={allCategorie} />
          </Table.Body>
        </Table.Root>
      </Box>
      <Box>
        <FastCreationIssue
          projectsAssociatedWithUser={projectsAssociatedWithUser}
        />
      </Box>
    </Flex>
  );
};
const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Tache", value: "title" },
  { label: "Statut", value: "status", className: "hidden md:table-cell" },

  {
    label: "Minuteur",
    value: "title",
    className: "hidden md:table-cell",
  },
  {
    label: "Projet",
    value: "title",
    className: "hidden md:table-cell",
  },
  {
    label: "Créer le",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
];

export const columnName = columns.map((colum) => colum.value);
export default IssueTable;

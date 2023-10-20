import { Project } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import React from "react";
import { IssueStatusBadge, Link } from "../components";
interface Props {
  projects: Project[];
}
const ProjectsTable = ({ projects }: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Nom</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">
            Client
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">
            Temps
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">
            Facturation
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Avancement</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {projects?.map((project) => {
          return (
            <Table.Row key={project.id}>
              <Table.RowHeaderCell>
                <Link href={`/dashboard/projects/${project.id}`}>
                  {project.title}
                </Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={project.status} />
                </div>
              </Table.RowHeaderCell>
              <Table.Cell className="hidden md:table-cell">Client</Table.Cell>
              <Table.Cell className="hidden md:table-cell">Temps</Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                Facturation
              </Table.Cell>
              <Table.Cell>Avancement</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
};

export default ProjectsTable;

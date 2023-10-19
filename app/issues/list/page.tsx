import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import IssueAction from "./IssueAction";
import IssueFilterStatut from "./IssueFilterStatut";
import IssueFilterUser from "./IssueFilterUser";
import IssueTable, {
  IssueQuery,
  IssueWithProject,
  columnName,
} from "./IssueTable";
import ProjectFilter from "@/app/dashboard/ProjectFilter";
import { getProjectsAssociatedWithUser } from "@/app/utils/service/userRelation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CreateIssueUI from "@/app/components/CreateIssueUI";
import { use } from "react";
const IssuesPage = async ({ searchParams }: { searchParams: IssueQuery }) => {
  const session = await getServerSession(authOptions);

  const projectsAssociatedWithUser = await getProjectsAssociatedWithUser(
    session
  );
  const projectId = parseInt(searchParams.projectId);

  const projectIndex = projectsAssociatedWithUser.findIndex(
    (project) => project.id === projectId
  );
  const isIndexValid = projectIndex !== -1;

  const realId = isIndexValid ? projectId : undefined;
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

  const users = {
    some: {
      id: userId,
    },
  };
  const whereCondition: any = {
    status,
    projectId: realId,
  };
  if (userId !== undefined) {
    whereCondition.users = {
      some: {
        id: userId,
      },
    };
  }
  const issues = (await prisma.issue.findMany({
    where: whereCondition,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      Project: true,
    },
  })) as IssueWithProject[];

  const allUsers = await prisma.user.findMany({ orderBy: { name: "asc" } });

  const issueCount = await prisma.issue.count({
    where: {
      status,
      users,
      projectId: realId,
    },
  });

  const allIssueFromUser = await prisma.issue.findMany({
    take: 5,
    where: {
      users,
    },
  });

  return (
    <>
      {allIssueFromUser.length === 0 ? (
        <CreateIssueUI />
      ) : (
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
              <IssueFilterUser users={allUsers} />
              <ProjectFilter
                projects={projectsAssociatedWithUser}
                selectAll={true}
              />
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
      )}
    </>
  );
};

export const dynamic = "force-dynamic";
export default IssuesPage;

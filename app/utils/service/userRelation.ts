import prisma from "@/prisma/client";
import { Session } from "next-auth";

export const getProjectsAssociatedWithUser = async (
  session: Session | null
) => {
  const project = await prisma.project.findMany({
    where: {
      user: {
        some: {
          email: session?.user?.email,
        },
      },
    },
    include: {
      issueId: true,
    },
  });

  return project;
};
export const getProjectById = async (projectId: number) => {
  const id = await projectId;
  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });

  return project;
};

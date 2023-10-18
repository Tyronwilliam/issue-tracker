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
  });

  return project;
};

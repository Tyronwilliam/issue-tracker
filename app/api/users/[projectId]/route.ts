import prisma from "@/prisma/client";
import { Project, User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export type UserWithProject = Omit<User, "Project"> & { Project?: Project };

export async function GET(
  request: NextRequest,
  { params }: { params: { projectId: string } }
) {
  const projectId = params.projectId;

  if (!projectId) {
    return NextResponse.json(
      { error: "projectId is missing" },
      { status: 400 }
    );
  }

  const user = (await prisma.user.findMany({
    orderBy: {
      name: "asc",
    },
    where: {
      projectId: {
        some: {
          id: parseInt(projectId),
        },
      },
    },
  })) as UserWithProject[];

  return NextResponse.json(user, { status: 200 });
}

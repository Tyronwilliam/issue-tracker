import { projectSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validationIssue = projectSchema.safeParse(body);

  if (!validationIssue.success) {
    return NextResponse.json(validationIssue.error.format(), {
      status: 400,
    });
  }

  const { title, userId } = body;

  if (!userId) {
    return NextResponse.json(
      { error: "userId is required" },
      {
        status: 400,
      }
    );
  }
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      {
        status: 400,
      }
    );
  }
  const createProject = await prisma.project.create({
    data: {
      title: title,
      user: {
        connect: { id: userId },
      },
    },
  });
  return NextResponse.json(createProject, { status: 201 });
}

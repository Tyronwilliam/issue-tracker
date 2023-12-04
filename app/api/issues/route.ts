import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "../../validationSchema";
import { authOptions } from "../auth/[...nextauth]/route";
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();
  const validationIssue = issueSchema.safeParse(body);

  if (!validationIssue.success) {
    return NextResponse.json(validationIssue.error.format(), {
      status: 400,
    });
  }
  const { userId, projectId, title, description, timer } = body; // Replace with how you retrieve the user's ID

  const projects = await prisma.project.findMany({
    where: {
      user: {
        some: {
          id: userId,
        },
      },
    },
  });
  const isProjectAssignToUser = projects.some((el) => el.id === projectId);

  let data;

  if (typeof projectId === "number") {
    if (!isProjectAssignToUser) {
      return NextResponse.json(
        { error: "Invalid project id" },
        {
          status: 400,
        }
      );
    }
  }
  const newIssue = await prisma.issue.create({
    data: {
      title,
      description,
      projectId,
      timer,
      users: {
        connect: { id: userId }, // Connect the issue with the user
      },
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const issues = await prisma.issue.findMany({
    include: {
      Project: true,
    },
  });
  return NextResponse.json(issues, { status: 200 });
}

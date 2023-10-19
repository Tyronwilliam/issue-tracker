import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "../../validationSchema";
import { getServerSession } from "next-auth";
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
  const { userId, projectId } = body; // Replace with how you retrieve the user's ID

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
      projectId: projectId,
      users: {
        connect: { id: userId }, // Connect the issue with the user
      },
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}

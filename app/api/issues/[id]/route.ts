import { patchIssueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // const session = await getServerSession(authOptions);
  // if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validationIssue = patchIssueSchema.safeParse(body);

  if (!validationIssue.success) {
    return NextResponse.json(validationIssue.error.format(), {
      status: 400,
    });
  }
  const { userId, description, title } = body;
  if (userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user)
      return NextResponse.json(
        { error: "Invalid user." },
        {
          status: 400,
        }
      );
  }
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      assignees: true,
    },
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid id" }, { status: 404 });

  const existingAssignees = issue.assignees.map((assignee) => assignee.userId);
  if (!existingAssignees.includes(userId)) {
    await prisma.issueAssignee.create({
      data: {
        issueId: parseInt(params.id),
        userId,
      },
    });
  }
  const updateIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      userId,
    },
  });
  return NextResponse.json(updateIssue, { status: 200 });
}
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid id" }, { status: 404 });

  await prisma.issue.delete({
    where: { id: issue.id },
  });
  return NextResponse.json({ message: "Issue deleted" }, { status: 200 });
}

import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../../auth/[...nextauth]/route";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; issueId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const id = params?.id;
  const issueId = parseInt(params?.issueId);

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid id" }, { status: 404 });

  const creator = await prisma.creator.create({
    data: {
      users: {
        connect: {
          id: id,
        },
      },
      Issue: {
        connect: {
          id: issueId,
        },
      },
    },
  });

  return NextResponse.json(creator, { status: 200 });
}

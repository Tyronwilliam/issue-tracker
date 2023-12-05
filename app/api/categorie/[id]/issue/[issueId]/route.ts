import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

//('/api/issues/:issueId/categories/:categoryId'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; issueId: string } }
) {
  const { issueId, id } = params;
  const body = await request.json();
  const { isConnect } = body;

  // Check if the issue and category exist
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(issueId) },
  });
  if (!issue) {
    return NextResponse.json(
      { error: "Not found issue" },
      {
        status: 404,
      }
    );
  }
  const category = await prisma.categorieCustom.findUnique({
    where: { id: parseInt(id) },
  });

  if (!category) {
    return NextResponse.json(
      { error: "Not found categorie" },
      {
        status: 404,
      }
    );
  }
  const categorie = isConnect
    ? { connect: { id: parseInt(id) } }
    : { disconnect: { id: parseInt(id) } };

  const connected = await prisma.issue.update({
    where: { id: parseInt(issueId) },
    data: {
      categorie,
    },
  });
  return NextResponse.json(connected, { status: 200 });
}

import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

//('/api/issues/:issueId/categories/:categoryId'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; issueId: string } }
) {
  const { issueId, id } = params;
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

  // Associate the category with the issue
  const connected = await prisma.issue.update({
    where: { id: parseInt(issueId) },
    data: {
      categorie: {
        connect: { id: parseInt(id) },
      },
    },
  });
  return NextResponse.json(connected, { status: 200 });
}

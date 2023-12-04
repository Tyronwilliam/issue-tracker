import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const categorie = await prisma.categorieCustom.findMany();
  return NextResponse.json(categorie, { status: 200 });
}

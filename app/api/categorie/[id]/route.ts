import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";
import { authOptions } from "../../auth/[...nextauth]/route";
import { patchCategorieSchema } from "@/app/validationSchema";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  
  const body = await request.json();
  const validationCategorie = patchCategorieSchema.safeParse(body);

  if (!validationCategorie.success) {
    return NextResponse.json(validationCategorie.error.format(), {
      status: 400,
    });
  }

  const { title, hexCode } = body;
  const categorie = await prisma.categorieCustom.create({
    data: {
      title,
      hexCode,
      issue: {
        connect: { id: parseInt(params?.id) },
      },
    },
  });
  return NextResponse.json(categorie, { status: 200 });
}

import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { invitationSchema } from "../../validationSchema";
import { authOptions } from "../auth/[...nextauth]/route";
import {
  calculateExpirationDate,
  generateUniqueToken,
} from "@/app/utils/service/token";
import { sendInvitationLink } from "@/app/utils/service/mailing";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();
  const validationInvitation = invitationSchema.safeParse(body);

  if (!validationInvitation.success) {
    return NextResponse.json(validationInvitation.error.format(), {
      status: 400,
    });
  }
  const expirationDate = calculateExpirationDate(3600);

  // Envoyez l'invitationLink à l'utilisateur

  const { emails, projectId } = body;

  const sendEmail = emails?.map(async (email: string, index: number) => {
    const token = generateUniqueToken();
    const invitationLink = `${process.env.NEXT_PUBLIC_FRONT_URL}/accept-invitation?token=${token}`;

    const invitation = await prisma.invitation.create({
      data: {
        projectId: projectId,
        token: token,
        invitedEmail: email,
        expiresAt: expirationDate,
      },
    });
    console.log(invitation, "INVITATION PRISMA");
    if (invitation) {
      const htmlContent = `Vous avez reçu un lien d'invitation au projet de A remplir: Veuillez cliquer sur ce lien =>${invitationLink}
      
      Hello world`;
      const subject = "Vous reçu une invitation";
      const sendLink = await sendInvitationLink(email, htmlContent, subject);
      console.log(sendLink, "REPONSE SEND LINK");
    }
    return invitation;
  });
  console.log(sendEmail?.status, "SEND EMAIL");
  return NextResponse.json(sendEmail, { status: 200 });
}
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();
  const validationInvitation = invitationSchema.safeParse(body);

  if (!validationInvitation.success) {
    return NextResponse.json(validationInvitation.error.format(), {
      status: 400,
    });
  }
  const expirationDate = calculateExpirationDate(3600);

  // Envoyez l'invitationLink à l'utilisateur

  const { emails, projectId } = body;

  const sendEmail = emails?.map(async (email: string, index: number) => {
    const token = generateUniqueToken();
    const invitationLink = `${process.env.NEXT_PUBLIC_FRONT_URL}/accept-invitation?token=${token}`;

    const invitation = await prisma.invitation.create({
      data: {
        projectId: projectId,
        token: token,
        invitedEmail: email,
        expiresAt: expirationDate,
      },
    });
    console.log(invitation, "INVITATION PRISMA");
    if (invitation) {
      const htmlContent = `Vous avez reçu un lien d'invitation au projet de A remplir: Veuillez cliquer sur ce lien =>${invitationLink}
      
      Hello world`;
      const subject = "Vous reçu une invitation";
      const sendLink = await sendInvitationLink(email, htmlContent, subject);
      console.log(sendLink, "REPONSE SEND LINK");
    }
    return invitation;
  });
  console.log(sendEmail?.status, "SEND EMAIL");
  return NextResponse.json(sendEmail, { status: 200 });
}

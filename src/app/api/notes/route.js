import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import options from "../auth/[...nextauth]/options";

export async function POST(req,res) {
  const session = await getServerSession(options);
  if (!session) return NextResponse.redirect("/");
  console.log("Session:", session);


  const { textHeading, content } = await req.json();

  try {
    const sessionUser = await prisma.user.findFirst({
      where: { email: session.user.email },
    });
    const createdNote = await prisma.note.create({
      data: {
        userId: sessionUser.id,
        Heading: textHeading,
        NoteContent: JSON.stringify(content),
      },
    });
    return NextResponse.json(createdNote);
  } catch (error) {
    console.error("POST_ERROR", error);
    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 }
    );
  }
}

export async function GET(req, res) {
  const session = await getServerSession(options);
  if (!session) return NextResponse.redirect("/");


  try {
    const sessionUser = await prisma.user.findFirst({
      where: { email: session.user.email },
    });
    console.log(sessionUser);
    const allNotes = await prisma.note.findMany({
      where: {
        userId: sessionUser.id,
      },
    });
    // console.log("Fetched Notes:", allNotes);
    return NextResponse.json(allNotes);
  } catch (error) {
    console.error("GET_ERROR", error);
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 }
    );
  }
}

// export async function GET() {
//   try {
//     const allNotes = await prisma.note.findMany({});
//     return NextResponse.json(allNotes);
//   } catch (error) {
//     console.error("GET_ERROR", error);
//     return NextResponse.json(
//       { error: "Failed to fetch notes" },
//       { status: 500 }
//     );
//   }
// }

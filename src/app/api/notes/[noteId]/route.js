import { getServerSession } from "next-auth/next";
import options from "../../auth/[...nextauth]/options";

import { redirect } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req, { params }) {
  const session = await getServerSession(options);
  if (!session) redirect("/");
  const { noteId } = params;

  if (!noteId) {
    return new Response(JSON.stringify({ error: "noteId is required" }), {
      status: 400,
    });
  }

  const { textHeading, content } = await req.json();
  try {
    const Updatednote = await prisma.note.updateMany({
      where: {
        id: params.noteId,
      },
      data: {
        Heading: textHeading,
        NoteContent: JSON.stringify(content),
      },
    });
    return NextResponse.json(Updatednote);
  } catch (error) {
    console.log("POST_ERROR", error);
  }
}
export async function GET(request, { params }) {
  const { noteId } = params;

  if (!noteId) {
    return new Response(JSON.stringify({ error: "noteId is required" }), {
      status: 400,
    });
  }

  try {
    const updatedNote = await prisma.note.findMany({
      where: {
        id: noteId,
      },
    });
    return new Response(JSON.stringify(updatedNote), {
      status: 200,
    });
  } catch (error) {
    console.log("GET_ERROR", error);
    return new Response(JSON.stringify({ error: "Failed to fetch note" }), {
      status: 500,
    });
  }
}

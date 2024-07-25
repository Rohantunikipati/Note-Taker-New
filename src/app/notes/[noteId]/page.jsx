import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import React from "react";

import { prisma } from "@/lib/prisma";
import Form from "./_componets/Form";

const page = async ({ params }) => {
  const { noteId } = params;
  const session = await getServerSession(options);
  var InitialData;

  if (!session) redirect("/");
  try {
    InitialData = await prisma.note.findFirst({
      where: {
        id: noteId,
      },
    });
  } catch (error) {
    console.log("Feching Initial Data Error", error);
  }

  console.log(InitialData);

  return <Form initialData={InitialData} />;
};

export default page;

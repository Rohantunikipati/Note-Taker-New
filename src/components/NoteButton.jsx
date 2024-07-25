"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const NoteButton = () => {
  const router = useRouter();
  return <Button onClick={() => router.push("/notes/new")}>Add Note</Button>;
};

export default NoteButton;

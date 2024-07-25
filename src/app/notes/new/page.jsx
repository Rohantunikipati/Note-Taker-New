"use client";
import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

const Form = () => {
  console.log("Form Content is loaded");
  const router = useRouter();
  const [content, setContent] = useState("");
  const [textHeading, setTextHeading] = useState("");

  const loadContentFromLocalStorage = () => {
    const storedContent = localStorage.getItem("editorContent");
    return storedContent ? storedContent : "";
  };

  useEffect(() => {
    setContent(loadContentFromLocalStorage());
  }, []);

  const onSave = async () => {
    console.log("Saving");
    const storedContent = loadContentFromLocalStorage();
    console.log("Loaded Content from Local Storage", storedContent);
    console.log("Seted InitialContent");
    console.log(content);
    try {
      toast.loading("Creating", { id: 1 });
      const response = await axios.post("/api/notes", {
        textHeading,
        content: storedContent,
      });
      console.log(response.data);
      toast.success("Created", { id: 1 });
      router.push("/");
    } catch (error) {
      console.error("SAVE_ERROR", error);
    }
  };

  const handleEditorChange = jsonblock => {
    setContent(jsonblock);
  };

  return (
    <div className="relative px-20 py-5">
      <Heading setTextHeading={setTextHeading} initialData={textHeading} />
      <Editor />
      <Button onClick={onSave} className="absolute top-5 right-16">
        Create
      </Button>
    </div>
  );
};

export default Form;

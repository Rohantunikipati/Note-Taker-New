"use client";
import React, { useMemo, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Form = ({ initialData }) => {
  const router = useRouter();
  const [textHeading, setTextHeading] = useState(initialData.Heading);
  const [content, setContent] = useState("");

  const ButtonText = "Save";

  useEffect(() => {
    const storedContent = localStorage.getItem("editorContent");
    if (storedContent) {
      setContent(storedContent);
    }
  }, []);

  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    []
  );

  const onSave = async () => {
    console.log("Saving");
    const storedContent = localStorage.getItem("editorContent");
    try {
      toast.loading("Creating", { id: 2 });
      const response = await axios.post(`/api/notes/${initialData.id}`, {
        textHeading:textHeading,
        content: storedContent,
      });
      console.log(response.data);
      toast.success("Created", { id: 2 });
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
      <textarea
        placeholder="Untitled"
        onChange={e => setTextHeading(e.target.value)}
        value={textHeading}
        className="w-full font-bold appearance-none text-4xl mb-2 resize-none outline-none overflow-hidden"
      ></textarea>
      <Editor id={initialData.id} onChange={handleEditorChange} />
      <Button onClick={onSave} className="absolute top-5 right-16">
        {ButtonText}
      </Button>
    </div>
  );
};

export default Form;

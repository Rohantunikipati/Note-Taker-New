"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";


const InitialContent = () => {
  const [content, setContent] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/notes");
        setContent(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className=" grid grid-cols-3 gap-4">
      {content.length > 0 &&
        content.map((note, index) => (
          <Button
            variant="outline"
            className="px-10 py-16"
            key={index}
            onClick={() => router.push(`/notes/${note.id}`)}
          >
            <h1 className="text-3xl font-semibold" >{note.Heading}</h1>
          </Button>
        ))}
    </div>
  );
};

export default InitialContent;

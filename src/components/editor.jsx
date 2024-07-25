"use client";
import { BlockNoteEditor } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";

async function saveToStorage(jsonBlocks) {
  localStorage.setItem("editorContent", JSON.stringify(jsonBlocks));
}

export default function App({ id = null }) {
  const [initialContent, setInitialContent] = useState(null); // Initialize as null
  const [editor, setEditor] = useState(undefined);

  async function loadFromStorage() {
    if (id) {
      try {
        const response = await axios.get(`/api/notes/${id}`);
        console.log("API Response:", response);
        const { data } = response;

        // Check if data is an array and has at least one item
        if (Array.isArray(data) && data.length > 0) {
          const note = data[0]; // Get the first item from the array
          console.log("Note Data:", note);
          return note.NoteContent ? (note.NoteContent) : null;
        } else {
          return null;
        }
      } catch (error) {
        console.error("Error loading content", error);
        return null;
      }
    } else {
      return null;
    }
  }

  useEffect(() => {
    console.log("useEffect triggered with id:", id);
    loadFromStorage()
      .then(content => {
        if (content === null) {
          setInitialContent([
            {
              type: "paragraph",
              content: "Welcome to this demo!",
            },
          ]);
        } else {
          setInitialContent(JSON.parse(content));
          console.log("Content fetched:", content);
        }
      })
      .catch(error => {
        console.error("Error in loadFromStorage:", error);
      });
  }, [id]);

  useEffect(() => {
    if (initialContent !== null) {
      const newEditor = BlockNoteEditor.create({ initialContent });
      setEditor(newEditor);
    }
  }, [initialContent]);

  if (editor === undefined) {
    return "Loading content...";
  }

  // Renders the editor instance.
  return (
    <div className="-mx-[54px]">
      <BlockNoteView
        editor={editor}
        theme="light"
        onChange={() => {
          saveToStorage(editor.document);
        }}
      />
    </div>
  );
}

"use client";
import React from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

const Heading = ({ initialHeading, setTextHeading }) => {
  return (
    <ReactTextareaAutosize
      placeholder="Untitled"
      onChange={e => setTextHeading(e.target.value)}
      value={initialHeading}
      className="w-full font-bold appearance-none text-4xl mb-2 resize-none outline-none overflow-hidden"
    ></ReactTextareaAutosize>
  );
};

export default Heading;

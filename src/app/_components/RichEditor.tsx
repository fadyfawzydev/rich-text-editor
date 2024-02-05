"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import BundledEditor from "./tinyMce/BundledEditor";

const RichEditor = () => {
  // const [content, setContent] = useState<string>(""); // Initial content
  // const handleContentChange = (newContent: string) => {
  //   console.log("New content:", newContent);
  //   setContent(newContent);
  // };

  return (
    <>
      <BundledEditor />
      <div>
        <h2>HTML Content:</h2>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(RichEditor), {
  ssr: false,
});

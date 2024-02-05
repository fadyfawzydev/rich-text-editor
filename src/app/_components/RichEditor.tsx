"use client";

import dynamic from "next/dynamic";
import BundledEditor from "./tinyMce/BundledEditor";

const RichEditor = () => {
  return (
    <>
      <BundledEditor />
    </>
  );
};

export default dynamic(() => Promise.resolve(RichEditor), {
  ssr: false,
});

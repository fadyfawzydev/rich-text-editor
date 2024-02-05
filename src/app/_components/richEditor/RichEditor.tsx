"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ContentState, EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from "draft-convert";
import { EditorProps } from "react-draft-wysiwyg";
import EditorContainer from "./EditorContainer";
import draftToHtml from "draftjs-to-html";
import AddTableButton from "./customComponents/AddTableButton";

const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const RichEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [convertedContent, setConvertedContent] = useState("");

  const _contentState = ContentState.createFromText("Sample content state");
  const raw = convertToRaw(_contentState); // RawDraftContentState JSON
  const [contentState, setContentState] = useState(raw); // ContentState JSON

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);
  return (
    <div>
      {" "}
      <header className="App-header">Rich Text Editor Example</header>
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        toolbar={{
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          image: {
            previewImage: true,
            uploadCallback: (file: Blob) => {
              return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                  resolve({
                    data: {
                      url: reader.result as string,
                    },
                  });
                };

                reader.onerror = (reason) => reject(reason);

                reader.readAsDataURL(file);
              });
            },
            alt: { present: true, mandatory: true },
          },
        }}
        toolbarCustomButtons={[<AddTableButton key={1} editorState={editorState} onChange={setEditorState} />]}
      />
      {/* <EditorContainer /> */}
      <div className="container p-10 mx-auto">
        <h2>HTML</h2>
        <textarea
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
          readOnly
          className="w-full"
        />
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(RichEditor), {
  ssr: false,
});

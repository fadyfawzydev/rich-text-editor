"use client";

import dynamic from "next/dynamic";
import { ContentState, EditorState, convertToRaw } from "draft-js";
import React,{ useState, useEffect } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from "draft-convert";
import { EditorProps } from "react-draft-wysiwyg";
import ReactDOM from "react-dom";

const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const RichEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [convertedContent, setConvertedContent] = useState(null);

  const _contentState = ContentState.createFromText("Sample content state");
  const raw = convertToRaw(_contentState); // RawDraftContentState JSON
  const [contentState, setContentState] = useState(raw); // ContentState JSON
  const rootElement = document.getElementById("root");
  const root = createRoot(rootElement);
  
  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  return (

    ReactDOM.render(
      <React.StrictMode>
        <div>
      <h1>Draft JS</h1>
      <header className="App-header">Rich Text Editor Example</header>

      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
    </div>
      </React.StrictMode>,
      document.getElementById("root")
    
  );
};

export default dynamic(() => Promise.resolve(RichEditor), {
  ssr: false,
});

"use client";
import React, { useEffect, useRef, useState } from "react";
import "@draft-js-plugins/editor/lib/plugin.css";
import "@draft-js-plugins/inline-toolbar/lib/plugin.css";
import "tailwindcss/tailwind.css";

const Editor = dynamic(() => import("@draft-js-plugins/editor"), {
  ssr: false,
});
const createEditorStateWithText = dynamic(
  () => import("@draft-js-plugins/editor"),
  { ssr: false }
);
const createInlineToolbarPlugin = dynamic(
  () => import("@draft-js-plugins/inline-toolbar"),
  { ssr: false }
);

import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from "@draft-js-plugins/buttons";

import editorStyles from "./editorStyles.module.css";
import dynamic from "next/dynamic";
import { Separator } from "@draft-js-plugins/inline-toolbar";

const HeadlinesPicker: React.FC<{
  onOverrideContent: (content: React.ReactNode | null) => void;
}> = ({ onOverrideContent }) => {
  useEffect(() => {
    const onWindowClick = () => {
      // Call `onOverrideContent` again with `null`
      // so the toolbar can show its regular content again.
      onOverrideContent(null);
    };

    setTimeout(() => {
      window.addEventListener("click", onWindowClick);
    });

    return () => {
      window.removeEventListener("click", onWindowClick);
    };
  }, [onOverrideContent]);

  const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];

  return (
    <div>
      {buttons.map((Button, i) => (
        <Button key={i} onOverrideContent={onOverrideContent} />
      ))}
    </div>
  );
};

const HeadlinesButton: React.FC<{
  onOverrideContent: (content: React.ReactNode | null) => void;
}> = ({ onOverrideContent }) => {
  const onMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  const onClick = () => {
    onOverrideContent(
      <HeadlinesPicker onOverrideContent={onOverrideContent} />
    );
  };

  return (
    <div
      onMouseDown={onMouseDown}
      className={editorStyles.headlineButtonWrapper}
    >
      <button onClick={onClick} className={editorStyles.headlineButton}>
        H
      </button>
    </div>
  );
};

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;
const plugins = [inlineToolbarPlugin];
const text =
  "In this editor a toolbar shows up once you select part of the text …";

const CustomInlineToolbarEditor: React.FC = () => {
  const editorRef = useRef<any>(null);
  const [editorState, setEditorState] = useState(() =>
    createEditorStateWithText(text)
  );

  useEffect(() => {
    // fixing issue with SSR https://github.com/facebook/draft-js/issues/2332#issuecomment-761573306
    // eslint-disable-next-line react/no-did-mount-set-state
    setEditorState(createEditorStateWithText(text));
  }, []);

  const onChange = (newEditorState: any) => {
    setEditorState(newEditorState);
  };

  const focus = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  return (
    <div className={editorStyles.editor} onClick={focus}>
      <Editor
        editorKey="CustomInlineToolbarEditor"
        editorState={editorState}
        onChange={onChange}
        plugins={plugins}
        ref={editorRef}
      />
      <InlineToolbar>
        {(externalProps: any) => (
          <div>
            <BoldButton {...externalProps} />
            <ItalicButton {...externalProps} />
            <UnderlineButton {...externalProps} />
            <CodeButton {...externalProps} />
            <Separator {...externalProps} />
            <HeadlinesButton {...externalProps} />
            <UnorderedListButton {...externalProps} />
            <OrderedListButton {...externalProps} />
            <BlockquoteButton {...externalProps} />
            <CodeBlockButton {...externalProps} />
          </div>
        )}
      </InlineToolbar>
    </div>
  );
};

export default CustomInlineToolbarEditor;

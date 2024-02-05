import React, { useState } from "react";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html"; // Make sure you have the appropriate package

interface ShowHtmlButtonProps {
  editorState: EditorState;
  onChange: (editorState: EditorState) => void;
  onToggleHtmlView: (showHtml: boolean) => void;
}

const ShowHtmlButton: React.FC<ShowHtmlButtonProps> = (props) => {
  const [showHtml, setShowHtml] = useState<boolean>(false);
  const [originalContentState, setOriginalContentState] =
    useState<ContentState | null>(null);

  const toggleShowHide = () => {
    const { editorState, onChange } = props;

    if (showHtml) {
      // Switch back to the original content state
      if (originalContentState) {
        const newEditorState = EditorState.push(
          editorState,
          originalContentState,
          "change-block-data"
        );
        onChange(newEditorState);
      }
    } else {
      // Save the current content state and switch to HTML view
      const currentContentState = editorState.getCurrentContent();
      const htmlString = draftToHtml(convertToRaw(currentContentState));
      const contentState = ContentState.createFromText(htmlString);
      const newEditorState = EditorState.push(
        editorState,
        contentState,
        "change-block-data"
      );

      setOriginalContentState(currentContentState);
      onChange(newEditorState);
    }

    // Update the state and call the onToggleHtmlView callback
    setShowHtml((prevShowHtml) => !prevShowHtml);
    props.onToggleHtmlView(!showHtml);
  };

  return (
    <div
      className="rdw-option-wrapper"
      role="button"
      title={showHtml ? "Hide HTML" : "Show HTML"}
      onClick={toggleShowHide}
    >
      {showHtml ? "Hide HTML" : "Show HTML"}
    </div>
  );
};

export default ShowHtmlButton;

import React from "react";
import { EditorState, Modifier, ContentState, SelectionState } from "draft-js";

interface AddTableButtonProps {
  editorState: EditorState;
  onChange: (editorState: EditorState) => void;
}

const AddTableButton: React.FC<AddTableButtonProps> = (props) => {
  const addTable = () => {
    const { editorState, onChange } = props;
    const currentContent = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();

    // Define the HTML for a table with one row and one cell
    const tableHtml = "<table><tbody><tr><td></td></tr></tbody></table>";

    // Create a new ContentState for the table HTML
    const tableContentState = ContentState.createFromText(tableHtml);

    // Insert the table ContentState into the current content
    const newContentState = Modifier.replaceWithFragment(
      currentContent,
      selectionState,
      tableContentState.getBlockMap()
    );

    // Create a new EditorState with the modified content
    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      "insert-fragment"
    );

    // Update the editor state
    onChange(newEditorState);
  };

  return (
    <div
      className="custom-table-button"
      role="button"
      title="Add Table"
      onClick={addTable}
    >
      Add Table
    </div>
  );
};

export default AddTableButton;

import React, { Component, ChangeEvent } from "react";
import { Editor, EditorState, ContentState, convertToRaw } from "draft-js";
import { Editor as DraftEditor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface EditorContainerProps {}

interface EditorContainerState {
  editorState: EditorState;
}

export default class EditorContainer extends Component<
  EditorContainerProps,
  EditorContainerState
> {
  constructor(props: EditorContainerProps) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  onChange = (editorState: EditorState) => {
    this.setState({ editorState });
  };

  render() {
    const { editorState } = this.state;

    return (
      <div className="editor">
        <DraftEditor
          editorClassName="editor-container"
          editorState={editorState}
          onEditorStateChange={this.onChange}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
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
        />
        <textarea
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
          readOnly
        />
      </div>
    );
  }
}

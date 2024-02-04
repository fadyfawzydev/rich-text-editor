// "use client";

// import dynamic from "next/dynamic";
// import { Editor, EditorState, ContentState } from "draft-js";
// import { useState } from "react";
// import "draft-js/dist/Draft.css";

// const RichEditor = () => {
//   const [editorState, setEditorState] = useState(() =>
//     EditorState.createWithContent(ContentState.createFromText(""))
//   );

//   const onChange = (newEditorState: EditorState) => {
//     setEditorState(newEditorState);
//   };
//   return (
//     <div>
//         <h1>Draft JS</h1>
//       <Editor editorState={editorState} onChange={onChange}  />
//     </div>
//   );
// };

// export default dynamic(() => Promise.resolve(RichEditor), {
//   ssr: false,
// });

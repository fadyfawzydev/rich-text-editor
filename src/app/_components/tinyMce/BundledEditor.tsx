import React from "react";

import { Editor } from "@tinymce/tinymce-react";

if (typeof window !== "undefined") {
  require("tinymce/tinymce");
  require("tinymce/models/dom/model");
  require("tinymce/themes/silver");
  require("tinymce/icons/default");
  require("tinymce/plugins/advlist");
  require("tinymce/plugins/anchor");
  require("tinymce/plugins/autolink");
  require("tinymce/plugins/autoresize");
  require("tinymce/plugins/autosave");
  require("tinymce/plugins/charmap");
  require("tinymce/plugins/code");
  require("tinymce/plugins/codesample");
  require("tinymce/plugins/directionality");
  require("tinymce/plugins/emoticons");
  require("tinymce/plugins/fullscreen");
  require("tinymce/plugins/help");
  require("tinymce/plugins/image");
  require("tinymce/plugins/importcss");
  require("tinymce/plugins/insertdatetime");
  require("tinymce/plugins/link");
  require("tinymce/plugins/lists");
  require("tinymce/plugins/media");
  require("tinymce/plugins/nonbreaking");
  require("tinymce/plugins/pagebreak");
  require("tinymce/plugins/preview");
  require("tinymce/plugins/quickbars");
  require("tinymce/plugins/save");
  require("tinymce/plugins/searchreplace");
  require("tinymce/plugins/table");
  require("tinymce/plugins/template");
  require("tinymce/plugins/visualblocks");
  require("tinymce/plugins/visualchars");
  require("tinymce/plugins/wordcount");
  require("tinymce/plugins/emoticons/js/emojis");
}

// Editor styles
import "tinymce/skins/ui/oxide/skin.min.css";

// Content styles, including inline UI like fake cursors
/* eslint import/no-webpack-loader-syntax: off */
// import contentCss from 'tinymce/skins/content/dark/content.css'

// import contentCss from "!!raw-loader!tinymce/skins/content/default/content.min.css";
// import contentUiCss from "!!raw-loader!tinymce/skins/ui/oxide/content.min.css";

export default function BundledEditor(props: any) {
  const { init, onContentChange, ...rest } = props;

  const handleEditorChange = (content: string) => {
    if (onContentChange) {
      onContentChange(content);
    }
  };

  // note that skin and content_css is disabled to avoid the normal
  // loading process and is instead loaded as a string via content_style
  return (
    <Editor
      init={{
        ...init,
        forced_root_block: "", // Ensure no additional root block is added

        plugins:
          "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss directionality preview autoresize accordion fullscreen",
        toolbar:
          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight ltr rtl | tinycomments | checklist numlist bullist accordion indent outdent | emoticons charmap | removeformat | preview fullscreen",
        autoresize_overflow_padding: 50,
        min_height: 600,
        skin: false,
        content_css: false,
        content_style: [
          // contentCss,
          // contentUiCss,
          init?.content_style || "",
        ].join("\n"),
      }}
      onEditorChange={handleEditorChange}
      {...rest}
    />
  );
}

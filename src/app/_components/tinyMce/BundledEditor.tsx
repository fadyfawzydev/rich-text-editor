"use client";

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
import dynamic from "next/dynamic";

export function BundledEditor() {
  return (
    <Editor
      init={{
        forced_root_block: "", // Ensure no additional root block is added
        plugins:
          "print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable charmap  emoticons",
        toolbar:
          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
        autoresize_overflow_padding: 50,
        min_height: 600,
        image_advtab: true, // Enable the advanced image tab

        file_picker_types: "image", // Allow users to pick images

        file_picker_callback: (callback, value, meta) => {
          // Customize the file picker callback for image selection
          const input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");
          input.onchange = function () {
            const file = input.files?.[0]; // Use optional chaining to handle possible null value
            if (file) {
              const reader = new FileReader();

              reader.onload = function () {
                const imageUrl = reader.result as string;
                callback(imageUrl, { alt: file.name });
              };

              reader.readAsDataURL(file);
            }
          };

          input.click();
        },

        skin: false,
      }}
      // onEditorChange={handleEditorChange}
    />
  );
}

export default dynamic(() => Promise.resolve(BundledEditor), {
  ssr: false,
});

# TinyMCE Integration in Next.js 13 with TypeScript

This document provides a guide for integrating the TinyMCE rich text editor in a Next.js 13 project using TypeScript. We'll cover the installation process, creating a custom editor component, and ensuring proper client-side rendering.

## Installation

Start by installing the necessary packages for TinyMCE:

yarn add @tinymce/tinymce-react @types/tinymce tinymce

## Current versions of libraries

    "@tinymce/tinymce-react": "^4.3.2"
    "@types/tinymce": "^4.6.9"
    "tinymce": "^6.8.2"

## Creating the Editor Component

The BundledEditor component is a React component that integrates the TinyMCE editor. Below is a step-by-step explanation of its setup and configuration:

"use client";

import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import dynamic from "next/dynamic";

"use client" ensures that the component is rendered on the client-side.
@tinymce/tinymce-react is used for integrating the TinyMCE editor in React.
next/dynamic is used for dynamic imports, enabling client-side rendering.

## 2. Conditional Imports for TinyMCE

if (typeof window !== "undefined") {
// Tinymce core and plugins
require("tinymce/tinymce");
require("tinymce/themes/silver");
// ... other tinymce plugins
require("tinymce/plugins/wordcount");

// Emoticons plugin
require("tinymce/plugins/emoticons/js/emojis");
}

These imports are conditional (if (typeof window !== "undefined")) to prevent issues during server-side rendering, as TinyMCE is only meant to run in a browser environment as we've faced a problem that occurred during navigator isn't defined

## 3. Import Editor Styles

import "tinymce/skins/ui/oxide/skin.min.css";

## 4. Define the BundledEditor Component

The BundledEditor component is a functional component that returns the TinyMCE Editor component with specific configurations.

    Key Configurations:
    forced_root_block: "" to avoid additional root blocks.
    plugins and toolbar to define the available features and controls.
    autoresize_overflow_padding and min_height for layout adjustments.
    image_advtab: true to enable the advanced image tab.
    file_picker_callback to customize how files are picked, particularly for image insertion.

## 5. Dynamic Import for Client-Side Rendering

export default dynamic(() => Promise.resolve(BundledEditor), {
ssr: false,
});

Using next/dynamic with { ssr: false } ensures that the BundledEditor component is only rendered on the client-side, avoiding issues with server-side rendering of TinyMCE.

following these 

https://www.tiny.cloud/docs/tinymce/latest/full-featured-open-source-demo/
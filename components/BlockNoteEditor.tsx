"use client";

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView, darkDefaultTheme, Theme } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/utils/edgestore";
import { useState } from "react";
import { extractFileUrls } from "@/lib/extract-file-urls";

interface BlockNoteEditorProps {
  content?: string;
  editable: boolean;
  onChange: (content: string) => void;
}

const Editor = ({ content, onChange, editable }: BlockNoteEditorProps) => {
  const { edgestore } = useEdgeStore();
  const { resolvedTheme } = useTheme();
  const [previousContent, setPreviousContent] = useState<
    PartialBlock[] | undefined
  >(content ? JSON.parse(content) : undefined);
  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: content
      ? (JSON.parse(content) as PartialBlock[])
      : undefined,
    uploadFile: async (file: File) => {
      const res = await edgestore.publicFiles.upload({
        file,
      });
      return res.url;
    },
  });

  const handleChange = () => {
    const currentContent = editor.document;
    const previousFiles = extractFileUrls(previousContent);
    const currentFiles = extractFileUrls(currentContent);

    const deletedFiles = previousFiles.filter(
      (url) => !currentFiles.includes(url)
    );

    if (deletedFiles.length > 0) {
      deletedFiles.forEach((url) => {
        edgestore.publicFiles.delete({
          url,
        });
      });
    }
    setPreviousContent(currentContent);
    onChange(JSON.stringify(currentContent));
  };

  // Theme for dark mode, reusing the light theme with necessary changes
  const blackTheme = {
    colors: {
      editor: {
        text: "#ffffff", // Off-white for dark mode text
        background: "#030712", // Dark blue-gray background
        ...darkDefaultTheme,
      },
      ...darkDefaultTheme,
    },
  } satisfies Theme;

  return (
    <BlockNoteView
      editor={editor}
      editable={editable}
      className=""
      theme={resolvedTheme === "dark" ? blackTheme : "light"}
      onChange={handleChange}
      formattingToolbar={true}
      
    />
  );
};
export default Editor;

"use client";

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import {BlockNoteView} from "@blocknote/shadcn"
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css"
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/utils/edgestore";
import { useEffect, useState } from "react";
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
    // const stringContent = contentExtractor(currentContent);
    onChange(JSON.stringify(currentContent));
  };

  return (
    <BlockNoteView
      editor={editor}
      editable={editable}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      onChange={handleChange}
      formattingToolbar={true}
    />
  );
};
export default Editor;

"use client";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";

import { useTheme } from "next-themes";

type EditorProps = {
  content?: string;
};

function PublicEditor({ content }: EditorProps) {
  const { resolvedTheme } = useTheme();

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: content
      ? (JSON.parse(content) as PartialBlock[])
      : undefined,
  });

  return (
    <BlockNoteView
      editor={editor}
      editable={false}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
}

export default PublicEditor;

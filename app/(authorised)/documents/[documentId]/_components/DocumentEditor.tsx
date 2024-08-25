"use client";

import dynamic from "next/dynamic";
import { Id } from "@/convex/_generated/dataModel";
import { useMemo } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

interface DocumentEditorProps {
  role: string;
  _id: Id<"documents">;
  _creationTime: number;
  icon?: string | undefined;
  content?: string | undefined;
  description?: string | undefined;
  title: string;
  authorId: string;
  isPublic: boolean;
}

export const DocumentEditor = ({ _id, role, content }: DocumentEditorProps) => {
  const Editor = useMemo(
    () => dynamic(() => import("@/components/BlockNoteEditor"), { ssr: false }),
    []
  );

  const updateContent = useMutation(api.documents.updateDocumentContent);

  const onChange = (content: string) => {
    updateContent({ documentId: _id, content });
  };

  if (role !== "owner" && role !== "admin") {
    return (
      <div className="w-full border py-2  bg-card text-card-foreground shadow-sm min-h-full rounded-sm">
        <Editor editable={false} content={content} onChange={() => {}} />
      </div>
    );
  }

  return (
    <div className="w-full border py-2  bg-card text-card-foreground shadow-sm min-h-[90%] rounded-sm ">
      <Editor editable={true} content={content} onChange={onChange} />
    </div>
  );
};

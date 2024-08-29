"use client";

import dynamic from "next/dynamic";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import PublicEditor from "@/components/public-editor";
import { DocumentPageSkeleton } from "./document-page-skeleton";

const PrivateEditor = dynamic(() => import("@/components/private-editor"), {
  ssr: false,
});

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
  authorName: string;
}

export const DocumentEditor = ({ _id, role, content }: DocumentEditorProps) => {
  const me = useQuery(api.users.getMyData);

  if (me === undefined) {
    return <DocumentPageSkeleton />;
  }

  if (role !== "owner" && role !== "admin") {
    return (
      <div className="w-full border py-2  bg-card text-card-foreground shadow-sm min-h-full rounded-sm">
        <PublicEditor content={content} />
      </div>
    );
  }



  return (
    <LiveblocksProvider
      publicApiKey={
        "pk_dev_J2b1b8xIu5YK-lOwY6bSWD1INzHcFjAmQ4Ed7beZYJCLMCeNhEs5VNYDoGxiw7rG"
      }
    >
      <RoomProvider id={_id}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          <div className="w-full border py-2 bg-card dark:bg-slate-950 shadow-md min-h-[850px] rounded-sm ">
            <PrivateEditor
              color={
                (role as "owner" | "admin") === "owner" ? "#fecaca" : "#bbf7d0"
              }
              name={me.name}
              content={content}
              documentId={_id}
            />
          </div>
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};

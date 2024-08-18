"use client";

import { usePC } from "@/hooks/use-Pc";
import { cn } from "@/lib/utils";
import { useEditBar } from "@/store/use-edit-bar";
import { PublicInformation } from "./public-information";
import { StarButton } from "./star-button";
import { PublicButton } from "./public-button";
import { EditDocument } from "./edit-document";
import { CollaborationOptions } from "./collaboration-options";
import { Tags } from "./tags";
import { DocumentInformation } from "./document-information";
import { Id } from "@/convex/_generated/dataModel";

interface EditBarProps {
  role: string;
  isPublic: boolean;
  documentId:Id<"documents">
}

export const EditBar = ({ role, isPublic,documentId}: EditBarProps) => {
  const { isOpen } = useEditBar();
  const isPC = usePC();
  return (
    <div
      className={cn(
        "fixed right-0  h-[calc(100%-226px)] w-72 transition-transform z-[55]",
        !isPC && !isOpen && "translate-x-full"
      )}
    >
      <div className="w-full h-full border-t border-l flex flex-col gap-8 border-white pl-4 pr-4 md:pr-2 py-2 overflow-y-auto pb-20">
        <PublicInformation isPublic={isPublic} />
        <StarButton />
        <PublicButton role={role} isPublic={isPublic} documentId={documentId} />
        <div className={cn("w-full", role !== "owner" && "hidden")}>
          <EditDocument />
        </div>
        <CollaborationOptions role={role} documentId={documentId}/>
        <div className={cn("w-full", role !== "owner" && "hidden")}>
          <Tags />
        </div>
        <DocumentInformation role="owner" />
      </div>
    </div>
  );
};

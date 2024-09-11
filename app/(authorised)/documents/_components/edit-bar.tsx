"use client";

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
import { useState } from "react";

interface EditBarProps {
  role: string;
  isPublic: boolean;
  documentId: Id<"documents">;
  authorId: string;
  title: string;
  description?: string;
  createdAt: number;
}

export const EditBar = ({
  role,
  isPublic,
  documentId,
  title,
  authorId,
  description,
  createdAt,
}: EditBarProps) => {
  const { isOpen, onClose } = useEditBar();
  const [positionX, setPositionX] = useState<number | undefined>();
  return (
    <div
      onTouchMove={(e) => {
        if (positionX === undefined) {
          setPositionX(e.touches[0].clientX);
        }
        if (positionX && e.touches[0].clientX - positionX > 100) {
          setPositionX(undefined);
          onClose();
        }
      }}
      onTouchEnd={() => {
        setPositionX(undefined);
      }}
      // the edit bar,comes in two variation and sub-variations
      // the mobile and pc
      // each with a category for a compact and large header
      // the edit bar, is a fixed container, that starts directly below the header wrapper
      // therefore its height at any point will be the the difference between the full height and fixed top added to the header wrapper,
      //
      className={cn(
        "fixed right-0 h-[calc(100%-120px)] lg:h-[calc(100%-136px)] w-72 transition-transform z-[55] bg-[--light-bg2] dark:bg-[--dark-bg] overflow-y-auto  scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-600",
        !isOpen && "translate-x-full",
        role === "invited" && "h-[calc(100%-176px)] lg:h-[calc(100%-192px)]"
      )}
    >
      <div className="w-full min-h-full border-t border-l border-b flex flex-col gap-8 border-white pl-4 pr-4 md:pr-2 py-2 pt-8 pb-40">
        <PublicInformation isPublic={isPublic} title={title} />
        <StarButton
          isPublic={isPublic}
          documentId={documentId}
          authorId={authorId}
        />
        <PublicButton role={role} isPublic={isPublic} documentId={documentId} />
        {role === "owner" && (
          <div className={"w-full"}>
            <EditDocument documentId={documentId} title={title} />
          </div>
        )}

        <CollaborationOptions role={role} documentId={documentId} />
        <div
          className={cn(
            "w-full",
            role === "member" && "hidden",
            role === "invited" && " hidden"
          )}
        >
          <Tags documentId={documentId} />
        </div>
        <DocumentInformation
          role={role}
          description={description}
          documentId={documentId}
          createdAt={createdAt}
          title={title}
        />
      </div>
    </div>
  );
};

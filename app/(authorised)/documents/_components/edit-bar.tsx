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
  const isPC = usePC();
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
      className={cn(
        "fixed right-0 h-[calc(100%-226px)] w-72 transition-transform z-[55] bg-[--light-bg2] dark:bg-[--dark-bg]",
       !isOpen && "translate-x-full"
      )}
    >
      <div className="w-full h-full border-t border-l flex flex-col gap-8 border-white pl-4 pr-4 md:pr-2 py-2 overflow-y-auto pb-20  scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-600">
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

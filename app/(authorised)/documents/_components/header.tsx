"use client";

import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useEditBar } from "@/store/use-edit-bar";
import { ChevronLeft } from "lucide-react";
import { AcceptOrReject } from "../../feed/invitations/_components/accept-or-reject";
import { Skeleton } from "@/components/ui/skeleton";
import { IconPicker } from "../../_components/documents/emoji-picker";
import TextAreaAutoSize from "react-textarea-autosize";

import React, { ElementRef, useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { HeaderWrapper } from "../../_components/wrapper";

interface HeaderProps {
  documentId: Id<"documents">;
  role: string;
  icon?: string;
  title: string;
}

export const Header = ({ documentId, role, icon, title }: HeaderProps) => {
  const { onClose, isOpen, onOpen } = useEditBar();
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title);
  const updateTitle = useMutation(api.documents.updateMyDocument);

  const enableInput: React.MouseEventHandler<HTMLParagraphElement> = (e) => {
    e.preventDefault();
    if (role !== "owner") return;

    setIsEditing(true);
    setTimeout(() => {
      setValue(title);
      inputRef.current?.focus();
    }),
      0;
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onInput = (value: string) => {
    setValue(value);
    updateTitle({
      documentId,
      title: value || "untitled",
    });
  };

  const onKeyDown:
    | React.KeyboardEventHandler<HTMLTextAreaElement>
    | undefined = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      disableInput();
    }
  };

  return (
    <HeaderWrapper size={role ===  "invited" ? "large" : "compact"}>
      <div className="w-full h-full flex flex-col">
        <div className="flex items-center justify-between flex-1">
          <div className="flex items-center gap-1 truncate w-full max-w-[90%]">
            {role === "owner" && (
              <IconPicker documentId={documentId}>
                <span className="text-xl hover:text-2xl">{icon}</span>
              </IconPicker>
            )}
            <span className={cn("text-xl", role === "owner" && "hidden")}>
              {icon}
            </span>
            {isEditing && role === "owner" && (
              <TextAreaAutoSize
                ref={inputRef}
                onKeyDown={onKeyDown}
                onBlur={disableInput}
                value={value}
                onChange={(e) => onInput(e.target.value)}
                className="bg-transparent font-semibold break-words outline-none w-full text-[#3f3f3f] dark:text-[#cfcfcf] resize-none"
              />
            )}
            <p
              className={cn(
                "truncate lg:text-xl font-bold text-xl",
                isEditing && role === "owner" && "hidden"
              )}
              onDoubleClick={enableInput}
            >
              {title}
            </p>
          </div>
          <ChevronLeft
            onClick={() => {
              if (!isOpen) {
                onOpen();
              } else {
                onClose();
              }
            }}
            className={cn(
              "cursor-pointer transition-transform  hover:-translate-x-1",
              isOpen && "rotate-180 hover:translate-x-1"
            )}
          />
        </div>
        {role === "invited" && (
          <div className="w-full flex flex-col items-center gap-1 mt-1">
            <p className="text-xs opacity-80">
              You have been invited to co-author this document
            </p>
            <AcceptOrReject documentId={documentId} />
          </div>
        )}
      </div>
    </HeaderWrapper>
  );
};

export const HeaderSkeleton = () => {
  return (
    <div className="w-full xl:w-[calc(100%-256px)] h-24 flex flex-col">
      <Skeleton className="h-7 w-2/3" />
    </div>
  );
};

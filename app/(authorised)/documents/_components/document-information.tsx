"use client";

import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { formatTimestamp } from "@/lib/date-formatter";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { InfoIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface DocumentInformationProps {
  role?: string;
  documentId: Id<"documents">;
  description?: string;
  createdAt: number;
  title?:string;
}

export const DocumentInformation = ({
  role,
  documentId,
  description,
  createdAt,
  title
}: DocumentInformationProps) => {
  const [desc, setDesc] = useState<string | undefined>(description);
  const updateDescription = useMutation(
    api.documents.updateMyDocument
  );

  useEffect(() => {
    updateDescription({ documentId, description: desc });
  }, [desc,documentId,updateDescription]);

  const creationDate = formatTimestamp(createdAt);

  return (
    <div className="flex flex-col gap-4 mt-16">
      <div className="flex items-center gap-2">
        <InfoIcon size={20} />
        <p>Description</p>
      </div>
      <div
        className={cn(
          "w-full flex flex-col justify-center gap-2 ml-2",
          role !== "owner" && "hidden"
        )}
      >
        <Textarea
          rows={5}
          placeholder="Add description"
          className="resize-none w-full text-sm"
          value={desc}
          onChange={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDesc(e.target.value);
          }}
        />
        <p className="text-xs text-left opacity-80 cursor-help">
          Description is saved automatically.
        </p>
      </div>
      <p
        className={cn("text-xs ml-2 opacity-80 ", role === "owner" && "hidden")}
      >
        {description}
      </p>
      <div className="flex flex-col gap-2 ml-2 mt-6 opacity-80">
        <div className="flex flex-col">
          <p className="text-xs font-semibold gap-1">Creation date:</p>
          <p className="text-xs italic ml-4">{creationDate}</p>
        </div>
        {/* <div className="flex flex-col">
          <p className="text-xs font-semibold gap-1">Last updated at:</p>
          <p className="text-xs italic ml-4"> a date and time</p>
        </div> */}
      </div>
    </div>
  );
};

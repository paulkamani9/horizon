"use client";

import { TagsIcon } from "lucide-react";
import { TagItem, TagItemSkeleton } from "./tag-item";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useState } from "react";

interface TagsProps {
  documentId: Id<"documents">;
}

export const Tags = ({ documentId }: TagsProps) => {
  const [tag, setTag] = useState("");
  const allTags = useQuery(api.tags.getAllDocumentTags, {
    documentId,
  });

  const addTag = useMutation(api.tags.createTag);

  if (allTags === undefined) {
    return (
      <div>
        <TagItemSkeleton />
        <TagItemSkeleton />
        <TagItemSkeleton />
        <TagItemSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-16">
      <div className="flex items-center gap-2">
        <TagsIcon size={20} />
        <p>{"Tags (Keywords)"}</p>
      </div>
      <p className="text-wrap text-xs my-2 ml-2">
        Tags enable others to find your document while searching
      </p>
      {allTags && (
        <div className="flex items-center gap-2 ml-2 flex-wrap">
          {allTags.map((tag) => (
            <TagItem
              key={tag._id}
              documentId={documentId}
              tagId={tag._id}
              tag={tag.tag}
            />
          ))}
        </div>
      )}

      <div className="flex items-center w-full mt-4 gap-2 ml-2">
        <Input
          placeholder="Enter tag..."
          className="text-sm"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <button
          disabled={tag.trim() === ""}
          onClick={(e) => {
            e.stopPropagation();
            addTag({
              documentId,
              tag,
            });

            setTag("");
          }}
          className="bg-transparent disabled:opacity-60 text-sm border border-black dark:border-white py-1 px-2 rounded-sm"
        >
          Add
        </button>
      </div>
    </div>
  );
};

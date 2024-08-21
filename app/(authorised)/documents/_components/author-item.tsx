"use client";

import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { OwnerActions } from "./owner-actions";

interface AuthorItemProps {
  documentId: Id<"documents">;
  name: string;
  image: string;
  authorId: string;
  isAuthor: boolean;
  role: string;
}

export const AuthorItem = ({
  role,
  name,
  documentId,
  image,
  authorId,
  isAuthor,
}: AuthorItemProps) => {
  const { user } = useUser();
  return (
    <div className="w-full flex items-center justify-between ">
      <Link
        href={user?.id === authorId ? "/my-documents" : `/people/${authorId}`}
      >
        <div className="flex items-center gap-2 cursor-pointer ml-2">
          <div className="h-4 w-4 rounded-[50%] overflow-clip relative">
            <Image src={image} alt={name} fill />
          </div>
          <p className="text-sm truncate underline cursor-pointer">{name}</p>
        </div>
      </Link>
      <p
        className={cn(
          "text-[10px] py-1 px-2 bg-pink-500 rounded-sm",
          isAuthor !== true && "hidden"
        )}
      >
        Owner
      </p>
      <OwnerActions documentId={documentId} authorId={authorId} name={name}>
        <MoreVertical
          size={20}
          className={cn(
            role !== "owner" && "hidden",
            isAuthor === true && "hidden"
          )}
        />
      </OwnerActions>
    </div>
  );
};

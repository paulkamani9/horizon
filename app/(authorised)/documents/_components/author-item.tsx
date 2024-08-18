import { cn } from "@/lib/utils";
import { MoreVertical } from "lucide-react";
import Image from "next/image";

interface AuthorItemProps {
  name: string;
  image: string;
  authorId: string;
  isAuthor: boolean;
  role: string;
}

export const AuthorItem = ({
  role,
  name,
  image,
  isAuthor,
}: AuthorItemProps) => {
  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center gap-2 cursor-pointer ml-2">
        <div className="h-4 w-4 rounded-[50%] overflow-clip relative">
          <Image src={image} alt={name} fill />
        </div>
        <p className="text-sm truncate underline cursor-pointer">{name}</p>
      </div>
      <p
        className={cn(
          "text-[10px] py-1 px-2 bg-pink-500 rounded-sm",
          isAuthor !== true && "hidden"
        )}
      >
        Owner
      </p>
      <MoreVertical
        size={20}
        className={cn(
          role !== "owner" && "hidden",
          isAuthor === true && "hidden"
        )}
      />
    </div>
  );
};

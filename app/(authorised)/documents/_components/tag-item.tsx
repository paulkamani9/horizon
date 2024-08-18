import { XIcon } from "lucide-react";

export const TagItem = () => {
  return (
    <div className="flex py-1 px-2 items-center bg-[--light-bg2] text-wrap dark:bg-[--dark-bg2] gap-1 rounded-sm">
      <p className=" text-xs">a documentary on war that the usa has raged in the world</p>
      <XIcon size={16} className="stroke-red-500 cursor-pointer" />
    </div>
  );
};

import { TagsIcon } from "lucide-react";
import { TagItem } from "./tag-item";
import { Input } from "@/components/ui/input";

export const Tags = () => {
  return (
    <div className="flex flex-col mt-8">
      <div className="flex items-center gap-2">
        <TagsIcon size={20} />
        <p>{"Tags (Keywords)"}</p>
      </div>
      <p className="text-wrap text-xs my-2 ml-2">
        Tags enable others to find your document while searching
      </p>
      <div className="flex items-center gap-2 ml-2 flex-wrap">
        <TagItem />
        <TagItem />
        <TagItem />
        <TagItem />
        <TagItem />
      </div>

      <div className="flex items-center w-full mt-4 gap-2 ml-2">
        <Input placeholder="Enter tag..." className="text-sm"/>
        <button className="bg-transparent text-sm border border-black dark:border-white py-1 px-2 rounded-sm">
          Add
        </button>
      </div>
    </div>
  );
};

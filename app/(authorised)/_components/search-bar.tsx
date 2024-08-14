import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const SearchBar = () => {
  return (
    <div className="relative w-full">
      <Search size={16} className="absolute top-2 left-2 " />
      <Input className="bg-transparent border border-black dark:border-white  text-base  h-9  pl-10 " />
    </div>
  );
};

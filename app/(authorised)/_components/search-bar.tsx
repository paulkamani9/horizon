"use client";

import { Input } from "@/components/ui/input";
import { Search, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

export const SearchBar = () => {
  const pathname = usePathname();
 if(pathname === "/settings")
  return (
    <div className="h-9 w-full flex items-center justify-center gap-2 pr-12">
      <Settings className="hover:animate-bounce"/>
      <Settings className="hover:animate-bounce"/>
      <Settings className="hover:animate-bounce"/>
      <Settings className="hover:animate-bounce"/>
      <Settings className="hover:animate-bounce"/>
    </div>
  );
  return (
    <div className="relative w-full">
      <Search size={16} className="absolute top-2 left-2 " />
      <Input className="bg-transparent border border-black dark:border-white  text-base  h-9  pl-10" />
    </div>
  );
};

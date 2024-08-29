"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { SettingsHeader } from "./settings-header";
import { useSearchModal } from "@/store/use-search-modal";
import { SearchDialog } from "./search-dialog";

export const SearchBar = () => {
  const { onOpen } = useSearchModal();
  const pathname = usePathname();
  if (pathname === "/settings") return <SettingsHeader />;

  return (
    <div className="relative w-full">
      <div onClick={() => onOpen()}>
        <Search size={16} className="absolute top-2 left-2" />
        <Input className="bg-transparent border border-black dark:border-white  text-base  h-9  pl-10" />
      </div>
      <SearchDialog  />
    </div>
  );
};

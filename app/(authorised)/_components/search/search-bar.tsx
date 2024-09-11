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
    <div className="w-full">
      {/* mobile search component */}
      <Search
        size={24}
        className="lg:hidden"
        onClick={() => {
          onOpen();
        }}
      />

      {/* tablet and beyond */}
      <div className="lg:flex hidden relative w-full">
        {/* the size of the search bar here is 40px */}
        <div onClick={() => onOpen()} className="w-full">
          <Search size={16} className="absolute top-3 left-2" />
          <Input className="w-full h-10 pl-10 bg-transparent border border-black dark:border-white text-base" />
        </div>
        <SearchDialog />
      </div>
    </div>
  );
};

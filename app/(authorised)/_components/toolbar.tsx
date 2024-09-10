"use client";

import { Logo } from "@/components/Logo";
import { useSidebar } from "@/store/use-sidebar";
import { Menu } from "lucide-react";
import { SearchBar } from "./search/search-bar";
import { NewButton } from "./new-button";

export const Toolbar = () => {
  const { onOpen } = useSidebar();
  return (
    <section className="w-full">
      {/* mobile toolbar 
      padding-top and padding-bottom at 24px each
      size of all items is 24px.
      that gives the toolbar a cumulative size of 72px
      */}
      <div className="w-full flex lg:hidden items-center justify-between px-4 sm:px-6 py-6">
        <div>
          <Menu
            size={20}
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
          />
        </div>
        <div>
          <Logo size="Logo" />
        </div>
        <div>
          <SearchBar />
        </div>
      </div>

      {/* tablet and larger toolbar */}
      <div className="lg:flex hidden pl-6 pr-6 w-full items-center justify-start py-2  gap-6 xl:pr-16 pb-10">
        <div className="flex-1 ">
          <SearchBar />
        </div>
        <div className="inline-block">
          <NewButton />
        </div>
      </div>
    </section>
  );
};

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
      <div className="w-full flex lg:hidden items-center justify-between px-4 sm:px-6 md:px-10 py-6">
        <div>
          <Menu
            size={24}
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

      {/* tablet and larger toolbar
       we give a padding right of 72 to match th size of  the edit bar
       when it is fixed-open*/}
      <div className="lg:flex hidden px-6 lg:px-10 xl:px-16 2xl:px-20 py-6 w-full items-center justify-start gap-12">
        <SearchBar />
        <NewButton />
      </div>
    </section>
  );
};

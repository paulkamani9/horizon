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
      <div className="flex items-center justify-center py-2 md:hidden">
        <Logo size="Logo" />
      </div>
      <div className="flex pl-6 pr-6 w-full items-center justify-start py-2 md:py-10 gap-6 xl:pr-16 pb-10">
        <div className="lg:hidden">
          <Menu
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
          />
        </div>
        <div className="flex-1 ">
          <SearchBar />
        </div>
        <div className="hidden md:inline-block">
          <NewButton />
        </div>
      </div>
    </section>
  );
};

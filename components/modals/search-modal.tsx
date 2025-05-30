"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useSearchModal } from "@/store/use-search-modal";
import { Search } from "lucide-react";
import { useState } from "react";
import { SearchResults } from "@/app/(authorised)/_components/search/search-results";

export const SearchModal = () => {
  const { isOpen, onClose, initialValue } = useSearchModal((state) => state);
  const [search, setSearch] = useState(initialValue.search);

  // useEffect here to set search back to initial values each time dialog renders

  const [filter, setFilter] = useState<"documents" | "people">("documents");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=" -translate-y-28 top-[130px] w-[90%] md:max-w-2xl flex rounded-lg">
        <div className="flex flex-col w-full relative">
          <div className="flex flex-col static">
            <div className="w-full relative">
              <Search size={16} className="absolute top-2 left-2" />
              <Input
                className="bg-transparent border border-black dark:border-white text-base w-[95%]  h-9  pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="w-full flex items-center justify-around py-4 ">
              <Button
                variant={filter === "documents" ? "default" : "ghost"}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setFilter("documents");
                }}
              >
                Documents
              </Button>
              <Button
                variant={filter === "people" ? "default" : "ghost"}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setFilter("people");
                }}
              >
                People
              </Button>
            </div>
          </div>
          <div className="max-h-[25vh] xl:max-h-[50vh] overflow-y-auto border-t py-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-600 ">
            <SearchResults filter={filter} search={search} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

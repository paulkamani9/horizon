"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { UserResult, ResultSkeleton } from "./user-result";
import { DocumentResult } from "./document-result";

interface SearchResultsProps {
  filter: string;
  search: string;
}

export const SearchResults = ({ filter, search }: SearchResultsProps) => {
  const people = useQuery(api.users.getAllUsers, {
    search,
  });

  const documents = useQuery(api.search.searchDocuments, {
    search,
  });

  // people search results
  if (filter === "people") {
    if (people === undefined) {
      return (
        <div className="w-full flex flex-col gap-2">
          <ResultSkeleton />
          <ResultSkeleton />
          <ResultSkeleton />
        </div>
      );
    }
    if (people.length === 0) {
      return <p className="text-center opacity-80 italic">No results found</p>;
    }

    return (
      <div className="w-full flex flex-col gap-2">
        {people.map((person) => (
          <UserResult key={person._id} {...person} />
        ))}
      </div>
    );
  }

  // document search results

  if (documents === undefined) {
    return (
      <div className="w-full flex flex-col gap-2">
        <ResultSkeleton />
        <ResultSkeleton />
        <ResultSkeleton />
      </div>
    );
  }
  if (documents === null || documents.length === 0) {
    return <p className="text-center opacity-80 italic">No results found</p>;
  }

  return (
    <div className="max-w-full flex flex-col gap-2">
      {documents.map((document) => (
        <DocumentResult key={document._id} {...document} />
      ))}
    </div>
  );
};

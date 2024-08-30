"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { UserItem, UserItemSkeleton } from "./user-item";
import { EmptyState } from "../../feed/_components/empty-state";

export const UsersList = () => {
  const users = useQuery(api.users.getAllUsers, {});

  if (users === undefined) {
    return (
      <div className="w-full flex flex-col gap-y-6 ">
        <UserItemSkeleton />
        <UserItemSkeleton />
        <UserItemSkeleton />
        <UserItemSkeleton />
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <EmptyState imageSrc="/alone.svg" message="Guess who is alone....🧛🏽‍♂️" />
    )
  }

  return (
    <div className=" w-full flex flex-col items-center max-w-3xl gap-y-6 mx-auto">
      {users?.map(({ externalId, name, image, email }) => (
        <UserItem
          key={externalId}
          id={externalId}
          name={name}
          image={image}
          email={email}
        />
      ))}
    </div>
  );
};

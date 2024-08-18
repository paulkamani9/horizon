"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { UserItem, UserItemSkeleton } from "./user-item";

export const UsersList = () => {
  const users = useQuery(api.users.getAllUsers);

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

  return (
    <div className="w-full flex flex-col gap-y-6 ">
      {users?.map(({ externalId, name, image }) => (
        <UserItem key={externalId} id={externalId} name={name} image={image} />
      ))}
    </div>
  );
};

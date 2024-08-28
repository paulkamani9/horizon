"use client";

import { Id } from "@/convex/_generated/dataModel";
import { useSearchModal } from "@/store/use-search-modal";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface UserResultProps {
  _id: Id<"users">;
  _creationTime: number;
  name: string;
  email: string;
  image: string;
  externalId: string;
}

export const UserResult = ({ name, image, externalId }: UserResultProps) => {
  const router = useRouter();
  const { onClose } = useSearchModal();
  const onClickUser = () => {
    router.push(`/people/${externalId}`);
    onClose();
  };
  return (
    <div
      role="button"
      className="flex items-center border-b py-1 px-0.5 hover:bg-gray-100 dark:hover:bg-gray-800"
      onClick={onClickUser}
    >
      <div className="flex-1 flex items-center gap-2 truncate">
        <div className="relative w-4 aspect-square overflow-clip rounded-[50%]">
          <Image src={image} alt={name} fill objectFit="cover" />
        </div>
        <p className="font-semibold truncate">{name}</p>
      </div>
    </div>
  );
};

export const ResultSkeleton = () => {
  return <div className="w-8 h-4">.....</div>;
};

import { Skeleton } from "@/components/ui/skeleton";

export const FeedPageSkeleton = () => {
  return (
    <div className="w-full h-full flex flex-col items-center gap-2">
     <FeedItemSkeleton />
     <FeedItemSkeleton />
     <FeedItemSkeleton />
     <FeedItemSkeleton />
    </div>
  );
};

const FeedItemSkeleton = () => {
  return (
    <div className="h-20 w-full">
      <Skeleton className="h-full w-full" />
    </div>
  );
};

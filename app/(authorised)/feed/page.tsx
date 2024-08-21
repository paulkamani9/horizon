import { EmptyState } from "./_components/empty-state";

const FeedPage = () => {
  return (
    <div className="w-full h-full">
      <EmptyState
       message="You are free of all burdens."
       imageSrc="/mindfullness.png" />
    </div>
  );
};
export default FeedPage;

import { EmptyState } from "../_components/empty-state";

const MessagesPage = () => {
  return (
    <div className="h-full w-full">
      <EmptyState
        message="I am the master of my inbox."
        imageSrc="/message-clear.png"
      />
    </div>
  );
};

export default MessagesPage;

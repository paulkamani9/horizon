import { FollowButton } from "./follow-button";
import { MessageButton } from "./message-button";

interface FollowAndMessageProps {
  id: string;
}

export const FollowAndMessage = ({id}:FollowAndMessageProps) => {
  return (
    <div className="flex items-center gap-4">
      <FollowButton id={id}/>
      <MessageButton />
    </div>
  );
};

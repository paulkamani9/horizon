import { FollowButton } from "./follow-button";
import { MessageButton } from "./message-button";

interface FollowAndMessageProps {
  id: string;
  email: string;
  name: string;
}

export const FollowAndMessage = ({
  id,
  email,
  name,
}: FollowAndMessageProps) => {
  return (
    <div className="flex items-center gap-4">
      <FollowButton id={id} />
      <MessageButton id={id} email={email} name={name} />
    </div>
  );
};

import { Logo } from "./Logo";

export const Loading = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Logo size="Loader" />
      <span>Believe in you...</span>
    </div>
  );
};

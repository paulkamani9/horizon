import { PageWrapper } from "../_components/wrapper";
import { Header } from "./_components/header";

interface FeedLayoutProps {
  children: React.ReactNode;
}

const FeedLayout = ({ children }: FeedLayoutProps) => {
  return (
    <div className="h-full w-full px-2">
      <Header />
      <PageWrapper size="compact">{children}</PageWrapper>
    </div>
  );
};
export default FeedLayout;

import { PageWrapper } from "../_components/wrapper";
import { Header } from "./_components/header";

interface FeedLayoutProps {
  children: React.ReactNode;
}

const FeedLayout = ({ children }: FeedLayoutProps) => {
  return (
    <div className="h-full w-full px-2">
      <Header />
      {/* we overwrite the default PageWrapper margin to lower it
      so we take add the difference of 32 px from the max-height*/}
      <PageWrapper size="large" className=" mt-2 max-h-[calc(100%-104px)]">{children}</PageWrapper>
    </div>
  );
};
export default FeedLayout;

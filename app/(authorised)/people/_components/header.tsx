import { HeaderWrapper } from "../../_components/wrapper";

export const Header = () => {
  return (
    <HeaderWrapper size="compact">
      <div className="w-full flex items-start">
        <h1 className="text-xl font-semibold">People</h1>
      </div>
    </HeaderWrapper>
  );
};

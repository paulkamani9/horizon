interface HeaderWrapperProps {
  children: React.ReactNode;
}
// this page is made for layout safety, lol
export const HeaderWrapper = ({ children }: HeaderWrapperProps) => {
  return <div className="h-24 w-full">{children}</div>;
};

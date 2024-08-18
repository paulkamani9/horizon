interface PageWrapperProps {
  children: React.ReactNode;
}

export const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <div className="mt-10 max-h-[calc(100%-142px)] overflow-auto">
      {children}
    </div>
  );
};

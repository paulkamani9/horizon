interface PublicInformationProps {
  isPublic: boolean;
  title?:string
}

export const PublicInformation = ({ isPublic,title }: PublicInformationProps) => {
  return (
    <div className="w-full flex flex-col gap-6">
      <p className="text-xs opacity-80">
        {isPublic
          ? "This document is available publicly"
          : " This is a private document"}
      </p>
      <p className="text-sm opacity-80 text-center">
        Title: &ldquo;{title}&rdquo;
      </p>
    </div>
  );
};

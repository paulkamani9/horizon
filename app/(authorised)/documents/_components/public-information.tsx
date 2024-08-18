interface PublicInformationProps {
  isPublic: boolean;
}

export const PublicInformation = ({ isPublic }: PublicInformationProps) => {
  return (
    <div className="w-full ">
      <p className="text-xs opacity-80">
        {isPublic
          ? "This document is available publicly"
          : " This is a private document"}
      </p>
    </div>
  );
};

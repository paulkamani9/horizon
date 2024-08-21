import Image from "next/image";

interface EmptyStateProps {
  imageSrc: string;
  message: string;
}

export const EmptyState = ({ imageSrc, message }: EmptyStateProps) => {
  return (
    <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
      <div className="relative h-24 w-24">
        <Image src={imageSrc} alt={message} fill objectFit="center" />
      </div>
      <p className="text-sm opacity-80 italic">{message}</p>
    </div>
  );
};

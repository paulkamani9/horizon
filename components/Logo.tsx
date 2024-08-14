import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const LogoVariants = cva("tracking-[10px] font-bold", {
  variants: {
    size: {
      Loader: "text-[24px] md:text-[36px] animate-pulse",
      Icon: "text-[24px] md:text-[36px] ",
      Logo: "text-[24px]",
    },
  },
  defaultVariants: {
    size: "Logo",
  },
});

interface LogoProps extends VariantProps<typeof LogoVariants> {}

export const Logo = ({ size }: LogoProps) => {
  return <span className={cn(LogoVariants({ size }))}>Horizon</span>;
};

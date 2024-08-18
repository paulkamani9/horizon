import { useMediaQuery } from "usehooks-ts";

export const usePC = () => {
  const isPC = useMediaQuery("(min-width:1280px)");

  return isPC;
};

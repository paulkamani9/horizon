import { PartialBlock } from "@blocknote/core";

type BlockWithFileProps = PartialBlock & {
  props: {
    url: string;
  };
};

export const extractFileUrls = (blocks: PartialBlock[] | undefined) => {
  if (!blocks) return [];

  return blocks
    .filter((block): block is BlockWithFileProps =>
      ["audio", "file", "image", "video"].includes(block.type ?? "")
    )
    .map((block) => block.props.url)
    .filter((url): url is string => !!url);
};

import { PartialBlock } from "@blocknote/core";

type Content = {
  text: string;
};

type PartialBlockWithContent = {
    content:Content[]
}


export const contentExtractor = (blocks:PartialBlock[] | undefined) => {
if(!blocks) return "";

let text = "";
blocks.forEach(block=>{
    if((block as PartialBlockWithContent).content){
        (block as PartialBlockWithContent).content.forEach((content)=>{
            text+=content.text
        })
    }
})

return text
}

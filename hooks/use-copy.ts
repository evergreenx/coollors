
import * as React  from "react"


const useCopy = () => {
  const [copiedText, setCopiedText] = React.useState<string | null>(null);

  const copy = async (text: string) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return false;
    }

    // try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
    } catch (error) {
      console.error(`Failed copying the text ${text}`, error);
      setCopiedText(null);
    }
  };

  return {copiedText, copy};
};

export default useCopy;

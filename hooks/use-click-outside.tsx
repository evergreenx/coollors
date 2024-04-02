import React, { ReactHTMLElement } from "react";

export const useClickOutside = (callback: () => void) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const handleClick = (e: MouseEvent) => {
    callback();
  };
  React.useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  return ref
};

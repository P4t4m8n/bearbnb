import { useState } from "react";

export const useScroll = (
  ref: React.RefObject<HTMLUListElement> | null
): [boolean, (dir: number) => void] => {
  const [backVisible, setBackVisible] = useState(false);

  const onScrollBy = (dir: number) => {
    if (!ref || !ref.current) return;

    ref.current.scrollBy({
      left: 100 * dir,
      behavior: "smooth",
    });

    // Delay the check to allow the scroll to complete
    setTimeout(() => {
      if (ref.current && ref.current.scrollLeft > 0) {
        setBackVisible(true);
      } else {
        setBackVisible(false);
      }
    }, 200);
  };

  return [backVisible, onScrollBy];
};

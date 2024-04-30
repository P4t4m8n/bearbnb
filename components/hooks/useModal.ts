import React, { useEffect, useRef, useState, MouseEvent } from "react";

export const useModal = (
  ref: React.RefObject<HTMLDivElement>
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("click", checkClickOutside);
    return () => {
      document.removeEventListener("click", checkClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, ref]);

  const checkClickOutside = (ev: any) => {
    console.log("ev:", ev)
    console.log("ref.current:", ref.current)
    if (!ev.target) return;
    if (!open) return;
    if (ref.current?.contains(ev.target as Node)) return;
    setOpen(false);
  };
  return [open, setOpen];
};

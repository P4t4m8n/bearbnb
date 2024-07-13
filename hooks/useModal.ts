import { useEffect, useRef, useState, MouseEvent } from "react";

export const useModal = (
  ref: React.RefObject<
    HTMLDivElement | HTMLButtonElement | HTMLFormElement | HTMLUListElement
  >,
  callBack?: null | (() => void)
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("click", checkClickOutside);
    return () => {
      document.removeEventListener("click", checkClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, ref.current]);

  const checkClickOutside = (ev: any) => {
    if (!ev.target) return;
    if (!open) return;

    console.log("ref.current:", ref.current)
    console.log("ev.target:", ev.target)
    console.log("ref.current?.contains(ev.target as Node):", ref.current?.contains(ev.target as Node))
    if (ref.current?.contains(ev.target as Node)) return;

    setOpen(false);
    if (callBack) callBack();
  };

  return [open, setOpen];
};

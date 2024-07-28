import { useCallback, useEffect, useState } from "react";
export const useModal = (

  ref: React.RefObject<
    | HTMLDivElement
    | HTMLButtonElement
    | HTMLFormElement
    | HTMLUListElement
    | HTMLLIElement
  >,
  callBack?: null | (() => void)
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("click", checkClickOutside);
    return () => {
      document.removeEventListener("click", checkClickOutside);
    };
  }, [open, ref.current]);

  const checkClickOutside = (ev: any) => {
    if (!ev.target) return;
    if (!open) return;

    if (ref.current?.contains(ev.target as Node)) return;

    setOpen(false);
    if (callBack) callBack();
  };

  return [open, setOpen];
};

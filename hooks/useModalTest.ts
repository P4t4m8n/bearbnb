import { useCallback, useEffect, useState } from "react";

export const useModalTest = (
  ref:
    | HTMLDivElement
    | HTMLButtonElement
    | HTMLFormElement
    | HTMLUListElement
    | null,
  callBack?: null | (() => void)
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  console.log("ref:", ref);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("click", checkClickOutside);
    return () => {
      document.removeEventListener("click", checkClickOutside);
    };
  }, [open, ref]);

  const checkClickOutside = useCallback(
    (ev: any) => {
      if (!ev.target) return;
      if (!open) return;
      if (!ref) return;
      console.log("ev.target :", ev.target);
      console.log("ref.current:", ref);

      if (ref?.contains(ev.target as Node)) return;

      setOpen(false);
      // if (callBack) callBack();
    },
    [ref]
  );

  return [open, setOpen];
};

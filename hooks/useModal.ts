import { useEffect, useState } from "react";

export const useModal = (
  ref: React.RefObject<
    HTMLDivElement | HTMLButtonElement | HTMLFormElement | HTMLUListElement
  >,
  callBack?: null | (() => void)
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [open, setOpen] = useState(false);
  console.log("open:", open)
  
  useEffect(() => {
    document.addEventListener("click", checkClickOutside);
    return () => {
      document.removeEventListener("click", checkClickOutside);
    };
  }, [open,ref.current]);
  
  const checkClickOutside = (ev: any) => {
    if (!ev.target) return;
    console.log("open:", open);
    if (!open) return;
    
    console.log("is:", ref.current?.contains(ev.target as Node))
    if (ref.current?.contains(ev.target as Node)) return;
    
    setOpen(false);
    if (callBack) callBack();
  };

  return [open, setOpen];
};

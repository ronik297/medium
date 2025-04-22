import { useEffect, useRef } from "react";

function useOutsideClick({ handler }: { handler: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        console.log("clicked outside", event.target);
        handler();
      }
      console.log("clicked inside", event.target);
    };

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [handler]);

  return ref;
}

export default useOutsideClick;

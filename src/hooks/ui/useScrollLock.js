import { useEffect } from "react";

const useScrollLock = (isLocked) => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const body = document.body;
    const originalOverflow = body.style.overflow;

    if (isLocked) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = originalOverflow || "auto";
    }

    return () => {
      body.style.overflow = originalOverflow || "auto";
    };
  }, [isLocked]);
};

export default useScrollLock;
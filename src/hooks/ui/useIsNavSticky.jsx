import { isNavStickyContext } from "src/contexts/isNavSticky";
import { useContext } from "react";

export default function useIsNavStickyContext() {
  return useContext(isNavStickyContext);
}

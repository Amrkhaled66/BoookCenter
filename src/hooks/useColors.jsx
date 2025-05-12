import { useContext } from "react";

import { ColorsContext } from "../contexts/colors";

export default function useColors() {
  return useContext(ColorsContext);
}

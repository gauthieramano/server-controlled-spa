import { createContext } from "react";

type VisibilityState = {
  isCguAccepted: boolean;
  setIsCguAccepted: React.Dispatch<React.SetStateAction<boolean>>;
};

const VisibilityContext = createContext<VisibilityState | null>(null);

export default VisibilityContext;

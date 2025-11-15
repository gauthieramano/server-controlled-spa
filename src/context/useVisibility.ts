import { useContext } from "react";
import VisibilityContext from "./visibility";

const useVisibility = () => {
  const context = useContext(VisibilityContext);

  if (!context) {
    throw new Error("`useVisibility` must be inside `Providers`");
  }

  return context;
};

export default useVisibility;

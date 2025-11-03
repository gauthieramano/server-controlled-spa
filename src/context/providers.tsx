import { type ReactNode, useState } from "react";
import VisibilityContext from "./visibility";

type Props = { children: ReactNode };

export default function Providers({ children }: Props) {
  const [isCguAccepted, setIsCguAccepted] = useState(false);

  return (
    <VisibilityContext value={{ isCguAccepted, setIsCguAccepted }}>
      {children}
    </VisibilityContext>
  );
}

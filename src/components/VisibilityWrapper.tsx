import { Activity } from "react";
import useVisibility from "../context/useVisibility";
import { isConditionCguAccepted } from "../utils/typeGuards";
import type { Condition } from "../utils/types";

type Props = {
  visibleIf: Condition | undefined;
  children: React.ReactNode;
};

export default function VisibilityWrapper({ visibleIf, children }: Props) {
  const { isCguAccepted } = useVisibility();

  let isVisible = true;

  if (visibleIf && isConditionCguAccepted(visibleIf)) {
    isVisible = visibleIf["accept-cgu"] ? isCguAccepted : !isCguAccepted;
  }

  return (
    <Activity mode={isVisible ? "visible" : "hidden"}>{children}</Activity>
  );
}

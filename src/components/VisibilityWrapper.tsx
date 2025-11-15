import { Activity } from "react";
import { match } from "ts-pattern";
import useVisibility from "../context/useVisibility";
import { isConditionCguAccepted } from "../utils/typeGuards";
import type { Condition } from "../utils/types";

type Props = {
  visibleIf: Condition | undefined;
  children: React.ReactNode;
};

export default function VisibilityWrapper({ visibleIf, children }: Props) {
  const { isCguAccepted } = useVisibility();

  const isVisible = match(visibleIf)
    .with(undefined, () => true)
    .when(isConditionCguAccepted, (visibleIf) =>
      visibleIf["accept-cgu"] ? isCguAccepted : !isCguAccepted,
    )
    .exhaustive(() => true);

  return (
    <Activity mode={isVisible ? "visible" : "hidden"}>{children}</Activity>
  );
}

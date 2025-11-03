import useVisibility from "../context/useVisibility";
import type { PropsLabel } from "../utils/types";

export default function AcceptCGU({ label }: PropsLabel) {
  const { isCguAccepted, setIsCguAccepted } = useVisibility();

  return (
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={isCguAccepted}
        onChange={(event) => setIsCguAccepted(event.target.checked)}
      />
      {label}
    </label>
  );
}

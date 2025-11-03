import { useState } from "react";
import type { PropsLabel } from "../utils/types";

export default function AcceptCGU({ label }: PropsLabel) {
  const [isCguAccepted, setIsCguAccepted] = useState(false);

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

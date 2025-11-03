import { useState } from "react";
import type { PropsLabel } from "../utils/types";

export default function AcceptCGU({ label }: PropsLabel) {
  const [checked, setChecked] = useState(false);
  return (
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      {label}
    </label>
  );
}

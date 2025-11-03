import { useState } from "react";

export default function AcceptCGU({ label }: { label: string }) {
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

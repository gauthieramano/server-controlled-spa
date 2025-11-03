import type { PropsLabel } from "../utils/types";

export default function Button({ label }: PropsLabel) {
  return (
    <button className="rounded bg-blue-500 p-2 text-white">{label}</button>
  );
}

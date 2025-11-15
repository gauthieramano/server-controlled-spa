export default function Button({ label }: { label: string }) {
  return (
    <button className="rounded bg-blue-500 p-2 text-white">{label}</button>
  );
}

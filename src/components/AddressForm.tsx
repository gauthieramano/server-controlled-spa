import type { PropsDefault } from "../utils/types";

export default function AddressForm({ default: defaultValue }: PropsDefault) {
  return (
    <form>
      <input
        type="text"
        defaultValue={defaultValue}
        className="w-full border p-2"
      />
    </form>
  );
}

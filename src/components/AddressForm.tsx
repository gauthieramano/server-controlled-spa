export default function AddressForm({
  default: defaultValue,
}: {
  default: string;
}) {
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

import { match } from "ts-pattern";
import type { NameProps } from "../utils/types";
import AcceptCGU from "./AcceptCGU";
import AddressForm from "./AddressForm";
import Button from "./Button";

type Props = { nameProps: NameProps };

export default function IntentComponent({ nameProps }: Props) {
  return match(nameProps)
    .with({ name: "accept-cgu" }, ({ props }) => <AcceptCGU {...props} />)
    .with({ name: "address-form" }, ({ props }) => <AddressForm {...props} />)
    .otherwise(({ props }) => <Button {...props} />);
}

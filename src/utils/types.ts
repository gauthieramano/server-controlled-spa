export type PropsLabel = { label: string };
export type PropsDefault = { default: string };

type VisibleIf = { "visible-if"?: Record<string, string | boolean> };

type IntentAcceptCgu = { "accept-cgu": PropsLabel & VisibleIf };
type IntentAddressForm = { "address-form": PropsDefault & VisibleIf };
type IntentButton = { button: PropsLabel & VisibleIf };

type NamePropsKeyAcceptCgu = ["accept-cgu", PropsLabel, string];
type NamePropsKeyAddressForm = ["address-form", PropsDefault, string];
type NamePropsKeyButton = ["button", PropsLabel, string];

export type NamePropsKey =
  | NamePropsKeyAcceptCgu
  | NamePropsKeyAddressForm
  | NamePropsKeyButton;

export type Intents = Partial<
  IntentAcceptCgu & IntentAddressForm & IntentButton
>;

export type ScreenIdToIntentsMap = {
  [screenId: string]: Intents | undefined;
};

export type Step = "initial" | "loading" | "fetched";

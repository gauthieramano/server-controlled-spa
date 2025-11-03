export type PropsLabel = { label: string };
export type PropsDefault = { default: string };

type VisibleIf = { "visible-if"?: Record<string, string | boolean> };

type IntentAcceptCgu = { "accept-cgu": PropsLabel & VisibleIf };
type IntentAddressForm = { "address-form": PropsDefault & VisibleIf };
type IntentButton = { button: PropsLabel & VisibleIf };

type Options = {
  key: string;
};

type NamePropsOptionsAcceptCgu = ["accept-cgu", PropsLabel, Options];
type NamePropsOptionsAddressForm = ["address-form", PropsDefault, Options];
type NamePropsOptionsButton = ["button", PropsLabel, Options];

export type NamePropsOptions =
  | NamePropsOptionsAcceptCgu
  | NamePropsOptionsAddressForm
  | NamePropsOptionsButton;

export type Intents = Partial<
  IntentAcceptCgu & IntentAddressForm & IntentButton
>;

export type ScreenIdToIntentsMap = {
  [screenId: string]: Intents | undefined;
};

export type Step = "initial" | "loading" | "fetched";

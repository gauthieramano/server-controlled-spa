export type PropsLabel = { label: string };
export type PropsDefault = { default: string };

type VisibleIf = { "visible-if"?: Record<string, string | boolean> };

type IntentAcceptCgu = { "accept-cgu": PropsLabel & VisibleIf };
type IntentAddressForm = { "address-form": PropsDefault & VisibleIf };
type IntentButton = { button: PropsLabel & VisibleIf };

export type Intents = Partial<
  IntentAcceptCgu & IntentAddressForm & IntentButton
>;

export type ScreenIdToIntentsMap = {
  [screenId: string]: Intents | undefined;
};

export type Step = "initial" | "loading" | "fetched";

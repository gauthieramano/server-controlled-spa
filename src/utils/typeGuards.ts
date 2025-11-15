import type { Condition, ConditionCguAccepted, Intents } from "./types";

type ResponseValid = { intents: Intents };
type ResponseError = { error: string };
type Response = ResponseValid | ResponseError;

export const isResponseError = (
  response: Response,
): response is ResponseError => "error" in response;

export const isConditionCguAccepted = (
  visibleIf: Condition,
): visibleIf is ConditionCguAccepted => "accept-cgu" in visibleIf;

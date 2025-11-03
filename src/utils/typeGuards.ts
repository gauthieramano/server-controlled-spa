import type { Intents } from "./types";

type ResponseValid = { intents: Intents };
type ResponseError = { error: string };
type Response = ResponseValid | ResponseError;

export const isResponseError = (
  response: Response,
): response is ResponseError => "error" in response;

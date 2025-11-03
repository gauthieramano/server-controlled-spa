import type { ScreenIdToIntentsMap } from "../utils/types";

/**
 * `screenIdToIntents` is typed as `ScreenIdToIntentsMap`, so it can be called
 * with any string as a key, therefore the type of each resulting value is:
 * - `Intents` when the key is a proper screen_id
 * - `undefined` otherwise
 */
export const screenIdToIntentsMap: ScreenIdToIntentsMap = {
  "page-a": {
    "address-form": { default: "16 RUE DE LA VILLE LEVEQUE 75008 PARIS" },
    button: { label: "Envoyer" },
  },

  "page-b": {
    "accept-cgu": { label: "J’accepte les CGU" },
    "address-form": {
      default: "16 RUE DE LA VILLE LEVEQUE 75008 PARIS",
      "visible-if": { "accept-cgu": true },
    },
    button: { label: "Envoyer" },
  },
};

import type { Intents, ScreenIdToIntentsMap } from "../utils/types";

/**
 * `intents` is typed as `ScreenIdToIntentsMap`, so it can be called with any
 * string as a key, therefore the type of each resulting value is:
 * - `Intents` when the key is a proper screen_id
 * - `undefined` otherwise
 */
const intents: ScreenIdToIntentsMap = {
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

export function fetchIntents(screenId: string) {
  // Simulation d'un délais de réponse de la part du serveur entre 50ms et 1s
  return new Promise<Intents | undefined>((resolve) => {
    setTimeout(() => resolve(intents[screenId]), 50 + Math.random() * 950);
  });
}

import { useParams } from "react-router";
import Providers from "../context/providers.tsx";
import useFetch from "../hooks/useFetch.ts";
import type { NamePropsKey } from "../utils/types.ts";
import AcceptCGU from "./AcceptCGU.tsx";
import AddressForm from "./AddressForm.tsx";
import Button from "./Button.tsx";

export default function ScreenRenderer() {
  // récupération de l'identifiant de l'écran à partir de l'URL
  const { screenId } = useParams();

  // Throw early to make sure to track bad router config (useful for monitoring)
  // Additional benefit: to avoid non-null assertions
  if (!screenId) {
    throw new Error("`:screenId` missing in the path for `ScreenRenderer`");
  }

  const { intents, step, error } = useFetch(`/intent/${screenId}`);

  // Render nothing to avoid any flickering
  if (step === "initial") {
    return null;
  }

  if (step === "loading") {
    return "Loading…";
  }

  if (error) {
    return error;
  }

  // Throw to make sure to track bad response (useful for monitoring & typing)
  if (!intents) {
    throw new Error(`Empty screen: no intents found for \`${screenId}\``);
  }

  /* ******************************************************
   *     step: "fetched"     |    tuple & main render     *
   ****************************************************** */

  const namePropsKeys = Object.entries(intents).map(([name, intent], index) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { "visible-if": _, ...props } = intent;

    // As the intents order is fixed, `index` can be safely used for keys
    return [name, props, `${screenId}_${index}`] as NamePropsKey;
  });

  // À RÉALISER :
  // Ici, vous devez :
  // 5. Bonus : Gérer les conditions d'affichage si l'intent possède un champ "visible-if".

  return (
    <div className="p-4">
      <p className="mb-2 font-bold text-xl">Écran dynamique : {screenId}</p>

      <div className="flex min-w-md flex-col gap-4">
        <Providers>
          {namePropsKeys.map(([name, props, key]) => (
            <div key={key}>
              {name === "accept-cgu" ? (
                <AcceptCGU {...props} />
              ) : name === "address-form" ? (
                <AddressForm {...props} />
              ) : (
                <Button {...props} />
              )}
            </div>
          ))}
        </Providers>
      </div>
    </div>
  );
}

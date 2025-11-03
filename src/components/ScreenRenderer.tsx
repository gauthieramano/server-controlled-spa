import { useEffect, useState } from "react";
import { useParams } from "react-router";
import simulatedFetch from "../mock/simulatedFetch.ts";
import { isResponseError } from "../utils/typeGuards.ts";
import type { Intents, Step } from "../utils/types.ts";

export default function ScreenRenderer() {
  // récupération de l'identifiant de l'écran à partir de l'URL
  const { screenId } = useParams();

  // Throw early to make sure to track bad router config (useful for monitoring)
  // Additional benefit: to avoid non-null assertions
  if (!screenId) {
    throw new Error("`:screenId` missing in the path for `ScreenRenderer`");
  }

  const [intents, setIntents] = useState<Intents>();
  const [step, setStep] = useState<Step>("initial");
  const [error, setError] = useState("");

  useEffect(() => {
    setStep("loading");

    simulatedFetch(`/intent/${screenId}`).then((response) => {
      setStep("fetched");

      if (isResponseError(response)) {
        setError(response.error);
        return;
      }

      setError("");
      setIntents(response.intents);
    });
  }, [screenId]);

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

  // À RÉALISER :
  // Ici, vous devez :
  // 3. Parcourir dynamiquement les intents reçus.
  // 4. Pour chaque intent, afficher le composant correspondant avec ses props.

  // 5. Bonus : Gérer les conditions d'affichage si l'intent possède un champ "visible-if".

  return (
    <div className="p-4">
      <p className="mb-2 font-bold text-xl">Écran dynamique : {screenId}</p>

      <pre className="text-left">{JSON.stringify(intents, null, 2)}</pre>
    </div>
  );
}

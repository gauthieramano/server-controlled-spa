import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchIntents } from "../mock/intents.ts";
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

  useEffect(() => {
    setStep("loading");

    fetchIntents(screenId).then((value) => {
      setStep("fetched");
      setIntents(value);
    });
  }, [screenId]);

  // Render nothing to avoid any flickering
  if (step === "initial") {
    return null;
  }

  if (step === "loading") {
    return "Loading…";
  }

  if (!intents) {
    return `Missing screen_id: no intents found for \`${screenId}\``;
  }

  // À RÉALISER :
  // Ici, vous devez :
  // 1. Simuler un appel à /intent/:screen_id (les données sont fournies dans /src/mock/intents.ts).
  // 2. En fonction du screen_id, sélectionner un des deux payloads (simple ou avec visible-if).
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

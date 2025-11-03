import { useParams } from "react-router";
import useFetch from "../hooks/useFetch.ts";

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

import { useEffect, useState } from "react";
import simulatedFetch from "../mock/simulatedFetch";
import { isResponseError } from "../utils/typeGuards";
import type { Intents, Step } from "../utils/types";

const useFetch = (apiRoute: string) => {
  const [intents, setIntents] = useState<Intents>();
  const [step, setStep] = useState<Step>("initial");
  const [error, setError] = useState("");

  useEffect(() => {
    setStep("loading");

    simulatedFetch(apiRoute).then((response) => {
      setStep("fetched");

      if (isResponseError(response)) {
        setError(response.error);
        return;
      }

      setError("");
      setIntents(response.intents);
    });
  }, [apiRoute]);

  return { intents, step, error };
};

export default useFetch;

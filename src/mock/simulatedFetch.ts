import { wait } from "./helpers";
import { screenIdToIntentsMap } from "./intents";

type Groups = { screenId: string };
type Result = RegExpExecArray & { groups: Groups };

/**
 * WHEN:
 * ```ts
 * const result = REGEX.exec("/intent/kebab-case-screen-id")
 * ```
 *
 * THEN:
 * ```ts
 * result.groups.screenId // "kebab-case-screen-id"
 * ```
 */
const REGEX = /^\/intent\/(?<screenId>([a-z][a-z0-9-]*[a-z0-9])|[a-z])$/;

const BAD_ROUTE = "Bad route: the URL pattern should be `/intent/screen-id`";

const isResult = (result: RegExpExecArray | null): result is Result => !!result;

/* ********************************************************
 *                     simulatedFetch                     *
 ******************************************************** */

const simulatedFetch = async (apiRoute: string) => {
  // Simulate a response delay
  await wait();

  // Search the screen_id in the API route for intents
  const result = REGEX.exec(apiRoute);

  if (!isResult(result)) {
    return { error: BAD_ROUTE };
  }

  const { screenId } = result.groups;

  // Query the "database"
  const intents = screenIdToIntentsMap[screenId];

  return intents
    ? { intents }
    : { error: `Missing screen_id: no intents found for \`${screenId}\`` };
};

export default simulatedFetch;

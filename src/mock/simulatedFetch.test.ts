import { describe, expect, test, vi } from "vitest";

vi.mock("./intents", () => ({
  screenIdToIntentsMap: {
    page: {
      button: { label: "Send" },
    },
  },
}));

import simulatedFetch from "./simulatedFetch";

describe("simulatedFetch", () => {
  test("returns a valid response when called with a proper API route", async () => {
    // GIVEN
    const apiRoute = "/intent/page";

    // WHEN
    const result = await simulatedFetch(apiRoute);

    // THEN
    expect(result).toStrictEqual({
      intents: {
        button: { label: "Send" },
      },
    });
  });

  test("returns an error response when called with a bad API route", async () => {
    // GIVEN
    const apiRoute = "/intent/no-page";

    // WHEN
    const result = await simulatedFetch(apiRoute);

    // THEN
    expect(result).toStrictEqual({
      error: "Missing screen_id: no intents found for `no-page`",
    });
  });
});

import { describe, expect, test } from "vitest";
import { SCREEN_ID_REGEX } from "./constants";

describe("SCREEN_ID_REGEX", () => {
  test("finds `my-screen-id` in `/intent/my-screen-id`", () => {
    // GIVEN
    const apiRoute = "/intent/my-screen-id";

    // WHEN
    const result = SCREEN_ID_REGEX.exec(apiRoute);

    // THEN
    expect(result?.groups?.screenId).toBe("my-screen-id");
  });

  test("doesn't match when ends by -`", () => {
    // GIVEN
    const apiRoute = "/intent/bad-end-";

    // WHEN
    const result = SCREEN_ID_REGEX.exec(apiRoute);

    // THEN
    expect(result).toBeNull();
  });

  test("doesn't match when have parameter(s)`", () => {
    // GIVEN
    const apiRoute = "/intent/no-params?id=3";

    // WHEN
    const result = SCREEN_ID_REGEX.exec(apiRoute);

    // THEN
    expect(result).toBeNull();
  });

  test("doesn't match when path doesn't start with `/intent/`", () => {
    // GIVEN
    const apiRoute = "/other/my-screen-id";

    // WHEN
    const result = SCREEN_ID_REGEX.exec(apiRoute);

    // THEN
    expect(result).toBeNull();
  });
});

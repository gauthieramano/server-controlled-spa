/**
 * WHEN:
 * ```ts
 * const result = SCREEN_ID_REGEX.exec("/intent/kebab-case-screen-id")
 * ```
 *
 * THEN:
 * ```ts
 * result.groups.screenId // "kebab-case-screen-id"
 * ```
 */
export const SCREEN_ID_REGEX =
  /^\/intent\/(?<screenId>([a-z][a-z0-9-]*[a-z0-9])|[a-z])$/;

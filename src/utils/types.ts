export type Intents = {
  [componentName: string]: Record<string, unknown>;
};

export type ScreenIdToIntentsMap = {
  [screenId: string]: Intents | undefined;
};

export type Step = "initial" | "loading" | "fetched";

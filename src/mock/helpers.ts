const MINIMUM_DELAY = 50; // in ms
const DELAY_DELTA = 950; // in ms

const getRandomDelay = () => MINIMUM_DELAY + DELAY_DELTA * Math.random();

export const wait = () =>
  new Promise((resolve) => setTimeout(resolve, getRandomDelay()));

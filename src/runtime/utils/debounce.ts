/**
 * Creates a debounced function that delays invoking the provided function until after wait milliseconds have elapsed since the last time the debounced function was invoked.
 *
 * @param {F} fn - The function to debounce.
 * @param {number} delay - The number of milliseconds to delay.
 * @returns {F} The debounced function.
 */
export function debounce<F extends (...params: any[]) => void>(fn: F, delay = 500) {
  let timeoutID: number;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutID);
    timeoutID = window.setTimeout(() => fn.apply(this, args), delay);
  } as F;
}

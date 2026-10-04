/** Shared runtime facts, computed once. */
export const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

export const base = import.meta.env.BASE_URL;

export function q<T extends Element = HTMLElement>(selector: string, scope: ParentNode = document): T {
  const el = scope.querySelector<T>(selector);
  if (!el) throw new Error(`Missing element: ${selector}`);
  return el;
}

export function qa<T extends Element = HTMLElement>(selector: string, scope: ParentNode = document): T[] {
  return Array.from(scope.querySelectorAll<T>(selector));
}

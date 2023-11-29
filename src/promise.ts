export const map =
  <T, U>(fn: (x: T) => U) =>
  (x: Promise<T>): Promise<U> =>
    x.then(fn);

export const flatMap =
  <T, U>(fn: (x: T) => Promise<U>) =>
  (x: Promise<T>): Promise<U> =>
    x.then(fn);

type AsyncFn<T> = (...args: any[]) => Promise<T>;

type AsyncWrapReturn<T> = [T, null] | [null, Error];

export async function asyncWrap<T>(fn: AsyncFn<T>): Promise<AsyncWrapReturn<T>> {
  try {
    const resp = await fn();

    return [resp, null];
  } catch (e) {
    return [null, e as Error];
  }
}

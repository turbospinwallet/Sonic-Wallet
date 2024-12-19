import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { isBrowser } from '@/common/utils/ssr';
import reactiveStorage from '@/internals/reactive-storage';

const noop = () => {};

type PossibleKey = Parameters<typeof reactiveStorage.get>[0];
type PossibleReturn<T extends PossibleKey> = ReturnType<typeof reactiveStorage.get<T>>;

const useLocalStorage = <T extends PossibleKey>(
  key: T,
  initialValue: PossibleReturn<T>
): [PossibleReturn<T>, Dispatch<NonNullable<PossibleReturn<T>>>, () => void] => {
  if (!isBrowser()) {
    return [initialValue, noop, noop];
  }

  if (!key) {
    throw new Error('useClientStorage key may not be falsy');
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const initializer = useRef((key: T) => {
    try {
      const storageValue = reactiveStorage.get(key);

      if (storageValue !== null) {
        return storageValue;
      } else {
        if (initialValue) {
          reactiveStorage.set(key, initialValue);
        }

        return initialValue;
      }
    } catch {
      // If user is in private mode or has storage restriction
      // localStorage can throw. JSON.parse and JSON.stringify
      // can throw, too.
      return initialValue;
    }
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, setState] = useState<PossibleReturn<T>>(() => initializer.current(key));

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLayoutEffect(() => {
    const unsubscribe = reactiveStorage.registerListener(
      key,
      (value) => {
        setState(value);
      },
      { runWhenRegister: true }
    );

    return () => {
      unsubscribe?.();
    };
  }, [key]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const set: Dispatch<SetStateAction<NonNullable<PossibleReturn<T>>>> = useCallback(
    (valOrFunc) => {
      try {
        const value =
          typeof valOrFunc === 'function'
            ? valOrFunc(state as NonNullable<PossibleReturn<T>>)
            : valOrFunc;

        reactiveStorage.set(key, value);

        setState(value);
      } catch {
        // If user is in private mode or has storage restriction
        // localStorage can throw. Also, JSON.stringify can throw.
      }
    },
    [key, state]
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const remove = useCallback(() => {
    try {
      reactiveStorage.clear(key);
    } catch {
      // If user is in private mode or has storage restriction
      // localStorage can throw.
    }
  }, [key]);

  return [state, set, remove];
};

export default useLocalStorage;

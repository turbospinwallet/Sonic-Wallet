import type { Adaptor, UnregisterFn } from './types';

const isBrowser = typeof window !== 'undefined';

export interface CustomEventDetail<T = unknown> {
  key: string;
  value: T;
  crossTabs: boolean;
}

type Callback<T = unknown> = (val: CustomEventDetail<T>) => void;

export function createLocalStorageAdaptor(): Adaptor {
  const customEventKey = 'MANA_STORAGE';

  function fireCustomEvent(key: string, newVal: unknown) {
    if (!isBrowser) return;

    try {
      const event = new CustomEvent(customEventKey, {
        detail: { key, value: newVal },
      });
      window.dispatchEvent(event);
    } catch (error) {
      console.error('Custom event error:', error);
    }
  }

  function listenCustomEvent(callback: Callback<string>, crossTabs?: boolean): UnregisterFn {
    if (!isBrowser) return () => {};

    const handler = (e: CustomEvent | StorageEvent) => {
      const payload = e instanceof CustomEvent ? e.detail : { key: e.key, value: e.newValue };
      callback(payload);
    };

    const eventKey = crossTabs ? 'storage' : customEventKey;
    window.addEventListener(eventKey, handler as EventListener);

    return () => {
      window.removeEventListener(eventKey, handler as EventListener);
    };
  }

  return {
    get: (key) => {
      if (!isBrowser) return null;
      try {
        return window.localStorage.getItem(key);
      } catch (error) {
        console.error('Storage get error:', error);
        return null;
      }
    },
    set: (key, newValue) => {
      if (!isBrowser) return;
      try {
        window.localStorage.setItem(key, newValue);
        fireCustomEvent(key, newValue);
      } catch (error) {
        console.error('Storage set error:', error);
      }
    },
    remove: (key) => {
      if (!isBrowser) return;
      try {
        window.localStorage.removeItem(key);
        fireCustomEvent(key, null);
      } catch (error) {
        console.error('Storage remove error:', error);
      }
    },
    clear: () => {
      if (!isBrowser) return;
      try {
        window.localStorage.clear();
      } catch (error) {
        console.error('Storage clear error:', error);
      }
    },
    onValueChanged<Value = unknown>(
      key: string,
      listener: (val: Value) => void,
      option: { shouldSerialize: boolean; crossTabs?: boolean }
    ): UnregisterFn {
      if (!isBrowser) return () => {};

      const { shouldSerialize, crossTabs } = option;

      return listenCustomEvent((detail: CustomEventDetail<string>) => {
        if (key === detail.key) {
          try {
            listener(shouldSerialize ? JSON.parse(detail.value) : detail.value);
          } catch (error) {
            console.error('Value change handler error:', error);
          }
        }
      }, crossTabs);
    },
  };
}

export type LocalStorageValue<T> = T | null;

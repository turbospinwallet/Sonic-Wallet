import type { Adaptor, UnregisterFn } from './adaptors';
import { isNil } from './utils';

export interface IStorageOptions {
  deserialize: boolean; // we may have to use serializer/deserializer function instead, but for consistency, just use this
  persistent: boolean;
}

export type ListenerFn<Value> = (newVal: Value) => void;

export interface RegisterOptions {
  runWhenRegister: boolean;
  crossTabs?: boolean;
}

export interface AdditionalOptions {
  prefix?: string;
  useDeprecated?: boolean;
}

export interface StorageKey<_T = any> extends IStorageOptions {}

export type InferStorageType<T> = T extends StorageKey<infer P> ? P : never;

export function createStorageOption(options: IStorageOptions): IStorageOptions {
  return options;
}

class ReactiveStorage<KeyOptions extends Record<string, StorageKey>> {
  private readonly prefix: string;
  private readonly storageKeys: KeyOptions;
  private readonly adaptor: Adaptor;

  constructor(
    adaptor: Adaptor,
    storageKeysOptions: KeyOptions,
    options: AdditionalOptions = { prefix: '', useDeprecated: true }
  ) {
    this.prefix = options.prefix ?? '';
    this.storageKeys = storageKeysOptions;
    this.adaptor = adaptor;

    this.get = this.get.bind(this);
    this._get = this._get.bind(this);
    this.set = this.set.bind(this);
    this._set = this._set.bind(this);
    this.clear = this.clear.bind(this);
    this.toKey = this.toKey.bind(this);
    this.registerListener = this.registerListener.bind(this);
    this.storageHasKey = this.storageHasKey.bind(this);
  }

  private storageHasKey<K extends keyof KeyOptions>(key: K) {
    return Object.keys(this.storageKeys).includes(String(key));
  }

  private toKey<K extends keyof KeyOptions>(key: K) {
    return `${this.prefix}_${String(key)}`;
  }

  registerListener<K extends keyof KeyOptions>(
    watchProp: K,
    fn: ListenerFn<InferStorageType<KeyOptions[K]> | null>,
    options: RegisterOptions = { runWhenRegister: true }
  ): null | UnregisterFn {
    const unregister = this.adaptor.onValueChanged(this.toKey(watchProp), fn, {
      shouldSerialize: this.storageKeys[watchProp].deserialize,
      crossTabs: options.crossTabs,
    });

    if (options.runWhenRegister) {
      const key = this.storageKeys[watchProp];
      void fn(this._get(watchProp, key.deserialize));
    }

    return unregister;
  }

  private _get<K extends keyof KeyOptions>(
    key: K,
    shouldParse = true
  ): InferStorageType<KeyOptions[K]> | null {
    const result = this.adaptor.get(this.toKey(key));

    if (shouldParse && !isNil(result)) {
      try {
        return JSON.parse(result) as InferStorageType<KeyOptions[K]> | null;
      } catch (e) {
        return null;
      }
    }

    return result as InferStorageType<KeyOptions[K]>;
  }

  // new public method
  get<K extends keyof KeyOptions>(key: K) {
    return this._get(key, this.storageKeys[key].deserialize);
  }

  private _set<K extends keyof KeyOptions>(key: K, newVal: unknown, shouldSerialized = false) {
    if (newVal === undefined) {
      return this.adaptor.remove(this.toKey(key));
    }

    this.adaptor.set(
      this.toKey(key),
      shouldSerialized ? JSON.stringify(newVal) : (newVal as string)
    );
  }

  // new public method
  set<K extends keyof KeyOptions>(key: K, newVal: InferStorageType<KeyOptions[K]>): void {
    return this._set(key, newVal, this.storageKeys[key].deserialize);
  }

  clear<K extends keyof KeyOptions>(key?: K) {
    if (key) {
      return this.adaptor.remove(this.toKey(key));
    }

    return Object.keys(this.storageKeys).forEach((key) => {
      if (this.storageKeys[key].persistent) {
        return;
      }

      return this.adaptor.remove(this.toKey(key as K));
    });
  }
}

export default ReactiveStorage;

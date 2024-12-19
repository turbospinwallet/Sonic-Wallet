export type UnregisterFn = () => void;

export interface Adaptor {
  get: (key: string) => string | null;
  set: (key: string, newValue: string) => void;
  remove: (key: string) => void;
  clear: () => void;
  onValueChanged<Value>(
    key: string,
    callback: (val: Value) => void,
    option: { shouldSerialize: boolean; crossTabs?: boolean }
  ): UnregisterFn;
}

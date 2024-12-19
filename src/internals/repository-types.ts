export interface Repository {
  [X: string]: (...args: any[]) => Promise<any>;
}

import type { Repository } from './repository-types';

// use this to define repository
export function defineRepository<T extends Repository>(getRepo: () => T): T {
  return Object.freeze(getRepo());
}

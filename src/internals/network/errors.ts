import { safeStringify } from '@/common/utils/json';

export interface ErrorOptions {
  code: number | string;
  message: string;
  error?: Error | unknown;
}

export class NetworkError extends Error {
  code: number | string;
  name = 'NetworkError';

  toString() {
    const errorObj = {
      cause: this.cause,
      code: this.code,
      name: this.name,
    };

    return safeStringify(errorObj);
  }

  constructor({ message, code, error }: ErrorOptions) {
    super(message);
    this.cause = error;
    this.code = code;

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

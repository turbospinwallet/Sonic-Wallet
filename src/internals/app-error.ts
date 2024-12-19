import { safeStringify } from '@/common/utils/json';

export interface AppErrorOptions {
  message?: string;
  code?: number;
  debugMessage?: string;
}

export class AppError extends Error {
  name = 'AppError';
  code?: number;
  debugMessage?: string;

  static isAppError(err: Error) {
    return err.name === 'AppError';
  }

  constructor({ message, code, debugMessage }: AppErrorOptions) {
    super(message);
    this.code = code;
    this.debugMessage = debugMessage;
  }

  toString() {
    return safeStringify({
      name: this.name,
      message: this.message,
      code: this.code,
      debugMessage: this.debugMessage,
    });
  }
}

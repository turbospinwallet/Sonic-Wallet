import Bugsnag from '@bugsnag/js';
import { safeStringify } from '@/common/utils/json';

export interface ILogger {
  log: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
}

function _combineMessages(messages: any[]) {
  const allMessages = messages.reduce<string[]>((combined, current: any) => {
    switch (true) {
      case typeof current === 'string': {
        combined.push(current);
        break;
      }
      case current instanceof Error: {
        combined.push(String(current));
        break;
      }
      case isNil(current): {
        combined.push(String(current));
        break;
      }
      case typeof current === 'object': {
        combined.push(safeStringify(current));
        break;
      }
    }
    return combined;
  }, []);

  return allMessages.join(' ');
}

export function getErrorFromMsg(messages: Error | string | any[]) {
  if (messages instanceof Error) {
    return messages;
  }

  if (typeof messages === 'string') {
    return new Error(messages);
  }

  if (Array.isArray(messages)) {
    const finalMessage = _combineMessages(messages);
    // if array message has an error, then clone the error (to take the stack), pass all the messages
    const firstError: Error | undefined = messages.find((msg) => msg instanceof Error);
    if (firstError) {
      return firstError;
    }
    return finalMessage;
  }

  return safeStringify(messages); // last fallback solution
}

function isNil(value: any): value is null | undefined {
  return value == null;
}

const logger = {
  log: (...args: any[]) => {
    console.log(...args);
  },
  warn: (...args: any[]) => {
    console.warn(...args);
    try {
      Bugsnag.notify(getErrorFromMsg(args));
    } catch (e) {
      // noop
    }
  },
  error: (...args: any[]) => {
    console.error(...args);
    try {
      Bugsnag.notify(getErrorFromMsg(args));
    } catch (e) {
      // noop
    }
  },
};

export default logger;

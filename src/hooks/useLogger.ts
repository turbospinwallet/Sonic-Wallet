import type { ILogger } from '@/internals/logger';
import logger from '@/internals/logger';

function useLogger(): ILogger {
  return logger;
}

export default useLogger;

import { Logger } from './Logger';
import { LoggerLevel } from './LoggerLevel';

export * from './Logger';
export * from './LoggerLevel';

/**
 * Default logger.
 */
export const logger = new Logger(LoggerLevel.INFO);

import { config } from '~/configs/index.js';
import { Logger } from './Logger.js';

export * from './Logger.js';
export * from './LoggerLevel.js';

/**
 * Default logger.
 */
export const logger = new Logger(config.logger.level);

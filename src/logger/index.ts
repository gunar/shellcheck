import { config } from '~/configs';
import { Logger } from './Logger';

export * from './Logger';
export * from './LoggerLevel';

/**
 * Default logger.
 */
export const logger = new Logger(config.logger.level);

import { Narrow } from '~/utils/narrow.js';
import { LoggerLevel } from './LoggerLevel.js';

type LoggerLevelOn = Exclude<LoggerLevel, LoggerLevel.OFF>;

/**
 * Logger.
 */
export class Logger {
  /**
   * Logger level value.
   */
  private static readonly values: Record<LoggerLevelOn, number> = {
    debug: 1,
    info: 2,
    warn: 3,
    error: 4
  };

  /**
   * Logger level.
   */
  public accessor level: LoggerLevel;

  /**
   * Construct a new Logger.
   *
   * @param level - Level.
   */
  public constructor(level: LoggerLevel) {
    this.level = level;
  }

  /**
   * Log.
   *
   * @param level - Level.
   * @param message - Message.
   */
  private log(level: LoggerLevel, message: string): void {
    if (this.level === LoggerLevel.OFF) return;
    Narrow<LoggerLevelOn>(level);
    if (Logger.values[level] < Logger.values[this.level]) return;

    // eslint-disable-next-line no-console
    console[level](`[${level.toUpperCase().padEnd(5)}] ${message}`);
  }

  /**
   * Debug log message.
   *
   * @param message - Message.
   */
  public debug(message: string): void {
    this.log(LoggerLevel.DEBUG, message);
  }

  /**
   * Informational log message.
   *
   * @param message - Message.
   */
  public info(message: string): void {
    this.log(LoggerLevel.INFO, message);
  }

  /**
   * Warning log message.
   *
   * @param message - Message.
   */
  public warn(message: string): void {
    this.log(LoggerLevel.WARN, message);
  }

  /**
   * Error log message.
   *
   * @param message - Message.
   */
  public error(message: string): void {
    this.log(LoggerLevel.ERROR, message);
  }
}

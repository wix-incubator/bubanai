import type { DateFormat } from './types';
import { TestError } from '../error';

/**
 * Helper for manipulations with dates.
 *
 * @category Date
 */
export class DateUtils {
  /**
   * Returns tomorrow date
   * @param date
   *
   * @category Date
   */
  static tomorrow = (date: Date) => {
    const result = new Date(date);
    result.setDate(result.getDate() + 1);
    return result;
  };

  /**
   * Returns 1st day of current month
   * @param date
   *
   * @category Date
   */
  static firstMonthDayDate = (date: Date) => {
    const result = new Date(date);
    result.setDate(1);
    return result;
  };

  static currentMonthString = (date: Date) => {
    const monthArray = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return monthArray[date.getMonth()];
  };

  /**
   * Formats date string, using date formatter and delimiter.
   * @param date
   * @param dateFormat
   * @param delimiter
   *
   * @category Date
   */
  static formatDateString(date: Date, dateFormat: DateFormat, delimiter = '/') {
    const formats = dateFormat.split(delimiter);
    let result = '';
    for (let i = 0; i < formats.length; i++) {
      result += DateUtils.customFormatter(formats[i], date);
      if (i !== formats.length - 1) {
        result += delimiter;
      }
    }
    return result;
  }

  /**
   * Checks if date is today or tomorrow with defined formatter.
   * Useful when is needed to check dates in emails when action was made several minutes
   * before midnight and in email can be new date.
   * @param date
   * @param dateString
   * @param dateFormat
   * @param delimiter
   *
   * @category Date
   */
  static dateIsTodayOrTomorrow(
    date: Date,
    dateString: string,
    dateFormat: DateFormat,
    delimiter = '/',
  ) {
    const todayFormatted = DateUtils.formatDateString(
      new Date(date),
      dateFormat,
      delimiter,
    );
    const tomorrowFormatted = DateUtils.formatDateString(
      DateUtils.tomorrow(date),
      dateFormat,
      delimiter,
    );
    return dateString === todayFormatted || dateString === tomorrowFormatted;
  }

  private static customFormatter(formatType: string, date: Date) {
    switch (formatType) {
      case 'YYYY':
        return date.getFullYear().toString();
      case 'MM':
        return date.getMonth() < 9
          ? `0${(date.getMonth() + 1).toString()}`
          : (date.getMonth() + 1).toString();
      case 'M':
        return (date.getMonth() + 1).toString();
      case 'D':
        return date.getDate().toString();
      case 'DD':
        return date.getDate() < 10
          ? `0${date.getDate().toString()}`
          : date.getDate().toString();
      default:
        throw new Error(TestError.FormatIsNotImplemented(formatType));
    }
  }
}

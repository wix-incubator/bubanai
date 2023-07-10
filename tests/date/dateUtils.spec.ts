import { DateUtils } from '../../src';

describe('DateUtils', () => {
  describe('DateUtils: tomorrow()', () => {
    it('should return the correct tomorrow date', () => {
      const today = new Date('2023-06-09');
      const tomorrow = DateUtils.tomorrow(today);
      expect(tomorrow.toISOString()).toBe('2023-06-10T00:00:00.000Z');
    });
  });

  describe('DateUtils: firstMonthDayDate()', () => {
    it('should return the 1st day of the current month', () => {
      const date = new Date('2023-06-15');
      const firstDayOfMonth = DateUtils.firstMonthDayDate(date);
      expect(firstDayOfMonth.toISOString()).toBe('2023-06-01T00:00:00.000Z');
    });
  });

  describe('DateUtils: currentMonthString()', () => {
    it('should return the correct month string', () => {
      const date = new Date('2023-06-09');
      const monthString = DateUtils.currentMonthString(date);
      expect(monthString).toBe('June');
    });
  });

  describe('DateUtils: formatDateString()', () => {
    it('should format the date string correctly', () => {
      const date = new Date('2023-06-09');

      let formattedDate = DateUtils.formatDateString(date, 'YYYY/MM/DD');
      expect(formattedDate).toBe('2023/06/09');

      formattedDate = DateUtils.formatDateString(date, 'MM/DD/YYYY');
      expect(formattedDate).toBe('06/09/2023');

      formattedDate = DateUtils.formatDateString(date, 'YYYY/M/D');
      expect(formattedDate).toBe('2023/6/9');

      formattedDate = DateUtils.formatDateString(date, 'DD/MM/YYYY');
      expect(formattedDate).toBe('09/06/2023');
    });
  });

  describe('DateUtils: dateIsTodayOrTomorrow()', () => {
    it('should return true if the date is today', () => {
      const date = new Date('2023-06-09');
      const dateString = '2023/06/09';
      const dateFormat = 'YYYY/MM/DD';
      const isTodayOrTomorrow = DateUtils.dateIsTodayOrTomorrow(
        date,
        dateString,
        dateFormat,
      );
      expect(isTodayOrTomorrow).toBe(true);
    });

    it('should return true if the date is tomorrow', () => {
      const date = new Date('2023-06-09');
      const dateString = '2023/06/10';
      const dateFormat = 'YYYY/MM/DD';
      const isTodayOrTomorrow = DateUtils.dateIsTodayOrTomorrow(
        date,
        dateString,
        dateFormat,
      );
      expect(isTodayOrTomorrow).toBe(true);
    });

    it('should return false if the date is neither today nor tomorrow', () => {
      const date = new Date('2023-06-09');
      const dateString = '2023/06/11';
      const dateFormat = 'YYYY/MM/DD';
      const isTodayOrTomorrow = DateUtils.dateIsTodayOrTomorrow(
        date,
        dateString,
        dateFormat,
      );
      expect(isTodayOrTomorrow).toBe(false);
    });
  });
});

/**
 * localTimeZoneのdate objectをlocalTimeZoneのstringに変換する
 * @param {Date} date
 * @returns {string} (yyyy-MM-ddTHH:mm:ss)
 */
export const toLocalTimeString = (date: Date): string => {
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);
  return localDate.toISOString().slice(0, 19);
};

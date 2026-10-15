/**
 * Provides utility functions for handling booking dates.
 *
 * @file src/services/bookingDateService.js
 * @author Isabella Luther <il223at@student.lnu.se>
 * @version 1.0.0
 */

import { HolidayCalendar } from 'js-cli-template'

/**
 * Checks whether a date is available for study room bookings.
 *
 * @param {string} bookingDate - The date in YYYY-MM-DD format.
 * @returns {boolean} True if the date is a workday.
 */
export function isBookingDateAvailable(bookingDate) {
  const year = Number(bookingDate.slice(0, 4))
  const holidayCalendar = new HolidayCalendar(year)

  return holidayCalendar.isWorkday(bookingDate)
}

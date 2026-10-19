/**
 * Provides utility functions for handling booking dates.
 *
 * @file src/services/bookingDateService.js
 * @author Isabella Luther <il223at@student.lnu.se>
 * @version 1.0.0
 */

import { HolidayCalendar } from 'js-cli-template'

/**
 * Validates a booking date in YYYY-MM-DD format.
 *
 * @param {string} bookingDate - The date to validate.
 * @throws {TypeError} If the date is not a string.
 * @throws {RangeError} If the date is invalid.
 * @returns {void}
 */
function validateBookingDate(bookingDate) {
  if (typeof bookingDate !== 'string') {
    throw new TypeError('Booking date must be a string.')
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(bookingDate)) {
    throw new RangeError('Booking date must be in YYYY-MM-DD format.')
  }

  const date = new Date(`${bookingDate}T12:00:00`)

  if (
    Number.isNaN(date.getTime()) ||
    date.getFullYear() !== Number(bookingDate.slice(0, 4)) ||
    date.getMonth() + 1 !== Number(bookingDate.slice(5, 7)) ||
    date.getDate() !== Number(bookingDate.slice(8, 10))
  ) {
    throw new RangeError('Booking date must be a valid calendar date.')
  }
}

/**
 * Checks whether a date is available for study room bookings.
 *
 * @param {string} bookingDate - The date in YYYY-MM-DD format.
 * @returns {boolean} True if the date is a workday.
 * @throws {TypeError} If the date is not a string.
 * @throws {RangeError} If the date is invalid.
 */
export function isBookingDateAvailable(bookingDate) {
  validateBookingDate(bookingDate)

  const year = Number(bookingDate.slice(0, 4))
  const holidayCalendar = new HolidayCalendar(year)

  return holidayCalendar.isWorkday(bookingDate)
}

/**
 * Provides services related to booking time slots for study rooms.
 *
 * @file services/bookingTimeService.js
 * @author Isabella Luther <il233at@student.lnu.se>
 * @version 1.0.0
 */

import { TimeSlot } from 'booking-module'

/**
 * Creates a time slot for the study room opening hours.
 *
 * @param {string} bookingDate - The date in YYYY-MM-DD format.
 * @returns {TimeSlot} The opening hours time slot.
 */
export function createOpeningHoursTimeSlot(bookingDate) {
  const openingTime = new Date(`${bookingDate}T08:00:00`)
  const closingTime = new Date(`${bookingDate}T20:00:00`)

  return new TimeSlot(openingTime, closingTime)
}

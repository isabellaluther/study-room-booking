/**
 * Provides services related to booking time slots for study rooms.
 *
 * @file src/services/bookingTimeService.js
 * @author Isabella Luther <il223at@student.lnu.se>
 * @version 1.0.0
 */

import { TimeSlot } from 'booking-module'
import { isBookingDateAvailable } from './bookingDateService.js'

/**
 * Returns available time slots for a study room on a selected date.
 *
 * @param {import('booking-module').BookingCalendar} calendar - The booking calendar.
 * @param {import('booking-module').Resource} studyRoom - The selected study room.
 * @param {string} bookingDate - The selected date.
 * @param {number} durationInMinutes - The booking duration.
 * @returns {TimeSlot[]} The available time slots.
 */
export function getAvailableBookingTimes(calendar, studyRoom, bookingDate, durationInMinutes) {
  if (!isBookingDateAvailable(bookingDate)) {
    return []
  }

  const openingHours = createOpeningHoursTimeSlot(bookingDate)

  return calendar.getAvailableTimeSlots(studyRoom, openingHours, durationInMinutes)
}

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

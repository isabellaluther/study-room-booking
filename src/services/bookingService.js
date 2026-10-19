/**
 * Service for managing bookings in the booking calendar.
 *
 * @file services/bookingService.js
 * @author Isabella Luther <il223at@student.lnu.se>
 * @version 1.0.0
 */

import { Booking } from 'booking-module'
import { isBookingDateAvailable } from './bookingDateService.js'

/**
 * Creates and adds a booking to the calendar.
 *
 * @param {import('booking-module').BookingCalendar} calendar - The booking calendar.
 * @param {string} bookingId - The booking identifier.
 * @param {import('booking-module').Resource} studyRoom - The selected study room.
 * @param {import('booking-module').TimeSlot} timeSlot - The selected time slot.
 * @returns {Booking} The created booking.
 */
export function createBooking(calendar, bookingId, studyRoom, timeSlot) {
  const startTime = timeSlot.getStartTime()
  const endTime = timeSlot.getEndTime()

  const durationInMinutes = (endTime - startTime) / (60 * 1000)

  if (durationInMinutes !== 30 && durationInMinutes !== 60) {
    throw new RangeError('Booking duration must be 30 or 60 minutes.')
  }

  const openingTime = new Date(startTime)
  openingTime.setHours(8, 0, 0, 0)

  const closingTime = new Date(startTime)
  closingTime.setHours(20, 0, 0, 0)

  if (startTime < openingTime || endTime > closingTime) {
    throw new RangeError('Bookings must be between 08:00 and 20:00.')
  }

  if (startTime.toDateString() !== endTime.toDateString()) {
    throw new RangeError('A booking must start and end on the same day.')
  }

  const bookingDate = startTime.toLocaleDateString('sv-SE')

  if (!isBookingDateAvailable(bookingDate)) {
    throw new Error('Bookings are not available on weekends or Swedish public holidays.')
  }

  const booking = new Booking(bookingId, studyRoom, timeSlot)

  calendar.addBooking(booking)

  return booking
}

/**
 * Cancels an existing booking.
 *
 * @param {import('booking-module').BookingCalendar} calendar - The booking calendar.
 * @param {string} bookingId - The id of the booking to cancel.
 * @returns {void}
 */
export function cancelBooking(calendar, bookingId) {
  calendar.cancelBooking(bookingId)
}

/**
 * Storage utility functions for booking objects.
 *
 * @file src/storage/bookingStorage.js
 * @author Isabella Luther <il233at@student.lnu.se>
 * @version 1.0.0
 */

import { Booking, TimeSlot } from 'booking-module'
import { studyRooms } from '../studyRooms.js'

/**
 * Converts a booking object into a plain JavaScript object suitable for JSON storage.
 *
 * @param {import('booking-module').Booking} booking - The booking object to convert.
 * @returns {object} The serialized booking object.
 */
export function convertBookingToData(booking) {
  const timeSlot = booking.getTimeSlot()

  return {
    id: booking.getId(),
    resourceId: booking.getResource().getId(),
    startTime: timeSlot.getStartTime().toISOString(),
    endTime: timeSlot.getEndTime().toISOString(),
  }
}

/**
 * Converts stored booking data into a Booking instance.
 *
 * @param {object} bookingData - The stored booking data.
 * @returns {Booking} The restored booking.
 * @throws {Error} If the study room does not exist.
 */
export function convertDataToBooking(bookingData) {
  const studyRoom = studyRooms.find((room) => {
    return room.getId() === bookingData.resourceId
  })

  if (!studyRoom) {
    throw new Error('Study room does not exist.')
  }

  const timeSlot = new TimeSlot(new Date(bookingData.startTime), new Date(bookingData.endTime))

  return new Booking(bookingData.id, studyRoom, timeSlot)
}

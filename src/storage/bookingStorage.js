/**
 * Storage utility functions for booking objects.
 *
 * @file src/storage/bookingStorage.js
 * @author Isabella Luther <il223at@student.lnu.se>
 * @version 1.0.0
 */

import { Booking, TimeSlot } from 'booking-module'
import { studyRooms } from '../studyRooms.js'

// Key used for storing bookings in local storage.
const STORAGE_KEY = 'study-room-bookings'

/**
 * Saves an array of Booking instances to local storage.
 *
 * @param {import('booking-module').Booking[]} bookings - The array of Booking instances to save.
 * @returns {void}
 */
export function saveBookings(bookings) {
  const bookingData = bookings.map((booking) => {
    return convertBookingToData(booking)
  })

  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookingData))
}

/**
 * Loads bookings from localStorage.
 *
 * @returns {import('booking-module').Booking[]} The restored bookings.
 */
export function loadBookings() {
  const savedData = localStorage.getItem(STORAGE_KEY)

  if (savedData === null) {
    return []
  }

  const bookingData = JSON.parse(savedData)

  return bookingData.map((data) => {
    return convertDataToBooking(data)
  })
}

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

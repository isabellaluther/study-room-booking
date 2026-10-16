/**
 * Tests for the bookingStorage module.
 *
 * @file test/bookingStorage.test.js
 * @author Isabella Luther <il233at@student.lnu.se>
 * @version 1.0.0
 */

import { describe, it, expect } from 'vitest'
import { Booking, Resource, TimeSlot } from 'booking-module'
import { convertBookingToData, convertDataToBooking } from '../src/storage/bookingStorage.js'

describe('convertBookingToData', () => {
  it('converts a booking into data that can be stored as JSON', () => {
    const studyRoom = new Resource('room-01', 'Study Room 01')

    const timeSlot = new TimeSlot(new Date('2026-10-19T10:00:00'), new Date('2026-10-19T11:00:00'))

    const booking = new Booking('booking-01', studyRoom, timeSlot)

    const bookingData = convertBookingToData(booking)

    expect(bookingData).toEqual({
      id: 'booking-01',
      resourceId: 'room-01',
      startTime: timeSlot.getStartTime().toISOString(),
      endTime: timeSlot.getEndTime().toISOString(),
    })
  })
})

describe('convertDataToBooking', () => {
  it('restores a Booking instance from stored data', () => {
    const bookingData = {
      id: 'booking-01',
      resourceId: 'room-01',
      startTime: '2026-10-19T08:00:00.000Z',
      endTime: '2026-10-19T09:00:00.000Z',
    }

    const booking = convertDataToBooking(bookingData)

    expect(booking).toBeInstanceOf(Booking)
    expect(booking.getId()).toBe('booking-01')
    expect(booking.getResource().getId()).toBe('room-01')
    expect(booking.getTimeSlot().getStartTime().toISOString()).toBe(bookingData.startTime)
    expect(booking.getTimeSlot().getEndTime().toISOString()).toBe(bookingData.endTime)
  })

  it('rejects stored booking data with a non-existing study room', () => {
    const bookingData = {
      id: 'booking-01',
      resourceId: 'room-99',
      startTime: '2026-10-19T08:00:00.000Z',
      endTime: '2026-10-19T09:00:00.000Z',
    }

    expect(() => {
      convertDataToBooking(bookingData)
    }).toThrow('Study room does not exist.')
  })
})

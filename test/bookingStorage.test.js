/**
 * Tests for the bookingStorage module.
 *
 * @file test/bookingStorage.test.js
 * @author Isabella Luther <il233at@student.lnu.se>
 * @version 1.0.0
 */

import { describe, it, expect, vi } from 'vitest'
import { Booking, Resource, TimeSlot } from 'booking-module'
import {
  convertBookingToData,
  convertDataToBooking,
  saveBookings,
  loadBookings,
} from '../src/storage/bookingStorage.js'

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

describe('saveBookings', () => {
  it('saves booking data as JSON', () => {
    const studyRoom = new Resource('room-01', 'Study Room 01')

    const timeSlot = new TimeSlot(new Date('2026-10-19T10:00:00'), new Date('2026-10-19T11:00:00'))

    const booking = new Booking('booking-01', studyRoom, timeSlot)

    const setItem = vi.fn()

    vi.stubGlobal('localStorage', { setItem })

    try {
      saveBookings([booking])

      expect(setItem).toHaveBeenCalledWith('study-room-bookings', JSON.stringify([convertBookingToData(booking)]))
    } finally {
      vi.unstubAllGlobals()
    }
  })
})

describe('loadBookings', () => {
  it('loads stored booking data as Booking instances', () => {
    const bookingData = [
      {
        id: 'booking-01',
        resourceId: 'room-01',
        startTime: '2026-10-19T08:00:00.000Z',
        endTime: '2026-10-19T09:00:00.000Z',
      },
    ]

    const getItem = vi.fn().mockReturnValue(JSON.stringify(bookingData))

    vi.stubGlobal('localStorage', { getItem })

    try {
      const bookings = loadBookings()

      expect(getItem).toHaveBeenCalledWith('study-room-bookings')
      expect(bookings).toHaveLength(1)
      expect(bookings[0]).toBeInstanceOf(Booking)
      expect(bookings[0].getId()).toBe('booking-01')
      expect(bookings[0].getResource().getId()).toBe('room-01')
      expect(bookings[0].getTimeSlot().getStartTime().toISOString()).toBe(bookingData[0].startTime)
      expect(bookings[0].getTimeSlot().getEndTime().toISOString()).toBe(bookingData[0].endTime)
    } finally {
      vi.unstubAllGlobals()
    }
  })

  it('returns an empty array when no bookings are stored', () => {
    const getItem = vi.fn().mockReturnValue(null)

    vi.stubGlobal('localStorage', { getItem })

    try {
      const bookings = loadBookings()

      expect(getItem).toHaveBeenCalledWith('study-room-bookings')
      expect(bookings).toEqual([])
    } finally {
      vi.unstubAllGlobals()
    }
  })

  it('throws an error when stored booking data is invalid JSON', () => {
    const getItem = vi.fn().mockReturnValue('invalid JSON')

    vi.stubGlobal('localStorage', { getItem })

    try {
      expect(() => {
        loadBookings()
      }).toThrow(SyntaxError)
    } finally {
      vi.unstubAllGlobals()
    }
  })
})

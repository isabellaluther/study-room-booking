/**
 * Tests for the bookingService module.
 *
 * @file test/bookingService.test.js
 * @author Isabella Luther <il223at@student.lnu.se>
 * @version 1.0.0
 */

import { describe, it, expect } from 'vitest'
import { BookingCalendar, Resource, TimeSlot } from 'booking-module'
import { createBooking, cancelBooking } from '../src/services/bookingService.js'

describe('createBooking', () => {
  it('creates a valid booking and adds it to the calendar', () => {
    const calendar = new BookingCalendar()
    const studyRoom = new Resource('room-01', 'Study Room 01')

    const timeSlot = new TimeSlot(new Date('2026-10-15T10:00:00'), new Date('2026-10-15T11:00:00'))

    const booking = createBooking(calendar, 'booking-01', studyRoom, timeSlot)

    expect(booking.getId()).toBe('booking-01')
    expect(calendar.getBookingsForResource(studyRoom)).toContain(booking)
  })

  it('rejects a booking with an invalid duration', () => {
    const calendar = new BookingCalendar()
    const studyRoom = new Resource('room-01', 'Study Room 01')

    const timeSlot = new TimeSlot(new Date('2026-10-15T10:00:00'), new Date('2026-10-15T11:30:00'))

    expect(() => {
      createBooking(calendar, 'booking-01', studyRoom, timeSlot)
    }).toThrow(RangeError)

    expect(calendar.getBookingsForResource(studyRoom)).toHaveLength(0)
  })

  it('rejects a booking that starts before opening hours', () => {
    const calendar = new BookingCalendar()
    const studyRoom = new Resource('room-01', 'Study Room 01')

    const timeSlot = new TimeSlot(new Date('2026-10-15T07:30:00'), new Date('2026-10-15T08:00:00'))

    expect(() => {
      createBooking(calendar, 'booking-01', studyRoom, timeSlot)
    }).toThrow(RangeError)

    expect(calendar.getBookingsForResource(studyRoom)).toHaveLength(0)
  })

  it('rejects a booking that ends after closing hours', () => {
    const calendar = new BookingCalendar()
    const studyRoom = new Resource('room-01', 'Study Room 01')

    const timeSlot = new TimeSlot(new Date('2026-10-15T19:30:00'), new Date('2026-10-15T20:30:00'))

    expect(() => {
      createBooking(calendar, 'booking-01', studyRoom, timeSlot)
    }).toThrow(RangeError)

    expect(calendar.getBookingsForResource(studyRoom)).toHaveLength(0)
  })

  it('rejects a booking on a Saturday', () => {
    const calendar = new BookingCalendar()
    const studyRoom = new Resource('room-01', 'Study Room 01')

    const timeSlot = new TimeSlot(new Date('2026-10-17T10:00:00'), new Date('2026-10-17T11:00:00'))

    expect(() => {
      createBooking(calendar, 'booking-01', studyRoom, timeSlot)
    }).toThrow('Bookings are not available on weekends or Swedish public holidays.')

    expect(calendar.getBookingsForResource(studyRoom)).toHaveLength(0)
  })

  it('rejects a booking on a Swedish public holiday', () => {
    const calendar = new BookingCalendar()
    const studyRoom = new Resource('room-01', 'Study Room 01')

    const timeSlot = new TimeSlot(new Date('2026-12-25T10:00:00'), new Date('2026-12-25T11:00:00'))

    expect(() => {
      createBooking(calendar, 'booking-01', studyRoom, timeSlot)
    }).toThrow('Bookings are not available on weekends or Swedish public holidays.')

    expect(calendar.getBookingsForResource(studyRoom)).toHaveLength(0)
  })

  it('rejects overlapping bookings for the same study room', () => {
    const calendar = new BookingCalendar()
    const studyRoom = new Resource('room-01', 'Study Room 01')

    const firstTimeSlot = new TimeSlot(new Date('2026-10-15T10:00:00'), new Date('2026-10-15T11:00:00'))

    const overlappingTimeSlot = new TimeSlot(new Date('2026-10-15T10:30:00'), new Date('2026-10-15T11:30:00'))

    createBooking(calendar, 'booking-01', studyRoom, firstTimeSlot)

    expect(() => {
      createBooking(calendar, 'booking-02', studyRoom, overlappingTimeSlot)
    }).toThrow()

    expect(calendar.getBookingsForResource(studyRoom)).toHaveLength(1)
  })

  it('allows bookings at the same time for different study rooms', () => {
    const calendar = new BookingCalendar()

    const firstStudyRoom = new Resource('room-01', 'Study Room 01')
    const secondStudyRoom = new Resource('room-02', 'Study Room 02')

    const timeSlot = new TimeSlot(new Date('2026-10-15T10:00:00'), new Date('2026-10-15T11:00:00'))

    const firstBooking = createBooking(calendar, 'booking-01', firstStudyRoom, timeSlot)
    const secondBooking = createBooking(calendar, 'booking-02', secondStudyRoom, timeSlot)

    expect(calendar.getBookingsForResource(firstStudyRoom)).toContain(firstBooking)
    expect(calendar.getBookingsForResource(secondStudyRoom)).toContain(secondBooking)
  })

  it('allows a booking starting exactly at opening time', () => {
    const calendar = new BookingCalendar()
    const studyRoom = new Resource('room-01', 'Study Room 01')

    const timeSlot = new TimeSlot(new Date('2026-10-15T08:00:00'), new Date('2026-10-15T08:30:00'))

    const booking = createBooking(calendar, 'booking-01', studyRoom, timeSlot)

    expect(calendar.getBookingsForResource(studyRoom)).toContain(booking)
  })

  it('allows a booking ending exactly at closing time', () => {
    const calendar = new BookingCalendar()
    const studyRoom = new Resource('room-01', 'Study Room 01')

    const timeSlot = new TimeSlot(new Date('2026-10-15T19:00:00'), new Date('2026-10-15T20:00:00'))

    const booking = createBooking(calendar, 'booking-01', studyRoom, timeSlot)

    expect(calendar.getBookingsForResource(studyRoom)).toContain(booking)
  })
})

describe('cancelBooking', () => {
  it('cancels an existing booking', () => {
    const calendar = new BookingCalendar()
    const studyRoom = new Resource('room-01', 'Study Room 01')

    const timeSlot = new TimeSlot(new Date('2026-10-19T10:00:00'), new Date('2026-10-19T11:00:00'))

    createBooking(calendar, 'booking-01', studyRoom, timeSlot)

    expect(calendar.getBookingsForResource(studyRoom)).toHaveLength(1)

    cancelBooking(calendar, 'booking-01')

    expect(calendar.getBookingsForResource(studyRoom)).toHaveLength(0)
  })

  it('rejects cancellation of a non-existing booking', () => {
    const calendar = new BookingCalendar()

    expect(() => {
      cancelBooking(calendar, 'booking-99')
    }).toThrow('booking id does not exist')
  })
})

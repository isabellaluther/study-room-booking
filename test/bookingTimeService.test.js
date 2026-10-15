/**
 * Tests for the bookingTimeService module.
 *
 * @file test/bookingTimeService.test.js
 * @author Isabella Luther <il233at@student.lnu.se>
 * @version 1.0.0
 */

import { describe, expect, it } from 'vitest'
import { Booking, BookingCalendar, Resource, TimeSlot } from 'booking-module'
import { createOpeningHoursTimeSlot, getAvailableBookingTimes } from '../src/services/bookingTimeService.js'

describe('createOpeningHoursTimeSlot', () => {
  it('creates a time slot starting at 08:00', () => {
    const timeSlot = createOpeningHoursTimeSlot('2026-10-15')

    expect(timeSlot.getStartTime()).toEqual(new Date('2026-10-15T08:00:00'))
  })

  it('creates a time slot ending at 20:00', () => {
    const timeSlot = createOpeningHoursTimeSlot('2026-10-15')

    expect(timeSlot.getEndTime()).toEqual(new Date('2026-10-15T20:00:00'))
  })

  it('creates opening hours for the selected date', () => {
    const timeSlot = createOpeningHoursTimeSlot('2026-10-16')

    expect(timeSlot.getStartTime()).toEqual(new Date('2026-10-16T08:00:00'))
    expect(timeSlot.getEndTime()).toEqual(new Date('2026-10-16T20:00:00'))
  })

  describe('getAvailableBookingTimes', () => {
    it('returns available 30-minute time slots on a weekday', () => {
      const calendar = new BookingCalendar()
      const studyRoom = new Resource('room-01', 'Study Room 01')

      const availableTimes = getAvailableBookingTimes(calendar, studyRoom, '2026-10-15', 30)

      expect(availableTimes).toHaveLength(24)
      expect(availableTimes[0].getStartTime()).toEqual(new Date('2026-10-15T08:00:00'))
      expect(availableTimes[0].getEndTime()).toEqual(new Date('2026-10-15T08:30:00'))
    })
  })

  it('returns available 60-minute time slots on a weekday', () => {
    const calendar = new BookingCalendar()
    const studyRoom = new Resource('room-01', 'Study Room 01')

    const availableTimes = getAvailableBookingTimes(calendar, studyRoom, '2026-10-15', 60)

    expect(availableTimes).toHaveLength(12)
    expect(availableTimes[0].getStartTime()).toEqual(new Date('2026-10-15T08:00:00'))
    expect(availableTimes[0].getEndTime()).toEqual(new Date('2026-10-15T09:00:00'))
  })

  it('returns no available time slots on a Swedish public holiday', () => {
    const calendar = new BookingCalendar()
    const studyRoom = new Resource('room-01', 'Study Room 01')

    const availableTimes = getAvailableBookingTimes(calendar, studyRoom, '2026-12-25', 60)

    expect(availableTimes).toEqual([])
  })

  it('returns no available time slots on weekends', () => {
    const calendar = new BookingCalendar()
    const studyRoom = new Resource('room-01', 'Study Room 01')

    const saturdayTimes = getAvailableBookingTimes(calendar, studyRoom, '2026-10-17', 30)
    const sundayTimes = getAvailableBookingTimes(calendar, studyRoom, '2026-10-18', 60)

    expect(saturdayTimes).toEqual([])
    expect(sundayTimes).toEqual([])
  })

  it('excludes time slots that overlap with an existing booking', () => {
    const calendar = new BookingCalendar()
    const studyRoom = new Resource('room-01', 'Study Room 01')

    const bookedTimeSlot = new TimeSlot(new Date('2026-10-15T10:00:00'), new Date('2026-10-15T11:00:00'))

    const booking = new Booking('booking-1', studyRoom, bookedTimeSlot)

    calendar.addBooking(booking)

    const availableTimes = getAvailableBookingTimes(calendar, studyRoom, '2026-10-15', 60)

    expect(availableTimes).toHaveLength(11)

    const hasBookedTime = availableTimes.some((timeSlot) => {
      return timeSlot.getStartTime().getTime() === new Date('2026-10-15T10:00:00').getTime()
    })

    expect(hasBookedTime).toBe(false)
  })
})

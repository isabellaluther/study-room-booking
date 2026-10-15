/**
 * Tests for the bookingTimeService module.
 *
 * @file test/bookingTimeService.test.js
 * @author Isabella Luther <il233at@student.lnu.se>
 * @version 1.0.0
 */

import { describe, expect, it } from 'vitest'
import { createOpeningHoursTimeSlot } from '../src/services/bookingTimeService.js'

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
})

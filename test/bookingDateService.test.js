/**
 * Tests for the bookingDateService module.
 *
 * @file test/bookingDateService.test.js
 * @author Isabella Luther <il223at@student.lnu.se>
 * @version 1.0.0
 */

import { describe, expect, it } from 'vitest'
import { isBookingDateAvailable } from '../src/services/bookingDateService.js'

describe('isBookingDateAvailable', () => {
  it('allows bookings on a regular weekday', () => {
    expect(isBookingDateAvailable('2026-10-15')).toBe(true)
  })

  it('prevents bookings on Saturdays', () => {
    expect(isBookingDateAvailable('2026-10-17')).toBe(false)
  })

  it('prevents bookings on Sundays', () => {
    expect(isBookingDateAvailable('2026-10-18')).toBe(false)
  })

  it('prevents bookings on Swedish public holidays', () => {
    expect(isBookingDateAvailable('2026-12-25')).toBe(false)
  })

  it('rejects dates that do not exist', () => {
    expect(() => isBookingDateAvailable('2026-02-30')).toThrow(RangeError)
  })

  it('rejects dates with an invalid format', () => {
    expect(() => isBookingDateAvailable('15-10-2026')).toThrow(RangeError)
  })

  it('rejects booking dates that are not strings', () => {
    expect(() => isBookingDateAvailable(null)).toThrow(TypeError)
  })
})

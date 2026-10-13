/**
 * Entry point for the Study Room Booking application.
 *
 * @file src/index.js
 * @author Isabella Luther <il223at@student.lnu.se>
 * @version 1.0.0
 */

import { BookingCalendar, Resource } from 'booking-module'
import { HolidayCalendar } from 'js-cli-template'

const calendar = new BookingCalendar()
const studyRoom = new Resource('room-101', 'Study Room 101')

console.log('Booking calendar:', calendar)
console.log('Study room:', studyRoom)

const holidayCalendar = new HolidayCalendar(2026)

console.log('Christmas Day:', holidayCalendar.isWorkday('2026-12-25'))
console.log('Regular weekday:', holidayCalendar.isWorkday('2026-10-13'))
console.log('Sunday:', holidayCalendar.isWorkday('2026-10-18'))

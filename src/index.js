/**
 * Entry point for the Study Room Booking application.
 *
 * @file src/index.js
 * @author Isabella Luther <il223at@student.lnu.se>
 * @version 1.0.0
 */

import { BookingCalendar, Resource } from 'booking-module'

const calendar = new BookingCalendar()
const studyRoom = new Resource('room-101', 'Study Room 101')

console.log('Booking calendar:', calendar)
console.log('Study room:', studyRoom)

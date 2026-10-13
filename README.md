# Study Room Booking

A web application for students to book study rooms.

## Vision

The application aims to make it easy for students to find and book available study rooms.

Students can choose between three study rooms, view available time slots, create bookings, and cancel existing bookings. Bookings can be made for either 30 or 60 minutes.

Study rooms are available Monday to Friday, from 08:00 to 20:00, excluding Swedish public holidays.

Bookings are stored locally in the user's browser.

## Requirements

### Functional requirements

- **FR1:** The application shall display three study rooms: Study Room 101, 102, and 103.
- **FR2:** The user shall be able to select a study room and a date.
- **FR3:** The user shall be able to choose a booking duration of 30 or 60 minutes.
- **FR4:** The application shall display available time slots for the selected room, date, and duration.
- **FR5:** The user shall be able to create a booking for an available time slot.
- **FR6:** The application shall prevent overlapping bookings for the same study room.
- **FR7:** The user shall be able to view existing bookings.
- **FR8:** The user shall be able to cancel an existing booking.
- **FR9:** The application shall only allow bookings Monday to Friday, between 08:00 and 20:00.
- **FR10:** The application shall prevent bookings on Swedish public holidays.
- **FR11:** The application shall save bookings locally in the browser so they remain available after reloading the page.
# Test Report

## Summary

The Study Room Booking application was tested both manually in the browser and with automated tests using Vitest.

The 31 automated tests cover booking dates, available times, creating and cancelling bookings, and saving and loading bookings. The tests were run using `npm test`.

Manual testing was done in Google Chrome using `npm run dev`. This included selecting study rooms, dates and booking durations, creating bookings and cancelling them. The page was also reloaded to check that bookings were saved correctly.

The layout was tested using Chrome DevTools with the iPhone 14 Pro Max screen size.

Local storage was tested by changing the saved value to `invalid-json` and reloading the page. The application showed an error in the console without overwriting the stored value. Failed saving was also tested by temporarily changing `#canSaveBookings` to `false`. This showed that a booking is removed again if it cannot be saved, and that a cancelled booking is restored if saving fails.

The hardest part was testing how the different components work together, especially when creating, cancelling and saving bookings. These parts needed manual testing because the automated tests mainly cover the services and storage functions.

## Test Results

| Test case                       | Requirement | Input                                                                                            | Expected outcome                                                                             | Actual outcome                  |
| ------------------------------- | ----------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- | ------------------------------- |
| Show study rooms                | FR1         | Open the application in the browser.                                                             | Study Room 01, 02 and 03 are shown.                                                          | ✅ Worked as expected.          |
| Choose a room and date          | FR2         | Select Study Room 01 and 2026-10-19.                                                             | The room and date can be selected.                                                           | ✅ Worked as expected.          |
| Choose booking duration         | FR3         | Select 30 minutes and then 60 minutes.                                                           | Both durations can be selected, one at a time.                                               | ✅ Worked as expected.          |
| Show available times            | FR4         | Select a room, date and duration.                                                                | Available times are shown for the selected room, date and duration.                          | ✅ Worked as expected.          |
| Hide available times            | FR4         | Open the application without selecting anything.                                                 | Available Times is hidden until all three choices are made.                                  | ✅ Worked as expected.          |
| Create a booking                | FR5         | Choose an available time and click Book selected time.                                           | The booking is created and shown under My Bookings.                                          | ✅ Worked as expected.          |
| Prevent double bookings         | FR6         | Book Study Room 01 at 10:00–10:30 and try to book the same time again.                           | The same room cannot be booked twice at the same time.                                       | ✅ Worked as expected.          |
| Show existing bookings          | FR7         | Create a booking and look under My Bookings.                                                     | The room, date, time and cancellation button are shown.                                      | ✅ Worked as expected.          |
| Show an empty booking list      | FR7         | Open My Bookings when there are no bookings.                                                     | The message "You have no bookings yet." is shown.                                            | ✅ Worked as expected.          |
| Cancel a booking                | FR8         | Click Cancel booking for an existing booking.                                                    | The booking disappears and the time becomes available again.                                 | ✅ Worked as expected.          |
| Block weekend bookings          | FR9         | Select Saturday, 2026-10-24.                                                                     | The date cannot be booked.                                                                   | ✅ Worked as expected.          |
| Check opening hours             | FR9         | Select a weekday and check the first and last available times for 30 and 60 minutes.             | Bookings can only be made between 08:00 and 20:00.                                           | ✅ Worked as expected.          |
| Block Swedish public holidays   | FR10        | Select 2026-12-25 (Christmas Day).                                                               | No booking can be made on this date.                                                         | ✅ Worked as expected.          |
| Save a booking                  | FR11        | Create a booking and reload the page.                                                            | The booking is still shown after reloading.                                                  | ✅ Worked as expected.          |
| Save a cancellation             | FR11        | Cancel a booking and reload the page.                                                            | The cancelled booking does not come back.                                                    | ✅ Worked as expected.          |
| Handle incorrect saved data     | FR11        | Change the value of `study-room-bookings` in localStorage to `invalid-json` and reload the page. | The application handles the error without overwriting the stored value.                      | ✅ Worked as expected.          |
| Handle failed booking save      | FR11        | Temporarily set `#canSaveBookings` to `false` and try to create a booking.                       | The booking is removed again and an error message is shown.                                  | ✅ Worked as expected.          |
| Handle failed cancellation save | FR11        | Temporarily set `#canSaveBookings` to `false` and try to cancel a booking.                       | The booking is kept and an error message is shown.                                           | ✅ Worked as expected.          |
| Test mobile layout              | FR2, FR7    | Open the application in Chrome DevTools using the iPhone 14 Pro Max screen size.                 | The layout fits the smaller screen, with the booking form and booking list below each other. | ✅ Worked after fixing the CSS. |

## Other Checks

The following commands were used to check the application:

```bash
npm test
npm run lint
npm run format:check
npm run build
```

All four commands passed during the latest checks.

The application was also tested manually after changes to the booking form, booking list, local storage and mobile layout.

## Known Issues in Third-Party Modules

No clear problems for my usage in this application have been found in the other student's module.

The module is used to check if a selected date is a Swedish workday. This helps the application decide whether a study room can be booked on that date.

Weekend and Swedish public holiday dates were also tested manually, and the application blocked bookings as expected.

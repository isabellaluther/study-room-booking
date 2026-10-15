/**
 * Provides the HTML template for the study room booking component.
 *
 * @returns {HTMLTemplateElement} The HTML template.
 */
export function createHtmlTemplate() {
  const htmlTemplate = document.createElement('template')

  htmlTemplate.innerHTML = `
    <main>
      <h1>Study Room Booking</h1>
      <p>Find and book a study room</p>

      <section>
        <h2>Available Study Rooms</h2>
        <div id="study-rooms"></div>
      </section>

      <section>
        <h2>Select Date</h2>

        <label for="booking-date">Date</label>
        <input type="date" id="booking-date" name="booking-date">

        <p id="booking-date-message" role="status" aria-live="polite"></p>
      </section>

      <section>
      <fieldset id="booking-duration">
        <legend>How long do you want to book the room for?</legend>

        <label>
          <input type="radio" name="booking-duration" value="30">
          30 minutes
        </label>

        <label>
          <input type="radio" name="booking-duration" value="60">
          60 minutes
        </label>
      </fieldset>
    </section>

    <section>
      <h2>Available Times</h2>
      <div id="available-times"></div>
    </section>
    </main>
  `

  return htmlTemplate
}

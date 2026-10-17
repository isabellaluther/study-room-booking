/**
 * Creates the HTML template for the booking form.
 *
 * @returns {HTMLTemplateElement} The HTML template.
 */
export function createHtmlTemplate() {
  const template = document.createElement('template')

  template.innerHTML = `
    <section>
      <h2>Study Rooms</h2>
      <div id="study-rooms"></div>
    </section>

    <section>
      <h2 id="booking-date-heading">Select Date</h2>
      <input
        type="date"
        id="booking-date"
        name="booking-date"
        aria-labelledby="booking-date-heading"
      >
      <p id="booking-date-message" role="status" aria-live="polite"></p>
    </section>

    <section>
      <h2>Booking Duration</h2>
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

    <section id="available-times-section" hidden> 
      <h2>Available Times</h2>
      <div id="available-times"></div>

      <button type="button" id="book-button" disabled>
        Book selected time
      </button>

      <p id="booking-message" role="status" aria-live="polite"></p>
    </section>
  `

  return template
}

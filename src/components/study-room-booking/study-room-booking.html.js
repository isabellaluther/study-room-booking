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

        <input type="date" id="booking-date" name="booking-date">
      </section>
    </main>
  `

  return htmlTemplate
}

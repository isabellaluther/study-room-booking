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

      <booking-form></booking-form>
    </main>
  `

  return htmlTemplate
}

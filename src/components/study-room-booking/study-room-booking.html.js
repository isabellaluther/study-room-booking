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

      <div class="dashboard">
        <booking-form></booking-form>
        <booking-list></booking-list>
      </div>
    </main>
  `

  return htmlTemplate
}

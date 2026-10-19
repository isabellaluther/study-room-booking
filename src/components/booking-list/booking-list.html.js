/**
 * Creates the HTML template for the booking list.
 *
 * @returns {HTMLTemplateElement} The HTML template.
 */
export function createHtmlTemplate() {
  const htmlTemplate = document.createElement('template')

  htmlTemplate.innerHTML = `
    <section>
      <h2>My Bookings</h2>
      <div id="bookings"></div>
    </section>
  `

  return htmlTemplate
}

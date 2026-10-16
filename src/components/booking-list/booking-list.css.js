/**
 * Creates the CSS template for the booking list.
 *
 * @returns {HTMLTemplateElement} The CSS template.
 */
export function createCssTemplate() {
  const cssTemplate = document.createElement('template')

  cssTemplate.innerHTML = `
    <style>
      :host {
        display: block;
      }

      section {
        margin-top: 32px;
      }

      #bookings {
        display: grid;
        gap: 16px;
        margin-top: 16px;
      }
    </style>
  `

  return cssTemplate
}

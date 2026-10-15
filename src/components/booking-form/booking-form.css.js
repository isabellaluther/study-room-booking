/**
 * Creates the CSS template for the booking form.
 *
 * @returns {HTMLTemplateElement} The CSS template.
 */
export function createCssTemplate() {
  const template = document.createElement('template')

  template.innerHTML = `
    <style>
      :host {
        display: block;
      }

      :host([hidden]) {
        display: none;
      }

      section {
        margin-bottom: 2rem;
      }

      #study-rooms {
        display: grid;
        gap: 0.5rem;
      }
    </style>
  `

  return template
}

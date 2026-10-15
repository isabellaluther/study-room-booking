/**
 * Provides the CSS template for the study room booking component.
 *
 * @returns {HTMLTemplateElement} The CSS template.
 */
export function createCssTemplate() {
  const cssTemplate = document.createElement('template')

  cssTemplate.innerHTML = `
    <style>
      :host {
        display: block;
        font-family: system-ui, sans-serif;
        color: #222;
      }

      main {
        max-width: 900px;
        margin: 0 auto;
        padding: 24px;
      }

      h1 {
        margin-bottom: 8px;
      }

      p {
        color: #555;
      }
    </style>
  `

  return cssTemplate
}

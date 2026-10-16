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
        min-height: 100vh;
        font-family: system-ui, sans-serif;
        color: #182b50;
        background-color: #eef2fa;
      }

      main {
        max-width: 1200px;
        margin: 0 auto;
        padding: 40px 24px;
      }

      h1 {
        margin: 0 0 8px;
        font-size: 36px;
        color: #182b50;
      }

      p {
        margin: 0 0 32px;
        color: #64748b;
      }

      .dashboard {
        display: grid;
        grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
        gap: 24px;
        align-items: start;
      }

      booking-form,
      booking-list {
        display: block;
        min-width: 0;
        padding: 24px;
        background-color: #ffffff;
        border-radius: 16px;
        box-shadow: 0 4px 16px rgba(24, 43, 80, 0.08);
      }

      @media (max-width: 600px) {
        main {
          padding: 24px 16px;
        }

        h1 {
          font-size: 28px;
        }
      }
    </style>
  `

  return cssTemplate
}

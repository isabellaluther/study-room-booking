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
        margin: 0;
      }

      #bookings {
        display: grid;
        gap: 16px;
        margin-top: 16px;
      }

      .empty-message {
        margin: 0;
        padding: 32px 20px;
        background-color: #f8faff;
        border: 1px solid #dfe5f0;
        border-radius: 12px;
        color: #64748b;
        text-align: center;
        font-size: 14px;
      }

      .booking-card {
        padding: 20px;
        background-color: #f8faff;
        border: 1px solid #dfe5f0;
        border-radius: 12px;
      }

      .booking-card h3 {
        margin: 0 0 16px;
        color: #182b50;
        font-size: 18px;
      }

      .booking-card p {
        margin: 0 0 10px;
        color: #64748b;
        font-size: 14px;
      }

      .booking-card button {
        width: 100%;
        margin-top: 12px;
        padding: 12px 16px;
        background-color: #fff5f5;
        border: 1px solid #f1c2c6;
        border-radius: 8px;
        color: #b54755;
        font: inherit;
        font-weight: 500;
        cursor: pointer;
      }

      .booking-card button:hover {
        background-color: #ffe5e7;
        border-color: #b54755;
      }

      .booking-card button:focus-visible {
        outline: 3px solid #b54755;
        outline-offset: 3px;
      }
    </style>
  `

  return cssTemplate
}

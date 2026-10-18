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
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 12px;
      }

      #study-rooms label {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 24px 12px;
        background-color: #f8faff;
        border: 2px solid #dfe5f0;
        border-radius: 12px;
        color: #182b50;
        font-size: 14px;
        font-weight: 500;
        text-align: center;
        cursor: pointer;
        transition: background-color 0.2s, border-color 0.2s;
      }

      #study-rooms label:hover {
        background-color: #eff2ff;
        border-color: #a5b4e8;
      }

      #study-rooms label:has(input:checked) {
        background-color: #eff2ff;
        border-color: #526ddd;
      }

      #study-rooms label:has(input:focus-visible) {
        outline: 3px solid #526ddd;
        outline-offset: 3px;
      }

      #study-rooms input[type='radio'] {
        accent-color: #526ddd;
      }

      #booking-date {
        display: block;
        box-sizing: border-box;
        width: 100%;
        margin-top: 12px;
        padding: 14px 16px;
        border: 2px solid #dfe5f0;
        border-radius: 10px;
        background-color: #f8faff;
        color: #182b50;
        font: inherit;
        cursor: pointer;
      }

      #booking-date:hover {
        border-color: #a5b4e8;
      }

      #booking-date:focus-visible {
        outline: 3px solid #526ddd;
        outline-offset: 2px;
      }

      #booking-duration {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
        margin: 0;
        padding: 0;
        border: none;
        min-width: 0;
      }

      #booking-duration legend {
        margin-bottom: 12px;
        color: #64748b;
        font-size: 14px;
      }

      #booking-duration label {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 16px;
        background-color: #f8faff;
        border: 2px solid #dfe5f0;
        border-radius: 12px;
        color: #182b50;
        font-weight: 500;
        cursor: pointer;
      }

      #booking-duration label:hover {
        background-color: #eff2ff;
        border-color: #a5b4e8;
      }

      #booking-duration label:has(input:checked) {
        background-color: #eff2ff;
        border-color: #526ddd;
      }

      #booking-duration label:has(input:focus-visible) {
        outline: 3px solid #526ddd;
        outline-offset: 3px;
      }

      #booking-duration input[type='radio'] {
        accent-color: #526ddd;
      }

      #available-times {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 12px;
      }

      #available-times label {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 14px 8px;
        background-color: #f8faff;
        border: 2px solid #dfe5f0;
        border-radius: 10px;
        color: #182b50;
        font-size: 14px;
        cursor: pointer;
      }

      #available-times label:hover {
        background-color: #eff2ff;
        border-color: #a5b4e8;
      }

      #available-times label:has(input:checked) {
        background-color: #eff2ff;
        border-color: #526ddd;
      }

      #available-times label:has(input:focus-visible) {
        outline: 3px solid #526ddd;
        outline-offset: 3px;
      }

      #available-times input[type='radio'] {
        accent-color: #526ddd;
      }

      #book-button {
        display: block;
        width: 100%;
        margin-top: 24px;
        padding: 16px 24px;
        background-color: #526ddd;
        border: none;
        border-radius: 10px;
        color: #ffffff;
        font: inherit;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.2s;
      }

      #book-button:hover:not(:disabled) {
        background-color: #4059c5;
      }

      #book-button:focus-visible {
        outline: 3px solid #182b50;
        outline-offset: 3px;
      }

      #book-button:disabled {
        background-color: #cbd5e1;
        color: #64748b;
        cursor: not-allowed;
      }

      #booking-date-message,
      #booking-message {
        margin: 12px 0 0;
        padding: 12px 16px;
        border-radius: 10px;
        font-size: 14px;
        line-height: 1.5;
      }

      #booking-date-message:empty,
      #booking-message:empty {
        display: none;
      }

      #booking-date-message[data-status='success'],
      #booking-message[data-status='success'] {
        background-color: #ecfdf3;
        border: 1px solid #a7e3bd;
        color: #17663d;
      }

      #booking-date-message[data-status='error'],
      #booking-message[data-status='error'] {
        background-color: #fff1f2;
        border: 1px solid #fecdd3;
        color: #9f2439;
      }

      @media (max-width: 600px) {
        #study-rooms {
          grid-template-columns: 1fr;
        }

        #study-rooms label {
          flex-direction: row;
          justify-content: flex-start;
          padding: 16px;
        }

        #available-times {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }
    </style>
  `

  return template
}

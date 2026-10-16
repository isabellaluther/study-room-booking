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

      @media (max-width: 600px) {
        #study-rooms {
          grid-template-columns: 1fr;
        }

        #study-rooms label {
          flex-direction: row;
          justify-content: flex-start;
          padding: 16px;
        }
      }
    </style>
  `

  return template
}

/**
 * Registers the study-room-booking custom element.
 *
 * @file src/components/study-room-booking/study-room-booking.js
 * @author Isabella Luther <il223at@student.lnu.se>
 * @version 1.0.0
 */

import { createHtmlTemplate } from './study-room-booking.html.js'
import { createCssTemplate } from './study-room-booking.css.js'
import { studyRooms } from '../../studyRooms.js'

/**
 * Defines the study-room-booking custom element.
 */
customElements.define(
  'study-room-booking',
  class extends HTMLElement {
    /**
     * Creates an instance of the study room booking component.
     */
    constructor() {
      super()

      this.attachShadow({ mode: 'open' })

      const htmlTemplate = createHtmlTemplate()
      const cssTemplate = createCssTemplate()

      this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))
      this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))
    }

    /**
     * Invoked each time the custom element is appended into a document-connected element.
     */
    connectedCallback() {
      this.#renderStudyRooms()
    }

    /**
     * Renders the list of available study rooms inside the component.
     */
    #renderStudyRooms() {
      const studyRoomsContainer = this.shadowRoot.querySelector('#study-rooms')

      for (const studyRoom of studyRooms) {
        const roomElement = document.createElement('div')
        roomElement.textContent = studyRoom.getName()

        studyRoomsContainer.appendChild(roomElement)
      }
    }
  }
)

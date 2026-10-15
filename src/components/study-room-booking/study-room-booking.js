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
import { isBookingDateAvailable } from '../../services/bookingDateService.js'

/**
 * Defines the study-room-booking custom element.
 */
customElements.define(
  'study-room-booking',
  /**
   * The study-room-booking custom element class.
   *
   * @augments HTMLElement
   */
  class extends HTMLElement {
    /**
     * The currently selected study room.
     *
     * @type {Resource|null} The currently selected study room.
     */
    #selectedStudyRoom = null

    /**
     * The currently selected booking date.
     *
     * @type {string|null} The currently selected booking date.
     */
    #selectedBookingDate = null

    /**
     * The currently selected booking duration.
     *
     * @type {number|null} The currently selected booking duration in minutes.
     */
    #selectedBookingDuration = null

    /**
     * The abort controller used to manage event listeners.
     *
     * @type {AbortController|null} The abort controller.
     */
    #abortController = null

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
      this.#abortController = new AbortController()

      this.#renderStudyRooms()

      const studyRoomsContainer = this.shadowRoot.querySelector('#study-rooms')

      studyRoomsContainer.addEventListener(
        'change',
        (event) => {
          const selectedRoomId = event.target.value

          this.#selectedStudyRoom = studyRooms.find((studyRoom) => {
            return studyRoom.getId() === selectedRoomId
          })
        },
        { signal: this.#abortController.signal }
      )

      const bookingDurationFieldset = this.shadowRoot.querySelector('#booking-duration')

      bookingDurationFieldset.addEventListener(
        'change',
        (event) => {
          this.#selectedBookingDuration = Number(event.target.value)
        },
        { signal: this.#abortController.signal }
      )

      const bookingDateInput = this.shadowRoot.querySelector('#booking-date')
      const bookingDateMessage = this.shadowRoot.querySelector('#booking-date-message')

      bookingDateInput.addEventListener(
        'change',
        (event) => {
          this.#selectedBookingDate = event.target.value || null

          if (!this.#selectedBookingDate) {
            bookingDateMessage.textContent = ''
            return
          }

          if (isBookingDateAvailable(this.#selectedBookingDate)) {
            bookingDateMessage.textContent = 'The selected date is available for booking.'
          } else {
            bookingDateMessage.textContent = 'Bookings are not available on weekends or Swedish public holidays.'
          }
        },
        { signal: this.#abortController.signal }
      )
    }

    /**
     * Called when the component is disconnected from the document.
     *
     * @returns {void}
     */
    disconnectedCallback() {
      this.#abortController?.abort()
      this.#abortController = null
    }

    /**
     * Renders the available study rooms as radio buttons inside the component.
     */
    #renderStudyRooms() {
      const studyRoomsContainer = this.shadowRoot.querySelector('#study-rooms')

      studyRoomsContainer.replaceChildren()

      for (const studyRoom of studyRooms) {
        const label = document.createElement('label')
        const radioButton = document.createElement('input')

        radioButton.type = 'radio'
        radioButton.name = 'study-room'
        radioButton.value = studyRoom.getId()

        label.appendChild(radioButton)
        label.appendChild(document.createTextNode(studyRoom.getName()))

        studyRoomsContainer.appendChild(label)
      }
    }
  }
)

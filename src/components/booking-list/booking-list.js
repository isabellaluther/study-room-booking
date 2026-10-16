/**
 * Registers the booking-list custom element.
 *
 * @file src/components/booking-list/booking-list.js
 * @author Isabella Luther <il223at@student.lnu.se>
 * @version 1.0.0
 */

import { createHtmlTemplate } from './booking-list.html.js'
import { createCssTemplate } from './booking-list.css.js'
import { studyRooms } from '../../studyRooms.js'
import { cancelBooking } from '../../services/bookingService.js'

/**
 * Defines the booking-list custom element.
 */
customElements.define(
  'booking-list',
  /**
   * The booking list custom element class.
   *
   * @augments HTMLElement
   */
  class extends HTMLElement {
    /**
     * The shared booking calendar provided by the parent component.
     *
     * @type {import('booking-module').BookingCalendar|null}
     */
    #bookingCalendar = null

    /**
     * The abort controller used to manage event listeners.
     *
     * @type {AbortController|null}
     */
    #abortController = null

    /**
     * Creates an instance of the booking list component.
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
     * Handles cancellation requests from the booking list.
     *
     * @returns {void}
     */
    connectedCallback() {
      this.#abortController = new AbortController()

      const bookingsContainer = this.shadowRoot.querySelector('#bookings')

      bookingsContainer.addEventListener(
        'click',
        (event) => {
          const cancelButton = event.target.closest('button[data-booking-id]')

          if (!cancelButton || !this.#bookingCalendar) {
            return
          }

          const bookingId = cancelButton.dataset.bookingId

          try {
            cancelBooking(this.#bookingCalendar, bookingId)

            this.#renderBookings()

            this.dispatchEvent(
              new CustomEvent('booking-cancelled', {
                bubbles: true,
                composed: true,
              })
            )
          } catch (error) {
            console.error('Could not cancel booking:', error)
          }
        },
        { signal: this.#abortController.signal }
      )
    }

    /**
     * Cleans up event listeners and aborts any ongoing operations when the component is disconnected.
     *
     * @returns {void}
     */
    disconnectedCallback() {
      this.#abortController?.abort()
      this.#abortController = null
    }

    /**
     * Sets the shared booking calendar and displays the existing bookings.
     *
     * @param {import('booking-module').BookingCalendar} bookingCalendar - The booking calendar.
     * @returns {void}
     */
    setBookingCalendar(bookingCalendar) {
      this.#bookingCalendar = bookingCalendar

      this.#renderBookings()
    }

    /**
     * Refreshes the displayed bookings.
     *
     * @returns {void}
     */
    refreshBookings() {
      this.#renderBookings()
    }

    /**
     * Renders the existing study room bookings.
     *
     * @returns {void}
     */
    #renderBookings() {
      const bookingsContainer = this.shadowRoot.querySelector('#bookings')

      bookingsContainer.replaceChildren()

      if (!this.#bookingCalendar) {
        return
      }

      for (const studyRoom of studyRooms) {
        const bookings = this.#bookingCalendar.getBookingsForResource(studyRoom)

        for (const booking of bookings) {
          const bookingElement = document.createElement('p')

          const timeSlot = booking.getTimeSlot()
          const startTime = timeSlot.getStartTime()
          const endTime = timeSlot.getEndTime()

          const date = startTime.toLocaleDateString('sv-SE')
          const start = startTime.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })
          const end = endTime.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })

          bookingElement.textContent = `${studyRoom.getName()} - ${date}, ${start}-${end}`

          const cancelButton = document.createElement('button')

          cancelButton.type = 'button'
          cancelButton.textContent = 'Cancel booking'
          cancelButton.dataset.bookingId = booking.getId()

          bookingsContainer.appendChild(bookingElement)
          bookingsContainer.appendChild(cancelButton)
        }
      }
    }
  }
)

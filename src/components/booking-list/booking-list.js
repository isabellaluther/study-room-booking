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
     * Registers the booking cancellation event listener.
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

          this.#handleBookingCancellation(cancelButton.dataset.bookingId)
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
     * Handles cancellation of an existing booking.
     *
     * @param {string} bookingId - The identifier of the booking to cancel.
     * @returns {void}
     */
    #handleBookingCancellation(bookingId) {
      let booking

      try {
        booking = this.#bookingCalendar.getBookingById(bookingId)

        cancelBooking(this.#bookingCalendar, bookingId)
      } catch (error) {
        console.error('Could not cancel booking:', error)
        window.alert('Your booking could not be cancelled. Please try again.')
        return
      }

      const cancellationEvent = new CustomEvent('booking-cancelled', {
        bubbles: true,
        composed: true,
        detail: {
          saved: false,
        },
      })

      this.dispatchEvent(cancellationEvent)

      if (!cancellationEvent.detail.saved) {
        try {
          this.#bookingCalendar.addBooking(booking)
        } catch (error) {
          console.error('Could not restore cancelled booking:', error)
          window.alert('The booking could not be restored. Please reload the page.')
          return
        }
      }

      try {
        this.#renderBookings()
      } catch (error) {
        console.error('Could not refresh bookings:', error)
        window.alert('The booking list could not be updated. Please reload the page.')
        return
      }

      if (!cancellationEvent.detail.saved) {
        window.alert('Your booking could not be cancelled. Please try again.')
      }
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

      if (this.#bookingCalendar.getBookings().length === 0) {
        const emptyMessage = document.createElement('p')
        emptyMessage.className = 'empty-message'
        emptyMessage.textContent = 'You have no bookings yet.'

        bookingsContainer.appendChild(emptyMessage)
        return
      }

      for (const studyRoom of studyRooms) {
        const bookings = this.#bookingCalendar.getBookingsForResource(studyRoom)

        for (const booking of bookings) {
          const bookingCard = this.#createBookingCard(booking, studyRoom)

          bookingsContainer.appendChild(bookingCard)
        }
      }
    }

    /**
     * Creates an HTML card for a booking.
     *
     * @param {import('booking-module').Booking} booking - The booking to display.
     * @param {import('booking-module').Resource} studyRoom - The booked study room.
     * @returns {HTMLElement} The booking card.
     */
    #createBookingCard(booking, studyRoom) {
      const bookingCard = document.createElement('article')
      bookingCard.className = 'booking-card'

      const roomElement = document.createElement('h3')
      const dateElement = document.createElement('p')
      const timeElement = document.createElement('p')

      const timeSlot = booking.getTimeSlot()
      const startTime = timeSlot.getStartTime()
      const endTime = timeSlot.getEndTime()

      const date = startTime.toLocaleDateString('sv-SE')
      const start = startTime.toLocaleTimeString('sv-SE', {
        hour: '2-digit',
        minute: '2-digit',
      })
      const end = endTime.toLocaleTimeString('sv-SE', {
        hour: '2-digit',
        minute: '2-digit',
      })

      roomElement.textContent = studyRoom.getName()
      dateElement.textContent = date
      timeElement.textContent = `${start}-${end}`

      const cancelButton = document.createElement('button')

      cancelButton.type = 'button'
      cancelButton.textContent = 'Cancel booking'
      cancelButton.setAttribute('aria-label', `Cancel booking for ${studyRoom.getName()} on ${date} at ${start}`)
      cancelButton.dataset.bookingId = booking.getId()

      bookingCard.appendChild(roomElement)
      bookingCard.appendChild(dateElement)
      bookingCard.appendChild(timeElement)
      bookingCard.appendChild(cancelButton)

      return bookingCard
    }
  }
)

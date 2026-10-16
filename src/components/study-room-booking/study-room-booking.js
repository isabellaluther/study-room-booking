/**
 * Registers the study-room-booking custom element.
 *
 * @file src/components/study-room-booking/study-room-booking.js
 * @author Isabella Luther <il223at@student.lnu.se>
 * @version 1.0.0
 */

import { BookingCalendar } from 'booking-module'
import { createHtmlTemplate } from './study-room-booking.html.js'
import { createCssTemplate } from './study-room-booking.css.js'
import '../booking-form/index.js'
import '../booking-list/index.js'
import { loadBookings, saveBookings } from '../../storage/bookingStorage.js'

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
     * The calendar containing the study room bookings.
     *
     * @type {BookingCalendar}
     */
    #bookingCalendar = new BookingCalendar()

    /**
     * Controls the component's event listeners.
     *
     * @type {AbortController|null}
     */
    #abortController = null

    /**
     * Indicates whether saved bookings were loaded successfully.
     *
     * @type {boolean}
     */
    #canSaveBookings = true

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

      this.#loadSavedBookings()
    }

    /**
     * Restores saved bookings to the shared calendar.
     *
     * @returns {void}
     */
    #loadSavedBookings() {
      try {
        const savedBookings = loadBookings()
        const restoredCalendar = new BookingCalendar()

        for (const booking of savedBookings) {
          restoredCalendar.addBooking(booking)
        }

        this.#bookingCalendar = restoredCalendar
      } catch (error) {
        this.#canSaveBookings = false
        console.error('Could not load saved bookings:', error)
      }
    }

    /**
     * Saves the current bookings if storage is available.
     *
     * @returns {void}
     */
    #saveCurrentBookings() {
      if (!this.#canSaveBookings) {
        window.alert('Saved bookings could not be loaded. Your changes cannot be saved.')
        return
      }

      try {
        const bookings = this.#bookingCalendar.getBookings()
        saveBookings(bookings)
      } catch (error) {
        console.error('Could not save bookings:', error)
        window.alert('Your booking could not be saved. It may be lost when you reload the page.')
      }
    }

    /**
     * Invoked when the component is connected to the document.
     *
     * @returns {void}
     */
    connectedCallback() {
      this.#abortController = new AbortController()

      const bookingForm = this.shadowRoot.querySelector('booking-form')
      const bookingList = this.shadowRoot.querySelector('booking-list')

      bookingForm.setBookingCalendar(this.#bookingCalendar)
      bookingList.setBookingCalendar(this.#bookingCalendar)

      bookingForm.addEventListener(
        'booking-created',
        () => {
          bookingList.refreshBookings()
          this.#saveCurrentBookings()
        },
        { signal: this.#abortController.signal }
      )

      bookingList.addEventListener(
        'booking-cancelled',
        () => {
          bookingForm.refreshAvailableTimes()
          this.#saveCurrentBookings()
        },
        { signal: this.#abortController.signal }
      )
    }
  }
)

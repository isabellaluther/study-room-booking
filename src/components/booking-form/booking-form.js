/**
 * Registers the booking-form custom element.
 *
 * @file src/components/booking-form/booking-form.js
 * @author Isabella Luther <il223at@student.lnu.se>
 * @version 1.0.0
 */

import { createHtmlTemplate } from './booking-form.html.js'
import { createCssTemplate } from './booking-form.css.js'
import { studyRooms } from '../../studyRooms.js'
import { isBookingDateAvailable } from '../../services/bookingDateService.js'
import { getAvailableBookingTimes } from '../../services/bookingTimeService.js'
import { createBooking } from '../../services/bookingService.js'

/**
 * Defines the booking-form custom element.
 */
customElements.define(
  'booking-form',
  /**
   * The booking form custom element class.
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
     * The currently selected study room.
     *
     * @type {import('booking-module').Resource|null}
     */
    #selectedStudyRoom = null

    /**
     * The abort controller used to manage event listeners.
     *
     * @type {AbortController|null}
     */
    #abortController = null

    /**
     * The currently selected booking date.
     *
     * @type {string|null}
     */
    #selectedBookingDate = null

    /**
     * The currently selected booking duration in minutes.
     *
     * @type {number|null}
     */
    #selectedBookingDuration = null

    /**
     * The currently selected booking time slot.
     *
     * @type {import('booking-module').TimeSlot|null}
     */
    #selectedTimeSlot = null

    /**
     * Creates an instance of the booking form custom element.
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
     * Invoked when the component is connected to the document.
     *
     * @returns {void}
     */
    connectedCallback() {
      this.#abortController = new AbortController()

      this.#renderStudyRooms()

      const studyRoomsContainer = this.shadowRoot.querySelector('#study-rooms')

      studyRoomsContainer.addEventListener(
        'change',
        (event) => {
          const selectedRoomId = event.target.value

          this.#selectedStudyRoom =
            studyRooms.find((studyRoom) => {
              return studyRoom.getId() === selectedRoomId
            }) ?? null

          this.#renderAvailableTimes()
          this.#clearBookingMessage()
        },
        { signal: this.#abortController.signal }
      )

      const bookingDateInput = this.shadowRoot.querySelector('#booking-date')
      const bookingDateMessage = this.shadowRoot.querySelector('#booking-date-message')
      const bookingMessage = this.shadowRoot.querySelector('#booking-message')

      bookingDateInput.addEventListener(
        'change',
        (event) => {
          this.#selectedBookingDate = event.target.value || null

          this.#renderAvailableTimes()
          this.#clearBookingMessage()

          if (!this.#selectedBookingDate) {
            bookingDateMessage.textContent = ''
            delete bookingDateMessage.dataset.status
            return
          }

          if (isBookingDateAvailable(this.#selectedBookingDate)) {
            bookingDateMessage.textContent = 'The selected date is available for booking.'
            bookingDateMessage.dataset.status = 'success'
          } else {
            bookingDateMessage.textContent = 'Bookings are not available on weekends or Swedish public holidays.'
            bookingDateMessage.dataset.status = 'error'
          }
        },
        { signal: this.#abortController.signal }
      )

      const bookingDurationFieldset = this.shadowRoot.querySelector('#booking-duration')

      bookingDurationFieldset.addEventListener(
        'change',
        (event) => {
          this.#selectedBookingDuration = Number(event.target.value)

          this.#renderAvailableTimes()
          this.#clearBookingMessage()
        },
        { signal: this.#abortController.signal }
      )

      const availableTimesContainer = this.shadowRoot.querySelector('#available-times')
      const bookButton = this.shadowRoot.querySelector('#book-button')

      availableTimesContainer.addEventListener(
        'change',
        (event) => {
          const selectedStartTime = event.target.value

          const availableTimes = getAvailableBookingTimes(
            this.#bookingCalendar,
            this.#selectedStudyRoom,
            this.#selectedBookingDate,
            this.#selectedBookingDuration
          )

          this.#selectedTimeSlot =
            availableTimes.find((timeSlot) => {
              return timeSlot.getStartTime().toISOString() === selectedStartTime
            }) ?? null

          bookButton.disabled = !this.#selectedTimeSlot
        },
        { signal: this.#abortController.signal }
      )

      bookButton.addEventListener(
        'click',
        () => {
          if (!this.#selectedStudyRoom || !this.#selectedTimeSlot) {
            return
          }

          const bookingId = crypto.randomUUID()

          try {
            createBooking(this.#bookingCalendar, bookingId, this.#selectedStudyRoom, this.#selectedTimeSlot)

            this.#renderAvailableTimes()

            const bookingEvent = new CustomEvent('booking-created', {
              bubbles: true,
              composed: true,
              detail: {
                saved: false,
              },
            })

            this.dispatchEvent(bookingEvent)

            if (!bookingEvent.detail.saved) {
              this.#bookingCalendar.cancelBooking(bookingId)
              this.#renderAvailableTimes()
              bookingMessage.textContent = 'Your booking could not be saved. Please try again.'
              bookingMessage.dataset.status = 'error'
              return
            }

            bookingMessage.textContent = 'Your booking was created successfully.'
            bookingMessage.dataset.status = 'success'
          } catch (error) {
            bookingMessage.textContent = 'Could not create the booking. Please try again.'
            bookingMessage.dataset.status = 'error'
            console.error('Could not create booking:', error)
          }
        },
        { signal: this.#abortController.signal }
      )
    }

    /**
     * Removes event listeners when the component is disconnected.
     *
     * @returns {void}
     */
    disconnectedCallback() {
      this.#abortController?.abort()
      this.#abortController = null
    }

    /**
     * Sets the shared booking calendar.
     *
     * @param {import('booking-module').BookingCalendar} bookingCalendar - The booking calendar.
     * @returns {void}
     */
    setBookingCalendar(bookingCalendar) {
      this.#bookingCalendar = bookingCalendar
    }

    /**
     * Clears the previous booking message.
     *
     * @returns {void}
     */
    #clearBookingMessage() {
      const bookingMessage = this.shadowRoot.querySelector('#booking-message')

      bookingMessage.textContent = ''
      delete bookingMessage.dataset.status
    }

    /**
     * Refreshes the displayed available booking times and clears any booking messages.
     *
     * @returns {void}
     */
    refreshAvailableTimes() {
      this.#renderAvailableTimes()
      this.#clearBookingMessage()
    }

    /**
     * Renders the available study rooms as radio buttons.
     *
     * @returns {void}
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

    /**
     * Renders available booking times for the selected room, date and duration.
     *
     * @returns {void}
     */
    #renderAvailableTimes() {
      this.#selectedTimeSlot = null

      const availableTimesContainer = this.shadowRoot.querySelector('#available-times')
      const bookButton = this.shadowRoot.querySelector('#book-button')
      const availableTimesSection = this.shadowRoot.querySelector('#available-times-section')

      availableTimesContainer.replaceChildren()
      bookButton.disabled = true

      if (
        !this.#bookingCalendar ||
        !this.#selectedStudyRoom ||
        !this.#selectedBookingDate ||
        !this.#selectedBookingDuration
      ) {
        availableTimesSection.hidden = true
        return
      }

      availableTimesSection.hidden = false

      const availableTimes = getAvailableBookingTimes(
        this.#bookingCalendar,
        this.#selectedStudyRoom,
        this.#selectedBookingDate,
        this.#selectedBookingDuration
      )

      for (const timeSlot of availableTimes) {
        const label = document.createElement('label')
        const radioButton = document.createElement('input')

        const startTime = timeSlot.getStartTime()
        const endTime = timeSlot.getEndTime()

        const start = startTime.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })
        const end = endTime.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })

        radioButton.type = 'radio'
        radioButton.name = 'booking-time'
        radioButton.value = startTime.toISOString()

        label.appendChild(radioButton)
        label.appendChild(document.createTextNode(`${start}-${end}`))

        availableTimesContainer.appendChild(label)
      }
    }
  }
)

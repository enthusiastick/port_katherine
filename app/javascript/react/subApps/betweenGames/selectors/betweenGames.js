import { createSelector } from 'reselect'
import paramsSelector from '../../../sharedResources/selectors/paramsSelector'

const bookingsSelector = (state) => state.betweenGames.bookings

export const feedbackEligibleBookings = createSelector(
  bookingsSelector,
  (bookings) => {
    return bookings.filter(booking => { return booking.isPelEligible })
  }
)

export const feedbackCompletedBookings = createSelector(
  bookingsSelector,
  (bookings) => {
    return bookings.filter(booking => { return booking.feedbackEnteredAt != null })
  }
)

export const bookingByEventSlug = createSelector(
    bookingsSelector,
    paramsSelector,
    (bookings, params) => {
      const filteredBookings = bookings.filter(booking => booking.eventSlug === params.eventSlug)

  switch(filteredBookings.length) {
    case 0:
      return {}
    default:
      return filteredBookings[0]
    }
  }
)

import { createSelector } from 'reselect'
import paramsSelector from '../../../sharedResources/selectors/paramsSelector'

const pastBookingsSelector = (state) => state.betweenGames.pastBookings

export const feedbackEligibleBookings = createSelector(
  pastBookingsSelector,
  (bookings) => {
    return bookings.filter(booking => { return booking.isPelEligible })
  }
)

export const feedbackCompletedBookings = createSelector(
  pastBookingsSelector,
  (bookings) => {
    return bookings.filter(booking => { return booking.feedbackEnteredAt != null })
  }
)

export const pastBookingByEventSlug = createSelector(
    pastBookingsSelector,
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

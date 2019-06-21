import { createSelector } from 'reselect'
import paramsSelector from '../../../sharedResources/selectors/paramsSelector'

const futureBookingsSelector = (state) => state.betweenGames.futureBookings
const pastBookingsSelector = (state) => state.betweenGames.pastBookings

export const bgsEligibleBookings = createSelector(
  futureBookingsSelector,
  (bookings) => {
    return bookings.filter(booking => { return booking.isBgsEligible })
  }
)

export const feedbackEligibleBookings = createSelector(
  pastBookingsSelector,
  (bookings) => {
    return bookings.filter(booking => { return booking.isPelEligible }).reverse()
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

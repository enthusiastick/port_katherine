import { createSelector } from 'reselect'
import paramsSelector from '../../../sharedResources/selectors/paramsSelector'
const eventsSelector = (state) => state.events.items

export const eventBySlug = createSelector(
  eventsSelector,
  paramsSelector,
  (events, params) => {
    const filteredEvents = events.filter(event => event.slug === params.eventSlug)

    switch(filteredEvents.length) {
      case 0:
        return {}
      default:
        return filteredEvents[0]
    }
  }
)

export const authorizedForLodgingQuestionnaire = createSelector(
  eventBySlug,
  (event) => {
    switch(event.slug) {
      case undefined:
        return true
      default:
        return (event.showLodgingQuestionnaire && event.userBooking && (event.userBooking.category === 'player') && !event.userBooking.lodgingQuestionnaireCompletedAt)
    }
  }
)

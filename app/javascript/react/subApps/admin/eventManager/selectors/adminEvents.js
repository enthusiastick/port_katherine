import { createSelector } from 'reselect'
import paramsSelector from '../../../../sharedResources/selectors/paramsSelector'

const adminEventsSelector = (state) => state.adminEvents.items

export const adminEventBySlug = createSelector(
  adminEventsSelector,
  paramsSelector,
  (adminEvents, params) => {
    const filteredAdminEvents = adminEvents.filter(event => event.slug === params.eventSlug)

    switch (filteredAdminEvents.length) {
      case 0:
        return {}
      default:
        return filteredAdminEvents[0]
    }
  }
)

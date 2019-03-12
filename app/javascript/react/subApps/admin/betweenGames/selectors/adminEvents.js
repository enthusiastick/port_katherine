import { createSelector } from 'reselect'

const adminEventsSelector = (state) => state.adminEvents.index

export const upcomingEvents = createSelector(
  adminEventsSelector,
  (events) => {
    if (events) {
      return events.upcoming
    }
    return []
  }
)

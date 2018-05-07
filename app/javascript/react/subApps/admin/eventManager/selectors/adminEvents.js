import { createSelector } from 'reselect'
import paramsSelector from '../../../../sharedResources/selectors/paramsSelector'

const adminEventsSelector = (state) => state.adminEvents.items

const adminPelsSelector = (state) => state.adminEvents.pels.bookings

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

export const adminPelByUserHandle = createSelector(
  adminPelsSelector,
  paramsSelector,
  (adminPels, params) => {
    const filteredAdminPels = adminPels.filter(pel => pel.userHandle === params.userHandle)

    switch (filteredAdminPels.length) {
      case 0:
        return {}
      default:
        return filteredAdminPels[0]
    }
  }
)

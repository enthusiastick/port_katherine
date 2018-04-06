import { createSelector } from 'reselect'

const userSelector = (state) => state.currentUser

export const isAdmin = createSelector(
  userSelector,
  currentUser => {
    switch(currentUser.isFetching) {
      case true:
        return true
      default:
        return currentUser.item.role === 'admin'
    }
  }
)

export const isPlotStaff = createSelector(
  userSelector,
  currentUser =>  {
    switch(currentUser.isFetching) {
      case true:
        return true
      default:
        return ['admin', 'plot_staff'].includes(currentUser.item.role)
    }
  }
)

export const isSignedIn = createSelector(
  userSelector,
  currentUser => {
    switch(currentUser.isFetching) {
      case true:
        return true
      default:
        return currentUser.item.id !== null
    }
  }
)

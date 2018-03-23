import { createSelector } from 'reselect'

const userSelector = (state) => state.currentUser.item

export const isAdmin = createSelector(
  userSelector,
  user => user.role === 'admin'
)

export const isPlotStaff = createSelector(
  userSelector,
  user => ['admin', 'plot_staff'].includes(user.role)
)

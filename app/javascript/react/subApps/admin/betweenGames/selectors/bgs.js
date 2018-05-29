import { createSelector } from 'reselect'

const bgsSelector = (state) => state.adminBgs.index
const currentUserSelector = (state) => state.currentUser.item

export const answeredBgs = createSelector(
  bgsSelector,
  (bgs) => {
    return bgs.filter(betweenGame => {
      return betweenGame.isAnswered
    })
  }
)

export const unansweredBgs = createSelector(
  bgsSelector,
  (bgs) => {
    return bgs.filter(betweenGame => {
      return !betweenGame.isAnswered
    })
  }
)

export const bgsAssignedToCurrentUser = createSelector(
  bgsSelector,
  currentUserSelector,
  (bgs, currentUser) => {
    return bgs.filter(betweenGame => {
      return betweenGame.assigneeHandle === currentUser.handle
    })
  }
)

export const bgsUnassigned = createSelector(
  bgsSelector,
  (bgs) => {
    return bgs.filter(betweenGame => {
      return betweenGame.assigneeHandle === null
    })
  }
)

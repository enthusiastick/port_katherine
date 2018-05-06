import { connect } from 'react-redux'

import FeedbackNewContainer from '../containers/FeedbackNewContainer'
import { createFeedback } from '../actions/createFeedback'
import { getBetweenGames } from '../actions/getBetweenGames'
import { feedbackEligibleBookings } from '../selectors/betweenGames'

const mapStateToProps = state => {
  return {
    bookings: feedbackEligibleBookings(state),
    isFetching: state.betweenGames.isFetching
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createFeedback: values => { dispatch(createFeedback(values)) },
    getBetweenGames: () => { dispatch(getBetweenGames()) }
  }
}

const FeedbackNew = connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedbackNewContainer)

export default FeedbackNew

import { connect } from 'react-redux'

import FeedbackShowContainer from '../containers/FeedbackShowContainer'
import { bookingByEventSlug } from '../selectors/betweenGames'
import { getBetweenGames } from '../actions/getBetweenGames'

const mapStateToProps = (state, ownProps) => {
  return {
    booking: bookingByEventSlug(state, ownProps),
    isFetching: state.betweenGames.isFetching
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBetweenGames: () => { dispatch(getBetweenGames()) }
  }
}

const FeedbackShow = connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedbackShowContainer)

export default FeedbackShow

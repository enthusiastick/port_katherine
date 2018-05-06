import { connect } from 'react-redux'

import BetweenGamesContainer from '../containers/BetweenGamesContainer'
import { getBetweenGames } from '../actions/getBetweenGames'
import { feedbackCompletedBookings } from '../selectors/betweenGames'

const mapStateToProps = state => {
  return {
    bookings: feedbackCompletedBookings(state),
    isFetching: state.betweenGames.isFetching
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBetweenGames: () => { dispatch(getBetweenGames()) }
  }
}

const BetweenGames = connect(
  mapStateToProps,
  mapDispatchToProps
)(BetweenGamesContainer)

export default BetweenGames

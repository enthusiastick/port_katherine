import { connect } from 'react-redux'

import FeedbackNewContainer from '../containers/FeedbackNewContainer'
import { getBetweenGames } from '../actions/getBetweenGames'

const mapStateToProps = state => {
  return {
    bookings: state.betweenGames.bookings
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBetweenGames: () => { dispatch(getBetweenGames()) }
  }
}

const FeedbackNew = connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedbackNewContainer)

export default FeedbackNew

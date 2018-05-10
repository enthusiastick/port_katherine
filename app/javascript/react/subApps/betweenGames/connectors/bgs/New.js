import { connect } from 'react-redux'

import BgsNewContainer from '../../containers/bgs/NewContainer'
import { authenticateSignedInUser } from '../../../../sharedResources/actions/authenticateUser'
import { createBgs } from '../../actions/createBgs'
import { getBetweenGames } from '../../actions/getBetweenGames'
import { bgsEligibleBookings } from '../../selectors/betweenGames'
import { isSignedIn } from '../../../../sharedResources/selectors/authorizeUser'

const mapStateToProps = state => {
  return {
    bgsEligibleBookings: bgsEligibleBookings(state),
    isFetching: state.betweenGames.isFetching,
    isSignedIn: isSignedIn(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authenticateSignedInUser: authorized => { dispatch(authenticateSignedInUser(authorized)) },
    createBgs: values => { dispatch(createBgs(values)) },
    getBetweenGames: () => { dispatch(getBetweenGames()) }
  }
}

const BgsNew = connect(
  mapStateToProps,
  mapDispatchToProps
)(BgsNewContainer)

export default BgsNew

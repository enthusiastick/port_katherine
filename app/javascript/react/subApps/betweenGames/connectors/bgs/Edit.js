import { connect } from 'react-redux'

import BgsEditContainer from '../../containers/bgs/EditContainer'
import { authenticateSignedInUser } from '../../../../sharedResources/actions/authenticateUser'
import { getBetweenGames } from '../../actions/getBetweenGames'
import { getBgs } from '../../actions/getBgs'
import { updateBgs } from '../../actions/updateBgs'
import { bgsEligibleBookings } from '../../selectors/betweenGames'
import { isSignedIn } from '../../../../sharedResources/selectors/authorizeUser'

const mapStateToProps = (state, ownProps) => {
  return {
    bgs: state.betweenGames.bgs,
    bgsEligibleBookings: bgsEligibleBookings(state),
    bgsId: ownProps.match.params.bgsId,
    isFetching: state.betweenGames.isFetchingBgs,
    isSignedIn: isSignedIn(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authenticateSignedInUser: authorized => { dispatch(authenticateSignedInUser(authorized)) },
    getBetweenGames: () => { dispatch(getBetweenGames()) },
    getBgs: id => { dispatch(getBgs(id)) },
    updateBgs: values => { dispatch(updateBgs(values)) }
  }
}

const BgsEdit = connect(
  mapStateToProps,
  mapDispatchToProps
)(BgsEditContainer)

export default BgsEdit

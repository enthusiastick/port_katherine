import { connect } from 'react-redux'

import BgsShowContainer from '../../containers/bgs/ShowContainer'
import { authenticateSignedInUser } from '../../../../sharedResources/actions/authenticateUser'
import { getBetweenGames } from '../../actions/getBetweenGames'
import { bgsById } from '../../selectors/betweenGames'
import { isSignedIn } from '../../../../sharedResources/selectors/authorizeUser'

const mapStateToProps = (state, ownProps) => {
  return {
    bgs: bgsById(state, ownProps),
    bgsId: ownProps.match.params.bgsId,
    isFetching: state.betweenGames.isFetching,
    isSignedIn: isSignedIn(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authenticateSignedInUser: authorized => { dispatch(authenticateSignedInUser(authorized)) },
    getBetweenGames: () => { dispatch(getBetweenGames()) }
  }
}

const BgsShow = connect(
  mapStateToProps,
  mapDispatchToProps
)(BgsShowContainer)

export default BgsShow

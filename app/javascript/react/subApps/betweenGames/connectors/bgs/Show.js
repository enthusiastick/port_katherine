import { connect } from 'react-redux'

import BgsShowContainer from '../../containers/bgs/ShowContainer'
import { authenticateSignedInUser } from '../../../../sharedResources/actions/authenticateUser'
import { getBgs } from '../../actions/getBgs'
import { isSignedIn } from '../../../../sharedResources/selectors/authorizeUser'

const mapStateToProps = (state, ownProps) => {
  return {
    bgs: state.betweenGames.bgs,
    bgsId: ownProps.match.params.bgsId,
    isFetching: state.betweenGames.isFetchingBgs,
    isSignedIn: isSignedIn(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authenticateSignedInUser: authorized => { dispatch(authenticateSignedInUser(authorized)) },
    getBgs: id => { dispatch(getBgs(id)) }
  }
}

const BgsShow = connect(
  mapStateToProps,
  mapDispatchToProps
)(BgsShowContainer)

export default BgsShow

import { connect } from 'react-redux'

import SkillsIndexContainer from '../containers/SkillsIndexContainer'
import { authenticateSignedInPlotStaff } from '../../../../sharedResources/actions/authenticateUser'
import { getAdminSkills } from '../actions/getAdminSkills'
import { isPlotStaff } from '../../../../sharedResources/selectors/authorizeUser'

const mapStateToProps = state => {
  return {
    isFetching: state.adminSkills.isFetching,
    isPlotStaff: isPlotStaff(state),
    skills: state.adminSkills.index
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authenticateSignedInPlotStaff: authorized => { dispatch(authenticateSignedInPlotStaff(authorized)) },
    getAdminSkills: () => { dispatch(getAdminSkills()) }
  }
}

const SkillsIndex = connect(
  mapStateToProps,
  mapDispatchToProps
)(SkillsIndexContainer)

export default SkillsIndex

import { connect } from 'react-redux'

import SkillShowContainer from '../containers/SkillShowContainer'
import { authenticateSignedInPlotStaff } from '../../../../sharedResources/actions/authenticateUser'
import { showAdminSkill } from '../actions/showAdminSkill'
import { isPlotStaff } from '../../../../sharedResources/selectors/authorizeUser'

const mapStateToProps = (state, ownProps) => {
  return {
    isFetching: state.adminSkills.isFetching,
    isPlotStaff: isPlotStaff(state),
    skill: state.adminSkills.show,
    skillId: ownProps.match.params.skillId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authenticateSignedInPlotStaff: authorized => { dispatch(authenticateSignedInPlotStaff(authorized)) },
    showAdminSkill: id => { dispatch(showAdminSkill(id)) }
  }
}

const SkillShow = connect(
  mapStateToProps,
  mapDispatchToProps
)(SkillShowContainer)

export default SkillShow

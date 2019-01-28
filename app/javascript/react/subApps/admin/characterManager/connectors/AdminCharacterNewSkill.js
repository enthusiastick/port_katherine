import { connect } from 'react-redux'

import AdminCharacterNewSkillContainer from '../containers/AdminCharacterNewSkillContainer'
import { authenticateSignedInPlotStaff } from '../../../../sharedResources/actions/authenticateUser'
import { createAdminCharacterSkill } from '../actions/createAdminCharacterSkill'
import { getAdminAvailableSkills } from '../actions/getAdminCharacterAvailableSkills'
import { isPlotStaff } from '../../../../sharedResources/selectors/authorizeUser'

const mapStateToProps = (state, ownProps) => {
  return {
    characterId: ownProps.match.params.characterId,
    isFetching: state.adminCharacterOptions.isFetching,
    isPlotStaff: isPlotStaff(state),
    skills: state.adminCharacterOptions.skills.items,
    meta: state.adminCharacterOptions.skills.meta
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authenticateSignedInPlotStaff: authorized => { dispatch(authenticateSignedInPlotStaff(authorized)) },
    createAdminCharacterSkill: values => { dispatch(createAdminCharacterSkill(values)) },
    getAdminAvailableSkills: characterId => { dispatch(getAdminAvailableSkills(characterId)) }
  }
}

const AdminCharacterNewSkill = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminCharacterNewSkillContainer)

export default AdminCharacterNewSkill

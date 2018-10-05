import { connect } from 'react-redux'

import EditSkillContainer from '../containers/EditSkillContainer'
import { authenticateSignedInPlotStaff } from '../../../../sharedResources/actions/authenticateUser'
import { getAdminHeaders } from '../actions/getAdminHeaders'
import { editAdminSkill } from '../actions/editAdminSkill'
import { updateAdminSkill } from '../actions/updateAdminSkill'
import { isPlotStaff } from '../../../../sharedResources/selectors/authorizeUser'

const mapStateToProps = (state, ownProps) => {
  return {
    isFetching: state.adminSkills.isFetching,
    isPlotStaff: isPlotStaff(state),
    headers: state.adminHeaders.index,
    skill: state.adminSkills.edit,
    skillId: ownProps.match.params.skillId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authenticateSignedInPlotStaff: authorized => { dispatch(authenticateSignedInPlotStaff(authorized)) },
    getAdminHeaders: () => { dispatch(getAdminHeaders()) },
    editAdminSkill: id => { dispatch(editAdminSkill(id)) },
    updateAdminSkill: values => { dispatch(updateAdminSkill(values)) }
  }
}

const EditSkill = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditSkillContainer)

export default EditSkill

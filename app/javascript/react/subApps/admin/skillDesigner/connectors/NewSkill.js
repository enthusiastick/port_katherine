import { connect } from 'react-redux'

import NewSkillContainer from '../containers/NewSkillContainer'
import { authenticateSignedInPlotStaff } from '../../../../sharedResources/actions/authenticateUser'
import { createAdminSkill } from '../actions/createAdminSkill'
import { getAdminHeaders } from '../actions/getAdminHeaders'
import { isPlotStaff } from '../../../../sharedResources/selectors/authorizeUser'

const mapStateToProps = state => {
  return {
    isFetching: state.adminSkills.isFetching,
    isPlotStaff: isPlotStaff(state),
    headers: state.adminHeaders.index
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authenticateSignedInPlotStaff: authorized => { dispatch(authenticateSignedInPlotStaff(authorized)) },
    createAdminSkill: values => { dispatch(createAdminSkill(values)) },
    getAdminHeaders: () => { dispatch(getAdminHeaders()) }
  }
}

const NewSkill = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewSkillContainer)

export default NewSkill

import humps from 'humps'
import { push } from 'react-router-redux'

import baseUrl from '../../../../sharedResources/constants/baseUrl'
import { clearNotices, flashNotice } from '../../../../sharedResources/actions/flashNotice'

const UPDATE_ADMIN_SKILL = 'UPDATE_ADMIN_SKILL'
const UPDATE_ADMIN_SKILL_SUCCESS = 'UPDATE_ADMIN_SKILL_SUCCESS'
const UPDATE_ADMIN_SKILL_FAILURE = 'UPDATE_ADMIN_SKILL_FAILURE'

export {
  UPDATE_ADMIN_SKILL,
  UPDATE_ADMIN_SKILL_SUCCESS,
  UPDATE_ADMIN_SKILL_FAILURE
}

const fetchUpdateAdminSkill = () => ({
  type: UPDATE_ADMIN_SKILL
})

const updateAdminSkillSuccess = skill => ({
  type: UPDATE_ADMIN_SKILL_SUCCESS,
  skill
})

const updateAdminSkillFailure = errrors => ({
  type: UPDATE_ADMIN_SKILL_FAILURE,
  errors
})

const updateAdminSkill = values => dispatch => {
  dispatch(fetchUpdateAdminSkill())
  const headerSkills = Object.keys(values.headers).map(headerId => {
    const formHeader = values.headers[headerId]
    const { hidden, trueSkill } = formHeader
    return {
      headerId,
      hidden,
      trueSkill
    }
  })
  const payload = JSON.stringify(humps.decamelizeKeys({ headerSkills, ...values }))
  return fetch(`${baseUrl}/api/v1/admin/skills/${values.id}.json`, {
    credentials: 'same-origin',
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: payload
  })
  .then(response => { return response.json() })
  .then(data => {
    const result = humps.camelizeKeys(data)
    dispatch(updateAdminSkillSuccess(result.skill))
    dispatch(clearNotices())
    dispatch(flashNotice({ success: 'Skill updated successfully.' }))
    dispatch(push(`/admin/skills/${result.skill.id}`))
  })
  .catch(error => {
    dispatch(updateAdminSkillFailure(error))
    dispatch(clearNotices())
    dispatch(flashNotice({ alert: 'There was a problem processing your request.' }))
  })
}

export {
  updateAdminSkill
}

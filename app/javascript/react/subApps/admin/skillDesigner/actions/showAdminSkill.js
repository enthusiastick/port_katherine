import humps from 'humps'

import baseUrl from '../../../../sharedResources/constants/baseUrl'

const SHOW_ADMIN_SKILL = 'SHOW_ADMIN_SKILL'
const SHOW_ADMIN_SKILL_SUCCESS = 'SHOW_ADMIN_SKILL_SUCCESS'
const SHOW_ADMIN_SKILL_FAILURE = 'SHOW_ADMIN_SKILL_FAILURE'

export {
  SHOW_ADMIN_SKILL,
  SHOW_ADMIN_SKILL_SUCCESS,
  SHOW_ADMIN_SKILL_FAILURE
}

const fetchShowAdminSkill = () => ({
  type: SHOW_ADMIN_SKILL
})

const showAdminSkillSuccess = show => ({
  type: SHOW_ADMIN_SKILL_SUCCESS,
  show
})

const showAdminSkillFailure = () => ({
  type: SHOW_ADMIN_SKILL_FAILURE
})

const showAdminSkill = skillId => dispatch => {
  dispatch(fetchShowAdminSkill())
  return fetch(`${baseUrl}/api/v1/admin/skills/${skillId}.json`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => { return response.json() })
  .then(data => {
    const result = humps.camelizeKeys(data)
    dispatch(showAdminSkillSuccess(result))
  })
  .catch(error => { dispatch(showAdminSkillFailure()) })
}

export {
  showAdminSkill
}

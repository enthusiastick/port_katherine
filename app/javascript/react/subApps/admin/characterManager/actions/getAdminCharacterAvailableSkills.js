import humps from 'humps'

import baseUrl from '../../../../sharedResources/constants/baseUrl.js'

const GET_ADMIN_AVAILABLE_SKILLS = 'GET_ADMIN_AVAILABLE_SKILLS'
const GET_ADMIN_AVAILABLE_SKILLS_SUCCESS = 'GET_ADMIN_AVAILABLE_SKILLS_SUCCESS'
const GET_ADMIN_AVAILABLE_SKILLS_FAILURE = 'GET_ADMIN_AVAILABLE_SKILLS_FAILURE'

export {
  GET_ADMIN_AVAILABLE_SKILLS,
  GET_ADMIN_AVAILABLE_SKILLS_SUCCESS,
  GET_ADMIN_AVAILABLE_SKILLS_FAILURE
}

const fetchAdminAvailableSkills = () => ({
  type: GET_ADMIN_AVAILABLE_SKILLS
})

const getAdminAvailableSkillsSuccess = payload => ({
  type: GET_ADMIN_AVAILABLE_SKILLS_SUCCESS,
  payload
})

const getAdminAvailableSkillsFailure = () => ({
  type: GET_ADMIN_AVAILABLE_SKILLS_FAILURE
})

const getAdminAvailableSkills = characterId => dispatch => {
  dispatch(fetchAdminAvailableSkills())
  return fetch(`${baseUrl}/api/v1/admin/characters/${characterId}/available_skills.json`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => { return response.json() })
  .then(data => {
    const result = humps.camelizeKeys(data)
    dispatch(getAdminAvailableSkillsSuccess(result))
  })
  .catch(error => { dispatch(getAdminAvailableSkillsFailure()) })
}

export {
  getAdminAvailableSkills
}

import humps from 'humps'

import baseUrl from '../../../../sharedResources/constants/baseUrl'

const GET_ADMIN_SKILLS = 'GET_ADMIN_SKILLS'
const GET_ADMIN_SKILLS_SUCCESS = 'GET_ADMIN_SKILLS_SUCCESS'
const GET_ADMIN_SKILLS_FAILURE = 'GET_ADMIN_SKILLS_FAILURE'

export {
  GET_ADMIN_SKILLS,
  GET_ADMIN_SKILLS_SUCCESS,
  GET_ADMIN_SKILLS_FAILURE
}

const fetchAdminSkills = () => ({
  type: GET_ADMIN_SKILLS
})

const getAdminSkillsSuccess = index => ({
  type: GET_ADMIN_SKILLS_SUCCESS,
  index
})

const getAdminSkillsFailure = () => ({
  type: GET_ADMIN_SKILLS_FAILURE
})

const getAdminSkills = () => dispatch => {
  dispatch(fetchAdminSkills())
  return fetch(`${baseUrl}/api/v1/admin/skills.json`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => { return response.json() })
  .then(data => {
    const result = humps.camelizeKeys(data)
    dispatch(getAdminSkillsSuccess(result))
  })
  .catch(error => { dispatch(getAdminSkillsFailure()) })
}

export {
  getAdminSkills
}

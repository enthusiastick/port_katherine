import humps from 'humps'
import { push } from 'react-router-redux'

import baseUrl from '../../../../sharedResources/constants/baseUrl'
import { clearNotices, flashNotice } from '../../../../sharedResources/actions/flashNotice'

const CREATE_ADMIN_SKILL = 'CREATE_ADMIN_SKILL'
const CREATE_ADMIN_SKILL_SUCCESS = 'CREATE_ADMIN_SKILL_SUCCESS'
const CREATE_ADMIN_SKILL_FAILURE = 'CREATE_ADMIN_SKILL_FAILURE'

export {
  CREATE_ADMIN_SKILL,
  CREATE_ADMIN_SKILL_SUCCESS,
  CREATE_ADMIN_SKILL_FAILURE
}

const fetchCreateAdminSkill = () => ({
  type: CREATE_ADMIN_SKILL
})

const createAdminSkillSuccess = skill => ({
  type: CREATE_ADMIN_SKILL_SUCCESS,
  skill
})

const createAdminSkillFailure = errors => ({
  type: CREATE_ADMIN_SKILL_FAILURE,
  errors
})

const createAdminSkill = values => dispatch => {
  dispatch(fetchCreateAdminSkill())
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
  return fetch(`${baseUrl}/api/v1/admin/skills.json`, {
    credentials: 'same-origin',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload
  })
  .then(response => { return response.json() })
  .then(data => {
    const result = humps.camelizeKeys(data)
    dispatch(createAdminSkillSuccess(result.skill))
    dispatch(clearNotices())
    dispatch(flashNotice({ success: 'Skill created successfully.' }))
    dispatch(push(`/admin/skills/${result.skill.id}`))
  })
  .catch(error => {
    dispatch(createAdminSkillFailure(error))
    dispatch(clearNotices())
    dispatch(flashNotice({ alert: 'There was a problem processing your request.' }))
  })
}

export {
  createAdminSkill
}

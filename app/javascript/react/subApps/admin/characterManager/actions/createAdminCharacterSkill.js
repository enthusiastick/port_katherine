import humps from 'humps'
import { push } from 'react-router-redux'

import baseUrl from '../../../../sharedResources/constants/baseUrl'
import { clearNotices, flashNotice } from '../../../../sharedResources/actions/flashNotice'

const CREATE_ADMIN_CHARACTER_SKILL = 'CREATE_ADMIN_CHARACTER_SKILL'
const CREATE_ADMIN_CHARACTER_SKILL_SUCCESS = 'CREATE_ADMIN_CHARACTER_SKILL_SUCCESS'
const CREATE_ADMIN_CHARACTER_SKILL_FAILURE = 'CREATE_ADMIN_CHARACTER_SKILL_FAILURE'

export {
  CREATE_ADMIN_CHARACTER_SKILL,
  CREATE_ADMIN_CHARACTER_SKILL_SUCCESS,
  CREATE_ADMIN_CHARACTER_SKILL_FAILURE
}

const fetchCreateAdminCharacterSkill = () => ({
  type: CREATE_ADMIN_CHARACTER_SKILL
})

const createAdminCharacterSkillSuccess = character => ({
  type: CREATE_ADMIN_CHARACTER_SKILL_SUCCESS,
  character
})

const createAdminCharacterSkillFailure = errors => ({
  type: CREATE_ADMIN_CHARACTER_SKILL_FAILURE,
  errors
})

const createAdminCharacterSkill = values => dispatch => {
  const params = {
    characterSkill: {
      characterId: values.characterId,
      skills: values.skills.map(skill => skill.value)
    }
  }
  const payload = JSON.stringify(humps.decamelizeKeys(params))
  return fetch(`${baseUrl}/api/v1/admin/character_skills.json`, {
    credentials: 'same-origin',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload
  })
  .then(response => { return response.json() })
  .then(data => {
    const result = humps.camelizeKeys(data)
    dispatch(createAdminCharacterSkillSuccess(result.character))
    dispatch(clearNotices())
    dispatch(flashNotice({ success: 'Skills(s) revealed succesfully.' }))
    dispatch(push(`/admin/characters/${result.character.id}`))
  })
  .catch(error => {
    dispatch(createAdminCharacterSkillFailure(error))
    dispatch(clearNotices())
    dispatch(flashNotice({ alert: 'There was a problem processing your request.' }))
  })
}

export {
  createAdminCharacterSkill
}

import humps from 'humps'
import baseUrl from '../../../../sharedResources/constants/baseUrl'

const UPDATE_ADMIN_CHARACTER_SKILL_LOCK = 'UPDATE_ADMIN_CHARACTER_SKILL_LOCK'
const UPDATE_ADMIN_CHARACTER_SKILL_LOCK_SUCCESS = 'UPDATE_ADMIN_CHARACTER_SKILL_LOCK_SUCCESS'
const UPDATE_ADMIN_CHARACTER_SKILL_LOCK_FAILURE = 'UPDATE_ADMIN_CHARACTER_SKILL_LOCK_FAILURE'

export {
  UPDATE_ADMIN_CHARACTER_SKILL_LOCK,
  UPDATE_ADMIN_CHARACTER_SKILL_LOCK_SUCCESS,
  UPDATE_ADMIN_CHARACTER_SKILL_LOCK_FAILURE
}

const fetchUpdateAdminCharacterSkillLock = () => (
  { type: UPDATE_ADMIN_CHARACTER_SKILL_LOCK }
)

const updateAdminCharacterSkillLockSuccess = character => (
  {
    type: UPDATE_ADMIN_CHARACTER_SKILL_LOCK_SUCCESS,
    character
  }
)

const updateAdminCharacterSkillLockFailure = () => (
  { type: UPDATE_ADMIN_CHARACTER_SKILL_LOCK_FAILURE }
)

const updateAdminCharacterSkillLock = values => dispatch => {
  dispatch(fetchUpdateAdminCharacterSkillLock())
  const payload = JSON.stringify(humps.decamelizeKeys(values))
  return fetch(`${baseUrl}/api/v1/admin/character_skill_locks/${values.characterSkillId}.json`, {
    credentials: 'same-origin',
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: payload
  })
  .then(response => { return response.json() })
  .then(data => {
    const result = humps.camelizeKeys(data)
    dispatch(updateAdminCharacterSkillLockSuccess(result.character))
  })
  .catch(error => {
    dispatch(updateAdminCharacterSkillLockFailure())
  })
}

export {
  updateAdminCharacterSkillLock
}

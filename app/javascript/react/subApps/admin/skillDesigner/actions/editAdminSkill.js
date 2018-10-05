import humps from 'humps'

import baseUrl from '../../../../sharedResources/constants/baseUrl'

const EDIT_ADMIN_SKILL = 'EDIT_ADMIN_SKILL'
const EDIT_ADMIN_SKILL_SUCCESS = 'EDIT_ADMIN_SKILL_SUCCESS'
const EDIT_ADMIN_SKILL_FAILURE = 'EDIT_ADMIN_SKILL_FAILURE'

export {
  EDIT_ADMIN_SKILL,
  EDIT_ADMIN_SKILL_SUCCESS,
  EDIT_ADMIN_SKILL_FAILURE
}

const fetchEditAdminSkill = () => ({
  type: EDIT_ADMIN_SKILL
})

const editAdminSkillSuccess = edit => ({
  type: EDIT_ADMIN_SKILL_SUCCESS,
  edit
})

const editAdminSkillFailure = () => ({
  type: EDIT_ADMIN_SKILL_FAILURE
})

const editAdminSkill = skillId => dispatch => {
  dispatch(fetchEditAdminSkill())
  return fetch(`${baseUrl}/api/v1/admin/skills/${skillId}.json`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => { return response.json() })
  .then(data => {
    const result = humps.camelizeKeys(data)
    const { skill } = result
    const { id, costIncreaseAmount, costIncreaseRank, description, headers, maxRank, name, startingCost } = skill
    const headersById = headers.reduce((object, item) => {
      object[item.id] = { ...item, label: item.name, value: item.id }
      return object
    }, {})

    const formattedResult = {
      skill: {
        id,
        costIncreaseAmount,
        costIncreaseRank,
        description,
        headers: headersById,
        maxRank,
        name,
        startingCost
      }
    }

    dispatch(editAdminSkillSuccess(formattedResult))
  })
  .catch(error => { dispatch(editAdminSkillFailure()) })
}

export {
  editAdminSkill
}

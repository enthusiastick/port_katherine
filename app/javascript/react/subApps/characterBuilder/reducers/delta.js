import { FETCH_EDIT_CHARACTER_SUCCESS } from '../actions/editCharacter'

import {
  ADD_HEADER,
  CHANGE_CHARACTER_SKILL,
  CHANGE_SKILL,
  REMOVE_CHARACTER_SKILL,
  REMOVE_HEADER,
  REMOVE_SKILL
} from '../actions/draftChanges'

import {
  UPDATE_CHARACTER_SUCCESS
} from '../actions/updateCharacter'

let initialState = {
  id: null,
  characterSkills: [],
  newHeaders: [],
  newSkills: [],
  points: {}
}

const delta = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_EDIT_CHARACTER_SUCCESS:
      const { headers, id, name, open, ...points } = action.character
      return Object.assign({}, state, {
        id: action.character.id,
        characterSkills: [],
        newHeaders: [],
        newSkills: [],
        points: points
      })
    case ADD_HEADER:
      let newNewHeaders = state.newHeaders.concat(action.headerId)
      return Object.assign({}, state, { newHeaders: newNewHeaders })
    case CHANGE_CHARACTER_SKILL:
      const { amount, characterSkillId, skillId } = action.payload
      let reducedNewCharacterSkills
      let characterSkillArray = state.characterSkills.filter(characterSkill => {
        return characterSkill.characterSkillId === characterSkillId
      })
      if (characterSkillArray.length === 0) {
        reducedNewCharacterSkills = state.characterSkills.concat(
          {
            skillId: skillId,
            characterSkillId: characterSkillId,
            ranks: amount
          }
        )
      } else {
        let existingCharacterSkill = characterSkillArray[0]
        let characterSkillIndex = state.characterSkills.indexOf(existingCharacterSkill)
        let updatedRanks = existingCharacterSkill.ranks += amount
        reducedNewCharacterSkills = state.characterSkills
        reducedNewCharacterSkills[characterSkillIndex] = Object.assign(
          {},
          existingCharacterSkill,
          { ranks: updatedRanks }
        )
      }
      return Object.assign({}, state, { characterSkills: reducedNewCharacterSkills })
    case CHANGE_SKILL:
      let reducedNewSkills
      let skillArray = state.newSkills.filter(skill => {
        return skill.skillId === action.skillId
      })
      if (skillArray.length === 0) {
        reducedNewSkills = state.newSkills.concat(
          {
            skillId: action.skillId,
            ranks: action.amount
          }
        )
      } else {
        let existingSkill = skillArray[0]
        let skillIndex = state.newSkills.indexOf(existingSkill)
        let newRanks = existingSkill.ranks += action.amount
        reducedNewSkills = state.newSkills
        reducedNewSkills[skillIndex] = Object.assign(
          {},
          existingSkill,
          { ranks: newRanks }
        )
      }
      return Object.assign({}, state, { newSkills: reducedNewSkills })
    case REMOVE_CHARACTER_SKILL:
      let filteredCharacterSkills = state.characterSkills.filter(characterSkill => {
        return characterSkill.characterSkillId !== action.characterSkillId
      })
      return Object.assign({}, state, { characterSkills: filteredCharacterSkills })
    case REMOVE_HEADER:
      let filteredHeaders = state.newHeaders.filter(headerId => {
        return headerId !== action.headerId
      })
      return Object.assign({}, state, { newHeaders: filteredHeaders })
    case REMOVE_SKILL:
      let filteredSkills = state.newSkills.filter(skill => {
        return skill.skillId !== action.skillId
      })
      return Object.assign({}, state, { newSkills: filteredSkills })
    case UPDATE_CHARACTER_SUCCESS:
      return initialState
    default:
      return state
  }
}

export default delta

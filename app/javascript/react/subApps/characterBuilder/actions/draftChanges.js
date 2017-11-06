const ADD_HEADER = 'ADD_HEADER'
const CHANGE_CHARACTER_SKILL = 'CHANGE_CHARACTER_SKILL'
const CHANGE_SKILL = 'CHANGE_SKILL'
const REMOVE_CHARACTER_SKILL = 'REMOVE_CHARACTER_SKILL'
const REMOVE_HEADER = 'REMOVE_HEADER'
const REMOVE_SKILL = 'REMOVE_SKILL'

export {
  ADD_HEADER,
  CHANGE_CHARACTER_SKILL,
  CHANGE_SKILL,
  REMOVE_CHARACTER_SKILL,
  REMOVE_HEADER,
  REMOVE_SKILL
}

let addHeader = headerId => {
  return {
    type: ADD_HEADER,
    headerId
  }
}

let changeCharacterSkill = (characterSkillId, amount) => {
  return {
    type: CHANGE_CHARACTER_SKILL,
    characterSkillId,
    amount
  }
}

let changeSkill = (skillId, amount) => {
  return {
    type: CHANGE_SKILL,
    skillId,
    amount
  }
}

let removeCharacterSkill = characterSkillId => {
  return {
    type: REMOVE_CHARACTER_SKILL,
    characterSkillId
  }
}

let removeHeader = headerId => {
  return {
    type: REMOVE_HEADER,
    headerId
  }
}

let removeSkill = skillId => {
  return {
    type: REMOVE_SKILL,
    skillId
  }
}

export {
  addHeader,
  changeCharacterSkill,
  changeSkill,
  removeCharacterSkill,
  removeHeader,
  removeSkill
}

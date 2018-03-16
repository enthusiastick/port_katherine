import { createSelector } from 'reselect'

const character = (state) => state.characters.edit
const delta = (state) => state.delta
const open = (state) => state.characters.edit.open
const headers = (state) => state.characters.edit.headers

const skillsById = createSelector(
  [open, headers],
  (open, headers) => {
    let skillsById = {}

    for (const header of headers) {
      for (const skill of header.skills) {
        skillsById[skill.skillId] = { ...skill }
      }
    }

    for (const skill of open) {
      skillsById[skill.skillId] = { ...skill }
    }

    return skillsById
  }
)

const calculateNewHeaderCost = ({character, newHeaderId}) => {
  const newHeader = character.headers.find(header => header.headerId === newHeaderId)

  if (newHeader.season === "not_applicable") {
    return 5
  }

  const seasonalHeaders = character.headers.filter(header => header.season === newHeader.season)
  const seasonalHeadersPurchased = seasonalHeaders.filter(header => header.characterHeaderId).length
  if (seasonalHeadersPurchased === 0) {
    return 6
  }

  return 3
}

const calculateSkillCostOfNextRank = ({rank, skill}) => {
  const echelon = parseInt(rank / skill.costIncreaseRank)
  const echelonCostIncrease = skill.costIncreaseAmount * echelon
  return skill.startingCost + echelonCostIncrease
}

const calculateSkillDeltaCost = ({deltaRank, skill}) => {
  let skillCost = 0

  for(let rank = skill.ranks; rank < deltaRank; rank++) {
    skillCost += calculateSkillCostOfNextRank({
      rank: rank,
      skill: skill
    })
  }

  return skillCost
}

export const calculateCostOfDelta = createSelector(
  [character, delta, skillsById],
  (character, delta, skillsById) => {
    let cost = 0

    for (const characterSkill of delta.characterSkills) {
      cost += calculateSkillDeltaCost({
        deltaRank: characterSkill.ranks,
        skill: skillsById[characterSkill.skillId]
      })
    }

    for (const newSkill of delta.newSkills) {
      cost += calculateSkillDeltaCost({
        deltaRank: newSkill.ranks,
        skill: skillsBysId[newSkill.skillId]
      })
    }

    for (const newHeaderId of delta.newHeaders) {
      cost += calculateNewHeaderCost({
        character,
        newHeaderId
      })
    }

    return cost
  }
)


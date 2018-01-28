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

export const calculateCostOfDelta = createSelector(
  [character, delta, skillsById],
  (character, delta, skillsById) => { null }
)


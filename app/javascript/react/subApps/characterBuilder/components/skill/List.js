import React from 'react'

import Tile from './Tile'

const List = props => {
  let skillChangeHandler = (skillId, characterSkillId, amount) => {
    if (characterSkillId) {
      const payload = { skillId, characterSkillId, amount }
      let deltaSkill = props.deltaCharacterSkills.filter(characterSkill => {
        return characterSkillId === characterSkill.characterSkillId
      })[0]

      if (deltaSkill) {
        props.changeCharacterSkill(payload)
      } else {
        let existingSkill = props.skills.filter(skill => {
          return characterSkillId === skill.characterSkillId
        })[0]

        payload.amount += existingSkill.ranks
        props.changeCharacterSkill(payload)
      }
    } else {
      props.changeSkill(skillId, amount)
    }
  }

  let skillRemoveHandler = (characterSkillId, skillId) => {
    if (characterSkillId) { props.removeCharacterSkill(characterSkillId) }
    props.removeSkill(skillId)
  }

  let headerSkills = props.skills.map(skill => {
    let deltaCharacterSkill, deltaSkill

    if (props.deltaCharacterSkills) {
      deltaCharacterSkill = props.deltaCharacterSkills.filter(characterSkill => {
        return characterSkill.characterSkillId === skill.characterSkillId
      })[0]
    }

    if (props.deltaNewSkills) {
      deltaSkill = props.deltaNewSkills.filter(newSkill => {
        return newSkill.skillId === skill.skillId
      })[0]
    }

    return(
      <Tile
        key={skill.skillId}
        deltaCharacterSkill={deltaCharacterSkill}
        deltaSkill={deltaSkill}
        skillChangeHandler={skillChangeHandler}
        skillRemoveHandler={skillRemoveHandler}
        {...skill}
      />
    )
  })

  return(
    <div className='card-section'>
      {headerSkills}
    </div>
  )
}

export default List

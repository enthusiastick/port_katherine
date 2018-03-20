import React from 'react'

import Control from './Control'
import Toggle from './Toggle'

const Tile = props => {
  let increaseClass = 'button'
  let decreaseClass = 'button disabled'
  let ranks = 0
  let rankColorClass = 'four-wide hollow button'
  if (props.ranks) { ranks = props.ranks }

  if (props.maxRank != 0 && props.maxRank === ranks) {
    increaseClass = 'button disabled'
  }

  if (props.deltaSkill) {
    ranks = props.deltaSkill.ranks
    if (ranks === props.maxRank) { increaseClass += ' disabled'}
    if (ranks !== 0) { decreaseClass = 'button' }
    rankColorClass += ' bg-solarized-yellow'
  }

  if (props.deltaCharacterSkill) {
    ranks = props.deltaCharacterSkill.ranks
    if (ranks === props.maxRank) { increaseClass += ' disabled'}
    if (ranks !== props.ranks) { decreaseClass = 'button' }
    rankColorClass += ' bg-solarized-yellow'
  }

  let handleIncrease = () => {
    let existingSkill, maxRank

    if (props.maxRank !== 0) { maxRank = props.maxRank }
    if (props.deltaCharacterSkill) { existingSkill = props.deltaCharacterSkill }
    if (props.deltaSkill) { existingSkill = props.deltaSkill }

    if (maxRank === props.ranks) { return }

    if (existingSkill) {
      if (maxRank) {
        if ((existingSkill.ranks + 1 <= maxRank)) {
          props.skillChangeHandler(props.skillId, props.characterSkillId, 1)
        }
      } else {
        props.skillChangeHandler(props.skillId, props.characterSkillId, 1)
      }
    } else {
      props.skillChangeHandler(props.skillId, props.characterSkillId, 1)
    }
  }

  let handleDecrease = () => {
    let existingSkill
    if (props.deltaCharacterSkill) { existingSkill = props.deltaCharacterSkill }
    if (props.deltaSkill) { existingSkill = props.deltaSkill }

    if (existingSkill) {
      let minimum = 0
      if (props.ranks) { minimum = props.ranks }

      if ((existingSkill.ranks - 1) === minimum) {
        props.skillRemoveHandler(props.characterSkillId, props.skillId)
      } else if ((existingSkill.ranks - 1) > minimum) {
        props.skillChangeHandler(props.skillId, props.characterSkillId, -1)
      }
    }
  }

  let ElementType = (props.maxRank === 1) ? 'Toggle' : 'Control'

  return(
    <div className='grid-container'>
      <div className='grid-x grid-margin-x'>
        <div className='small-7 cell'>
          <p className='bottomless text-right top-padded'>
            <strong>
              {props.name}
            </strong>
          </p>
        </div>
        {(props.maxRank === 1) &&
          <Toggle
            characterSkillId={props.characterSkillId}
            handleDecrease={handleDecrease}
            handleIncrease={handleIncrease}
            ranks={ranks}
          />
        }
        {(props.maxRank != 1) &&
          <Control
            decreaseClass={decreaseClass}
            handleDecrease={handleDecrease}
            handleIncrease={handleIncrease}
            increaseClass={increaseClass}
            rankColorClass={rankColorClass}
            ranks={ranks}
          />
        }
      </div>
    </div>
  )
}

export default Tile

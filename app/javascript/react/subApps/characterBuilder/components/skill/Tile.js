import React from 'react'

import Control from './Control'
import Toggle from './Toggle'

import { calculateSkillCostOfNextRank } from '../../selectors/editCharacter'

const Tile = props => {
  let increaseClass = 'button'
  let decreaseClass = 'button disabled'
  let ranks = 0
  let rankColorClass = 'four-wide hollow button'
  if (props.ranks) { ranks = props.ranks }

  if ((props.maxRank != 0 && props.maxRank === ranks) || props.locked) {
    increaseClass = 'button disabled'
  }

  if (props.deltaSkill) {
    ranks = props.deltaSkill.ranks
    if (ranks === props.maxRank) { increaseClass += ' disabled'}
    if (ranks !== 0) { decreaseClass = 'button' }
    if (props.saveEligible.disabled) {
      rankColorClass += ' bg-solarized-orange'
    } else {
      rankColorClass += ' bg-solarized-yellow'
    }
  }

  if (props.deltaCharacterSkill) {
    ranks = props.deltaCharacterSkill.ranks
    if (ranks === props.maxRank) { increaseClass += ' disabled'}
    if (ranks !== props.ranks) { decreaseClass = 'button' }
    if (props.saveEligible.disabled) {
      rankColorClass += ' bg-solarized-orange'
    } else {
      rankColorClass += ' bg-solarized-yellow'
    }
  }

  const costOfNextRank = calculateSkillCostOfNextRank({ rank: ranks, skill: props })

  let handleIncrease = () => {
    if (props.locked) { return null }
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
    if (props.locked) { return null }
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

  return(
    <div className='grid-container'>
      <div className='grid-x grid-margin-x'>
        <div className='small-6 cell'>
          <p className='bottomless text-right top-padded'>
            <strong>
              {props.locked && <span><i className='fa fa-lock' />&nbsp;</span>}
              {props.name}
            </strong>
          </p>
        </div>
        <div className='small-1 cell'>
          <p className='bottomless text-right top-padded'>
            {costOfNextRank}
          </p>
        </div>
        {(props.maxRank === 1) &&
          <Toggle
            characterSkillId={props.characterSkillId}
            handleDecrease={handleDecrease}
            handleIncrease={handleIncrease}
            locked={props.locked}
            ranks={ranks}
            saveEligible={props.saveEligible}
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

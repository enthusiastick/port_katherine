import React from 'react'

const Tile = props => {
  let increaseClass = 'button'
  let decreaseClass = 'button disabled'
  let ranks = 0
  let rankColorClass = 'four-wide hollow button'
  if (props.ranks) { ranks = props.ranks }

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
        <div className='auto cell'>
          <div className='expanded button-group bottomless'>
            <div className={decreaseClass} onClick={handleDecrease}>
              <i className='fa fa-minus' />
            </div>
            <div className={rankColorClass}>
              <span className='header-font white'>
                {ranks}
              </span>
            </div>
            <div className={increaseClass} onClick={handleIncrease}>
              <i className='fa fa-plus' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tile

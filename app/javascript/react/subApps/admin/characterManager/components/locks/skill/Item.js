import React from 'react'
import Lock from './Lock'
import Rank from './Rank'

const Item = ({characterSkillId, isLocking, lastToggledId, locked, maxRank, name, ranks, toggleLock}) => {
  const onClick = () => { toggleLock(characterSkillId) }
  const isLockingThisSkill = (isLocking && (lastToggledId === characterSkillId))
  const lockClass = (locked) ? 'button' : 'button hollow'
  const lockingClass = `${lockClass} disabled`

  return(
    <div className={(isLockingThisSkill) ? lockingClass : lockClass} onClick={onClick}>
      <Lock isLockingThisSkill={isLockingThisSkill} locked={locked} />
      &nbsp;{name}
      &nbsp;<Rank maxRank={maxRank} ranks={ranks} />
    </div>
  )
}

export default Item

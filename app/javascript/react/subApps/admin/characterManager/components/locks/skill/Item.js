import React from 'react'
import Lock from './Lock'
import Rank from './Rank'

const Item = ({characterSkillId, locked, maxRank, name, ranks, toggleLock}) => {
  const onClick = () => { toggleLock(characterSkillId) }

  return(
    <div className={(locked) ? 'button' : 'button hollow'} onClick={onClick}>
      <Lock locked={locked} />
      &nbsp;{name}
      &nbsp;<Rank maxRank={maxRank} ranks={ranks} />
    </div>
  )
}

export default Item

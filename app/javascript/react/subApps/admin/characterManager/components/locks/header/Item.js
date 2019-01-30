import React from 'react'
import {default as SkillsList} from '../skill/List'

const Item = ({isLocking, lastToggledId, name, skills, toggleLock, trueHeader}) => (
  <div>
    <h3>{trueHeader && 'True '}{name}</h3>
    <SkillsList
      isLocking={isLocking}
      lastToggledId={lastToggledId}
      skills={skills}
      toggleLock={toggleLock}
    />
  </div>
)

export default Item

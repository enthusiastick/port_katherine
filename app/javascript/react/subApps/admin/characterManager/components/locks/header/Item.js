import React from 'react'
import {default as SkillsList} from '../skill/List'

const Item = ({name, skills, toggleLock, trueHeader}) => (
  <div>
    <h3>{trueHeader && 'True '}{name}</h3>
    <SkillsList skills={skills} toggleLock={toggleLock} />
  </div>
)

export default Item

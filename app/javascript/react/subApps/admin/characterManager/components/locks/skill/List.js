import React from 'react'
import {default as SkillItem} from './Item'

const List = ({skills, toggleLock}) => {
  const list = skills.filter(skill => skill.characterSkillId).map(skill => (
    <SkillItem key={skill.skillId} {...skill} toggleLock={toggleLock} />
  ))

  return(
    <div className='callout small'>
      <div className='button-group stacked'>
        {list}
      </div>
    </div>
  )
}

export default List

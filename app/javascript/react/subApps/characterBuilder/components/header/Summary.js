import React from 'react'

const Summary = props => {
  const skillList = props.skills.map(skill => {
    if (skill.characterSkillId) {
      return(
        <li key={skill.characterSkillId}>{skill.name} {skill.ranks}</li>
      )
    }
  })
  return(
    <div className='callout'>
      <p><strong>{props.name}</strong></p>
      <ul>
        {skillList}
      </ul>
    </div>
  )
}

export default Summary

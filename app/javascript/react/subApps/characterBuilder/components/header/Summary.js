import React from 'react'

const Ranks = props => {
  if (props.maxRank === 1 && props.ranks === 1) {
    return <i className='fa fa-check' />
  }

  if (props.maxRank === 1 && props.ranks != 1) {
    return <i className='fa fa-times' />
  }

  return  <span>{props.ranks}</span>
}

const Summary = props => {
  const skillList = props.skills.map(skill => {
    if (skill.characterSkillId && (skill.ranks > 0)) {
      return(
        <li key={skill.characterSkillId}>{skill.name} <Ranks {...skill} /> {skill.locked && <i className='fa fa-lock' />}</li>
      )
    }
  })

  return(
    <div className='callout'>
      <p><strong>{props.trueHeader && 'True '}{props.name}</strong></p>
      <ul>
        {skillList}
      </ul>
    </div>
  )
}

export default Summary

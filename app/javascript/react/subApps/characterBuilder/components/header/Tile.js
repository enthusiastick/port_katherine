import React from 'react'

import Banner from './Banner'
import List from '../skill/List'

const HeaderTile = props => {
  let headerSkillsSection

  if ((props.characterHeaderId && props.skills.length > 0) || props.delta.newHeaders.includes(props.headerId)) {
    headerSkillsSection =
      <List
        changeCharacterSkill={props.changeCharacterSkill}
        changeSkill={props.changeSkill}
        deltaCharacterSkills={props.delta.characterSkills}
        deltaNewSkills={props.delta.newSkills}
        removeCharacterSkill={props.removeCharacterSkill}
        removeSkill={props.removeSkill}
        skills={props.skills}
      />
  }

  return(
    <div className='cell card'>
      <Banner
        addHeader={props.addHeader}
        characterHeaderId={props.characterHeaderId}
        deltaNewHeaders={props.delta.newHeaders}
        headerId={props.headerId}
        name={props.name}
        removeHeader={props.removeHeader}
        trueHeader={props.trueHeader}
      />
      {headerSkillsSection}
    </div>
  )
}

export default HeaderTile

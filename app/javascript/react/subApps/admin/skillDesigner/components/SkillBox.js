import React from 'react'
import marked from 'marked'

import LoadingSpinner from '../../../../sharedResources/components/LoadingSpinner'
import SkillCharactersTable from './SkillCharactersTable'
import SkillHeadersTable from './SkillHeadersTable'

const SkillBox = ({
  isFetching,
  characters,
  costIncreaseAmount,
  costIncreaseRank,
  headers,
  description,
  maxRank,
  name,
  startingCost
}) => {
  if (isFetching) {
    return <LoadingSpinner />
  }

  let descriptionDiv, markdownParsedDescription, renderedDescriptionHTML
  const skillName = (maxRank === 1) ? `${name}*` : name

  if (description) {
    markdownParsedDescription = marked(description)
    renderedDescriptionHTML = { __html: markdownParsedDescription }
    descriptionDiv = <div dangerouslySetInnerHTML={renderedDescriptionHTML} />
  }

  return(
    <div className='top-padded'>
      <h1 className='text-center'>{skillName}</h1>
      <div className='callout secondary'>
        <p className='bottomless'>
          <strong>Starting Cost: </strong>
          {startingCost} CP
        </p>
        {(maxRank !== 1) && <p className='bottomless'>
          Cost Increases by&nbsp;
          <span className='label'>{costIncreaseAmount} CP</span>
          &nbsp;Every&nbsp;
          <span className='label'>{costIncreaseRank}</span>
          &nbsp;Purchases
        </p>}
        {(maxRank > 1) && <p className='bottomless'>
          <strong>Maximum Purchases: </strong>
          {maxRank}
        </p>}
        {description && <div><hr />{descriptionDiv}</div>}
      </div>
      {headers && <SkillHeadersTable headers={headers} />}
      {characters && <SkillCharactersTable characters={characters} />}
    </div>
  )
}

export default SkillBox

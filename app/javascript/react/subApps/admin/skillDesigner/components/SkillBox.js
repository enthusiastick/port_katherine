import React from 'react'
import { Link } from 'react-router-dom'
import { parse } from 'marked'

import LoadingSpinner from '../../../../sharedResources/components/LoadingSpinner'
import SkillCharactersTable from './SkillCharactersTable'
import SkillHeadersTable from './SkillHeadersTable'

const SkillBox = ({
  id,
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
    markdownParsedDescription = parse(description)
    renderedDescriptionHTML = { __html: markdownParsedDescription }
    descriptionDiv = <div dangerouslySetInnerHTML={renderedDescriptionHTML} />
  }

  return(
    <div className='top-padded'>
      <h1 className='text-center'>
        {skillName}&nbsp;
        <Link className='button large' to={`/admin/skills/${id}/edit`}>
          <i className='fa fa-edit fa-lg' />
        </Link>
      </h1>
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

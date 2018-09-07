import React from 'react'

import LoadingSpinner from '../../../../sharedResources/components/LoadingSpinner'
import HeaderSkillsTable from './HeaderSkillsTable'

const HeaderBox = ({isFetching, category, name, season, skills}) => {
  if (isFetching) {
    return <LoadingSpinner />
  }

  return(
    <div className='top-padded'>
      <h1 className='text-center'>{name}</h1>
      <div className='callout secondary'>
        <div className='row'>
          <div className='small-12 medium-6 columns'>
            <strong>Category: </strong>{category}
          </div>
          <div className='small-12 medium-6 columns'>
            <strong>Season: </strong>{season}
          </div>
        </div>
      </div>
      {skills && <HeaderSkillsTable skills={skills} />}
    </div>
  )
}

export default HeaderBox

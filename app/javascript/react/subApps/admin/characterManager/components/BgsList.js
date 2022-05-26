import React from 'react'
import { Link } from 'react-router-dom'

import BgsIcon from '../../../../sharedResources/components/BgsIcon'

const BgsList = props => {
  let bgs

  bgs = props.bgs.map(bgsEntry => {
    return(
      <p key={bgsEntry.nonSequentialId} className='bottomless left-margin-spacer'>
        <BgsIcon category={bgsEntry.category} />
        &nbsp;
        <Link  to={`/admin/bgs/${bgsEntry.nonSequentialId}`}>
          {bgsEntry.title}
        </Link>
      </p>
    )
  })

  return(
    <div className='bottom-margin'>
      {bgs}
    </div>
  )
}

export default BgsList

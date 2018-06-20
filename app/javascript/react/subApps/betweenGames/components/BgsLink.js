import React from 'react'
import { Link } from 'react-router-dom'

import BgsIcon from '../../../sharedResources/components/BgsIcon'

const BgsLink = ({bgs}) => {
  return(
    <p className='bottomless' key={bgs.id}>
      <Link to={`/bgs/${bgs.id}`}>
        <BgsIcon category={bgs.category} /> {bgs.title}
      </Link>
    </p>
  )
}

export default BgsLink

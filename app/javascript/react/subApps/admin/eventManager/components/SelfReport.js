import React from 'react'
import { Link } from 'react-router-dom'

const SelfReport = ({handle, label, selfReport}) => {
  return(
    <div className='callout primary'>
      <Link to={`/admin/users/${handle}`}><h5>{label}</h5></Link>
      {selfReport}
    </div>
  )
}

export default SelfReport

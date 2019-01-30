import React from 'react'

const Lock = ({isLockingThisSkill, locked}) => {
  if (isLockingThisSkill) {
    return <i className='fa fa-spinner fa-pulse fa-fw float-left' />
  }

  return(
    (locked) ? <i className='fa fa-lock float-left' /> : <i className='fa fa-unlock float-left' />
  )
}

export default Lock

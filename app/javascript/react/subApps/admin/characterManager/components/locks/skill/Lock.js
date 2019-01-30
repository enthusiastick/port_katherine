import React from 'react'

const Lock = ({locked}) => (
  (locked) ? <i className='fa fa-lock float-left' /> : <i className='fa fa-unlock float-left' />
)

export default Lock

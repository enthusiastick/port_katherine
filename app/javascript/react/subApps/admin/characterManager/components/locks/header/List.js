import React from 'react'
import {default as HeaderItem} from './Item'

const List = ({headers, toggleLock}) => {
  const list = headers.filter(header => header.characterHeaderId).map(header => (
    <HeaderItem key={header.headerId} {...header} toggleLock={toggleLock} />
  ))
  return(
    <div>
      {list}
    </div>
  )
}

export default List

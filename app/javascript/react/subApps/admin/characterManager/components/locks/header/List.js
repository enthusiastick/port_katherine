import React from 'react'
import {default as HeaderItem} from './Item'

const List = ({headers, isLocking, lastToggledId, toggleLock}) => {
  const list = headers.filter(header => header.characterHeaderId).map(header => (
    <HeaderItem
      key={header.headerId}
      isLocking={isLocking}
      lastToggledId={lastToggledId}
      toggleLock={toggleLock}
      {...header}
    />
  ))
  return(
    <div>
      {list}
    </div>
  )
}

export default List

import React from 'react'

const Rank = ({maxRank, ranks}) => {
  if (maxRank === 1 && ranks === 1) {
    return <i className='fa fa-check' />
  }

  if (maxRank === 1 && ranks === 0) {
    return <i className='fa fa-x' />
  }

  return <span>{ranks}</span>
}

export default Rank

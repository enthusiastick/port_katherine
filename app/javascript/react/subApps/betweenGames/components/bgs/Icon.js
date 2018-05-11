import React from 'react'

const BgsIcon = ({category}) => {
  const iconKey = {
    'skill': 'fa fa-puzzle-piece',
    'focus': 'fa fa-bullseye',
    'lesson': 'fa fa-graduation-cap'
  }

  return <i className={iconKey[`${category}`]} />
}

export default BgsIcon

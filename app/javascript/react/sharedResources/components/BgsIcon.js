import React from 'react'

const BgsIcon = ({category}) => {
  const iconKey = {
    'apothecary': 'fa fa-flask',
    'calibration': 'fa fa-heartbeat',
    'engineering': 'fa fa-cogs',
    'focus': 'fa fa-bullseye',
    'lesson': 'fa fa-graduation-cap',
    'miscellaneous': 'fa fa-puzzle-piece',
    'newspaper': 'fa fa-newspaper-o',
    'note_to_staff': 'fa fa-tag',
    'political_influence': 'fa fa-coffee',
    'professions': 'fa fa-shopping-basket',
    'research_experimentation': 'fa fa-pie-chart'
  }

  return <i className={iconKey[`${category}`]} />
}

export default BgsIcon

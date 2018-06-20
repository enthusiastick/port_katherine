import React from 'react'
import { Link } from 'react-router-dom'

import BgsLink from './BgsLink'

const SelectedBooking = ({booking}) => {
  if (!booking) {
    return(
      <div className='card-section'>
        <em>Select an event.</em>
      </div>
    )
  }

  const { bgs, eventSlug, feedbackEnteredAt, label } = booking

  let pelLink

  let bgsLinks = (
    <div className='card-section'>
      <em>No BGS found.</em>
    </div>
  )

  if (feedbackEnteredAt) {
    pelLink = (
      <div className='card-divider'>
        <Link to={`/pels/${eventSlug}`}>
          <i className='fa fa-envelope' /> {label} PEL
        </Link>
      </div>
    )
  }

  if (bgs.length !== 0) {
    const list = bgs.map(betweenGame =>
      <BgsLink key={betweenGame.id} bgs={betweenGame} />
    )

    bgsLinks = (
      <div className='card-section'>
        {list}
      </div>
    )
  }


  return(
    <div>
      {pelLink}
      {bgsLinks}
    </div>
  )
}

export default SelectedBooking

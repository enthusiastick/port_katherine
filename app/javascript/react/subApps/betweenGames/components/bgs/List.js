import React from 'react'
import { Link } from 'react-router-dom'

const List = ({bookings}) => {
  if (bookings.length === 0) { return null }

  const iconKey = {
    'skill': 'fa fa-puzzle-piece',
    'focus': 'fa fa-bullseye',
    'lesson': 'fa fa-graduation-cap'
  }

  const bgsItems = bookings.map(booking => {
    const bgsLinks = booking.bgs.map(bgs => {
      return(
        <p className='bottomless' key={bgs.id}>
          <Link to={`/bgs/${bgs.id}`}>
            <i className={iconKey[`${bgs.category}`]} /> {bgs.title}
          </Link>
        </p>
      )
    })

    return(
      <div>
        <h4 key={booking.id}>{booking.label}</h4>
        <div className='left-margin-spacer'>
          {bgsLinks}
        </div>
      </div>
    )
  })

  return(
    <div className='left-margin-spacer-3'>
      {bgsItems}
    </div>
  )
}

export default List

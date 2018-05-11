import React from 'react'
import { Link } from 'react-router-dom'

import BgsIcon from './Icon'

const List = ({bookings}) => {
  if (bookings.length === 0) { return null }

  const bgsItems = bookings.map(booking => {
    const bgsLinks = booking.bgs.map(bgs => {
      return(
        <p className='bottomless' key={bgs.id}>
          <Link to={`/bgs/${bgs.id}`}>
            <BgsIcon category={bgs.category} /> {bgs.title}
          </Link>
        </p>
      )
    })

    return(
      <div key={booking.id}>
        <h4>{booking.label}</h4>
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

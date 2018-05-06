import React from 'react'
import { Link } from 'react-router-dom'

const List = ({bookings}) => {
  if (bookings.length === 0) { return null }

  const pelItems = bookings.map(booking => {
    return(
      <li className='header-font' key={booking.id}>
        <Link to={`/pels/${booking.eventSlug}`}>
          {booking.label}
        </Link>
      </li>
    )
  })

  return(
    <ul className='bottomless'>
      {pelItems}
    </ul>
  )
}

export default List

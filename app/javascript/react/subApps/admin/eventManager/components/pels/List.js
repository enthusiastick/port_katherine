import React from 'react'
import { Link } from 'react-router-dom'

const List = ({bookings, eventSlug}) => {
  const playerBookings = bookings.filter(booking => { return booking.category === 'player' })

  if (playerBookings.length === 0) {
    return(
      <p className='text-center'>
        <em>No PELs received.</em>
      </p>
    )
  }

  const pelItems = playerBookings.map(booking => {
    return(
      <li key={booking.id}>
        <Link to={`/admin/events/${eventSlug}/pels/${booking.userHandle}`}>
          {booking.userLabel}
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

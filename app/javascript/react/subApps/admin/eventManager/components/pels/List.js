import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Td, Th, Thead, Tr } from 'reactable'

const List = ({bookings, eventSlug}) => {
  if (bookings.length === 0) {
    return(
      <p className='text-center'>
        <em>No PELs received.</em>
      </p>
    )
  }

  const pelRows = bookings.map(booking => {
    return(
      <Tr key={booking.id}>
        <Td column='user' value={booking.userLabel}>
          <Link to={`/admin/events/${eventSlug}/pels/${booking.userHandle}`}>
            {booking.userLabel}
          </Link>
        </Td>
        <Td column='character' value={booking.characterName}>
          <Link to={`/admin/characters/${booking.characterId}`}>
            {booking.characterName}
          </Link>
        </Td>
        <Td column='timestamp' value={booking.timestamp}>
          {booking.timestampLabel}
        </Td>
      </Tr>
    )
  })

  return(
    <div className='bottomless'>
      <Table
        className='hover'
        sortable={true}
      >
        <Thead>
          <Th column='user'>
            Player
          </Th>
          <Th column='character'>
            Character
          </Th>
          <Th column='timestamp'>
            Submitted At
          </Th>
        </Thead>
        {pelRows}
      </Table>
    </div>
  )
}

export default List

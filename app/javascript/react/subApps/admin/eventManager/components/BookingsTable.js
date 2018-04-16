import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Td, Th, Thead, Tr } from 'reactable'

const BookingsTable = props => {
  const isPlayersTable = (props.category === 'player')
  const label = `${props.category.charAt(0).toUpperCase() + props.category.slice(1)} (${props.bookings.length})`

  if (!isPlayersTable) {
    return <StaffTable label={label} {...props} />
  }

  return <PlayersTable label={label} {...props} />
}

const PlayersTable = props => {
  const tableRows = props.bookings.map(booking => {
    return(
      <Tr key={booking.id}>
        <Td column='user' value={booking.user}>
          <Link to={`/admin/users/${booking.userHandle}`}>{booking.user}</Link>
        </Td>
        <Td column='character' value={booking.character.name}>
          <Link to={`/admin/characters/${booking.character.id}`}>{booking.character.name}</Link>
        </Td>
        <Td column='pass' data={booking.pass} />
        <Td column='paid' data={booking.paid.toString()} />
        <Td column='receipt' data={booking.receipt} />
        <Td column='purchaseDate' data={booking.purchasedAt} />
      </Tr>
    )
  })

  return(
    <div>
      <h3 className='text-center'>{props.label}</h3>
      <Table
        className='hover'
        filterable={['user', 'character', 'pass', 'paid', 'receipt', 'purchaseDate']}
        sortable={true}
      >
        <Thead>
          <Th column='user'>User</Th>
          <Th column='character'>Character</Th>
          <Th column='pass'>Pass</Th>
          <Th column='paid'>Paid?</Th>
          <Th column='receipt'>Receipt</Th>
          <Th column='purchaseDate'>Purchase Date</Th>
        </Thead>
        {tableRows}
      </Table>
    </div>
  )
}

const StaffTable = props => {
  const tableRows = props.bookings.map(booking => {
    return(
      <Tr key={booking.id}>
        <Td column='user' value={booking.user}>
          <Link to={`/admin/users/${booking.userHandle}`}>{booking.user}</Link>
        </Td>
      </Tr>
    )
  })

  return(
    <div>
      <h3 className='text-center'>{props.label}</h3>
      <Table
        className='hover'
        filterable={['user']}
        itemsPerPage={25}
        sortable={true}
      >
        <Thead>
          <Th column='user'>User</Th>
        </Thead>
        {tableRows}
      </Table>
    </div>
  )
}

export default BookingsTable

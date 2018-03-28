import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Td, Th, Thead, Tr } from 'reactable'

const BookingsTable = props => {
  let label = `${props.category.charAt(0).toUpperCase() + props.category.slice(1)} (${props.bookings.length})`


  let tableRows = props.bookings.map(booking => {
    return(
      <Tr key={booking.id}>
        <Td column='user' value={booking.user}>
          <Link to={`/admin/users/${booking.userHandle}`}>{booking.user}</Link>
        </Td>
        <Td column='pass' data={booking.pass} />
        <Td column='paid' data={booking.paid.toString()} />
        <Td column='receipt' data={booking.receipt} />
      </Tr>
    )
  })

  return(
    <div>
      <h3 className='text-center'>{label}</h3>
      <Table
        className='hover'
        filterable={['user', 'pass', 'paid', 'receipt']}
        itemsPerPage={25}
        sortable={true}
      >
        <Thead>
          <Th column='user'>User</Th>
          <Th column='pass'>Pass</Th>
          <Th column='paid'>Paid?</Th>
          <Th column='receipt'>Receipt</Th>
        </Thead>
        {tableRows}
      </Table>
    </div>
  )
}

export default BookingsTable

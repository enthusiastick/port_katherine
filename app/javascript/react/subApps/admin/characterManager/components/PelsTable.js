import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Td, Tr } from 'reactable'

const PelsTable = ({bookings, userHandle}) => {
  let tableRows

  if (bookings.length != 0) {
    tableRows = bookings.map(booking => {
      return(
        <Tr key={booking[1]}>
          <Td column='Event'>
            <Link to={`/admin/events/${booking[1]}/pels/${userHandle}`}>
              {booking[0]}
            </Link>
          </Td>
        </Tr>
      )
    })
  } else {
    tableRows = <p>Loading&hellip;</p>
  }

  return(
    <div>
      <h2>
        <i className='fa fa-envelope-open' />
        &nbsp;PELs
      </h2>
      <Table className='hover'>
        {tableRows}
      </Table>
    </div>
  )
}

export default PelsTable

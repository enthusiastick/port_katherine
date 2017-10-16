import React from 'react'

const BookingsTable = props => {
  let tableRows = props.bookings.map(booking => {
    return(
      <tr key={booking.id}>
        <td>{booking.user}</td>
        <td>{booking.pass}</td>
        <td>{booking.paid.toString()}</td>
        <td>{booking.receipt}</td>
      </tr>
    )
  })

  return(
    <table className='hover'>
      <thead>
        <tr>
          <th>
            User
          </th>
          <th>
            Pass
          </th>
          <th>
            Paid?
          </th>
          <th>
            Receipt
          </th>
        </tr>
      </thead>
      <tbody>
        {tableRows}
      </tbody>
    </table>
  )
}

export default BookingsTable

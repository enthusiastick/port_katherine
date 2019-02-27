import React from 'react'
import Row from './Row'

const Table = props => {
  let tableRows

  if (props.events.length === 0) {
    tableRows =
      <tr className='text-center'>
        <td>Loading&hellip;</td>
        <td />
        <td />
        {props.isCurrentUserAdmin && <td />}
        {props.isCurrentUserAdmin && <td />}
      </tr>
  } else {
    tableRows = props.events.map(event => {
      return(
        <Row
          key={event.slug}
          deleteAdminEvent={props.deleteAdminEvent}
          isCurrentUserAdmin={props.isCurrentUserAdmin}
          event={event}
        />
      )
    })
  }

  return(
    <table className='hover'>
      <thead>
        <tr>
          <th>
            Name
          </th>
          <th>
            Date
          </th>
          <th>
          </th>
          {props.isCurrentUserAdmin && <th>
          </th>}
          {props.isCurrentUserAdmin && <th>
          </th>}
        </tr>
      </thead>
      <tbody>
        {tableRows}
      </tbody>
    </table>
  )
}

export default Table
